import { Console } from "console";
import { createWriteStream } from "fs";
import * as mongo from "../clients/mongodb.js";
import { defaultConfig as config } from "../../config.js";
import * as smtp from "../clients/smtp.js";

export const systemLogger = new Console({
	stdout: createWriteStream("./src/logs/system.log", {
		flags: "a",
	}),
});

export const errorLogger = new Console({
	stdout: createWriteStream("./src/logs/error.log", {
		flags: "a",
	}),
});

/**
 * LogUtil class to handle logging to file and MongoDB
 * @class LogUtil
 * @constructor errorStream - WriteStream for error logs
 * @constructor systemStream - WriteStream for system logs
 * @constructor console - Console object for logging
 * @method error - Method to log error messages
 * @method log - Method to log system messages
 * @example logger.error({ error: error.message, type: error.type, source: "app.js - data pull" });
 * @example logger.log({ message: `Data pull initiated at ${utcTimestamp()}`, type: "data pull" });
 */

class LogUtil {
	constructor() {
		this.errorStream = createWriteStream("./src/logs/error.log", { flags: "a" });
		this.console = new Console({
			stdout: this.errorStream,
			stderr: this.errorStream,
		});
		this.systemStream = createWriteStream("./src/logs/system.log", { flags: "a" });
		this.console = new Console({
			stdout: this.systemStream,
			stderr: this.systemStream,
		});
	}

	error(data) {
		data.email = data.email || false; // Optional flag to indicate if the error should be emailed. Default behavior is not to send an email.
		data.localOnly = data.localOnly || false; // Optional flag to indicate if the error is local only - if true it will only log to the console and file, not to MongoDB or email.
		// Build error object
		const errorObject = {
			message: data.error,
			type: data.type,
			source: data.source,
			stack: data.stack,
			timestamp: new Date(),
		};

        // Log to console
        console.error(`${errorObject.timestamp.toISOString()} - ${errorObject.type} - ${errorObject.source}: ${errorObject.message}\n${errorObject.stack || ''}`);

        // Log to file
        this.errorStream.write(`${errorObject.timestamp.toISOString()} - ${errorObject.type} - ${errorObject.source}: ${errorObject.message}\n${errorObject.stack || ''}\n`);

        // Log to mongoDB if MONGO is true
		config.logging.mongoDB.enabled === "true" && data.localOnly !== true ? mongo.insertDocument(errorObject, "error_log") : false;

		// log to email if recipients.length > 0 and email param is true
		if (config.logging.error.recipients.length > 0 && data.email === true) {
			smtp.sendMessage({
				to: config.logging.error.recipients,
				subject: `Error in ${errorObject.source}`,
				text: `${errorObject.timestamp.toISOString()} - ${errorObject.type} - ${errorObject.source}: ${errorObject.message}\n${errorObject.stack || ''}`,
				html: `<p>${errorObject.timestamp.toISOString()} - ${errorObject.type} - ${errorObject.source}: ${errorObject.message}</p><pre>${errorObject.stack || ''}</pre>`,
			}).catch(err => {
				this.error({ error: err.message, type: err.name, source: "LogUtil.error", stack: err.stack });
			});
		}
	}
	log(data) {
		
		data.email = data.email || false; // Optional flag to indicate if the error should be emailed. Default behavior is not to send an email.
		data.localOnly = data.localOnly || false; // Optional flag to indicate if the error is local only - if true it will only log to the console and file, not to MongoDB or email.

		// Build Error object
		const logObject = {
			message: data.message,
			type: data.type,
			source: data.source,
			timestamp: new Date(),
		};

        // Log to console
        console.log(`${logObject.timestamp.toISOString()} - ${logObject.type} - ${logObject.source}: ${logObject.message}`);

        // Log to file
        this.systemStream.write(`${logObject.timestamp.toISOString()} - ${logObject.type} - ${logObject.source}: ${logObject.message}\n`);


        // Log to mongoDB
		if (config.logging.mongoDB.enabled === "true" && data.localOnly !== true) {
            mongo.insertDocument(logObject, "system_log").catch(err => {
                this.errorLog({ error: err.message, type: err.name, source: "LogUtil.systemLog", stack: err.stack });
            });
        }
	}
}

export const logger = new LogUtil();
