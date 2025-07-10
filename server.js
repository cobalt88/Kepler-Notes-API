import express from "express";
import apiRoutes from "./src/routes/index.js";
import dotenv from "dotenv";
const { MONGO, USE_AUTH, LOCAL_API_KEY } = process.env;
import { logger } from "./src/utils/logger.js";
import nodeProcess from "node:process";
import "dotenv/config";
import { connectToMongo } from "./src/clients/mongodb.js";
import { authMiddleware } from "./src/utils/auth.js";

const port = process.env.PORT || 5555;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Route all /api requests to your router
app.use("/api", apiRoutes);

// Catch everything NOT starting with /api and return 404
app.use((req, res, next) => {
  if (!req.originalUrl.startsWith("/api")) {
    return res.status(404).json({ error: "Route not found" });
  }
  next(); // let the next middleware handle /api 404s if no match was found
});

// Optional: catch unmatched /api routes (after router is done)
app.use("/api", (req, res) => {
  res.status(404).json({ error: "API route not found" });
});



// Connect to MongoDB if enabled
MONGO === "true" ? await connectToMongo() : false;

app.listen(port, "0.0.0.0", () => {
	logger.systemLog({ message: `Server initiated for PID: ${nodeProcess.pid}, running on port ${port}`, type: "system startup", source: "app.js" });
});
