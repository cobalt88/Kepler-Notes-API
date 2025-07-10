
# 📘 LogUtil – Advanced Logging Utility for Node.js APIs

`LogUtil` is a custom logging utility that provides:
- Structured console logging
- File-based logging (split into `error.log` and `system.log`)
- Optional MongoDB logging via `insertDocument()`

---

## 🚀 Features

- Writes system and error logs to dedicated files (`./src/logs/system.log`, `./src/logs/error.log`)
- Streams logs to the console with timestamps
- Optionally logs to a MongoDB database (enabled by `MONGO=true`)
- Includes fail-safe mechanisms (`localOnly`) to prevent recursive logging

---

## 📦 Constructor

```js
const logger = new LogUtil();
```

Creates two `WriteStream` objects and initializes the loggers.

- `errorStream`: Logs all errors to `./src/logs/error.log`
- `systemStream`: Logs general system messages to `./src/logs/system.log`

---

## 🛠 Methods

### `logger.errorLog(data)`

Logs an error to:
- Console (`console.error`)
- File (`error.log`)
- MongoDB `error_log` collection (if `MONGO=true` and `localOnly !== true`)

#### Parameters:

```js
{
  error: "Error message",       // Required - description of the error
  type: "TypeOfError",          // Required - e.g. "MongoError", "ValidationError"
  source: "ModuleName.js",      // Required - where this error occurred
  stack: "Error stack trace",   // Optional - stack trace, if available
  localOnly: true | false       // Optional - prevents MongoDB logging if true
}
```

#### Example:

Logger structure
```js
logger.errorLog({
  error: "Failed to fetch user data",
  type: "MongoError",
  source: "users.controller.js",
  stack: new Error().stack
});
```

Logger in use: 

```js
export const someFunctionName = async () => {
	try {
      logger.systemLog({ message: "Test controller 2 triggered", type: "test", source: "someFunctionName" });
      return true;
	} catch (error) {
	    logger.errorLog({ message: error.message, type: error.name, source: "someFunctionName", stack: error.stack });
	    return false;
	}
};
```

---

### `logger.systemLog(data)`

Logs a general system message to:
- Console (`console.log`)
- File (`system.log`)
- MongoDB `system_log` collection (if `MONGO=true` and `localOnly !== true`)

#### Parameters:

```js
{
  message: "Status update",     // Required - the message content
  type: "event type",           // Required - e.g. "startup", "auth", "info"
  source: "ModuleName.js",      // Required - where this log is being created
  localOnly: true | false       // Optional - prevents MongoDB logging if true
}
```

#### Example:

```js
logger.systemLog({
  message: "User registration started",
  type: "event",
  source: "auth.controller.js"
});
```

Logger in use: 

```js
export const someFunctionName = async () => {
	try {
      logger.systemLog({ message: "Test controller 2 triggered", type: "test", source: "someFunctionName" });
      return true;
	} catch (error) {
		  logger.errorLog({ message: error.message, type: error.name, source: "someFunctionName", stack: error.stack });
		  return false;
	    }   
};
```

---

## ⚠️ MongoDB Infinite Loop Warning

When `MONGO=true`, both `errorLog()` and `systemLog()` will try to insert documents into MongoDB. If **Mongo logging itself throws an error**, it may recursively call `errorLog()` again, (same with `logger.systemLog()`) which leads to:

**💥 Infinite logging loop** → Memory exhaustion → App crash

### ✅ Solution: `localOnly`

To break the loop, both methods respect the `localOnly` flag:

```js
logger.systemLog({
  message: "Some error occurred in logging to DB",
  type: "system",
  source: "logger.js",
  localOnly: true  // ⛔ Skip Mongo logging and only log to the console and local log files
});
```

You should use `localOnly: true` **whenever logging an error that may be caused by MongoDB itself**.

---

## ✅ Best Practices

- Always set `localOnly: true` inside catch blocks that are inside logging routines.
- Structure log messages consistently for easier filtering.
- Ensure `./src/logs/` exists or create it during setup.
- Avoid circular logging by carefully guarding internal logs with `localOnly`.

---

## 📌 Example Use in Application Startup

```js
import { logger } from "./utils/logger.js";

logger.systemLog({
  message: `Server started on port ${port}`,
  type: "startup",
  source: "server.js"
});
```
