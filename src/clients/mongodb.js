/*
=========================
 MongoDB Database Client
=========================


WARNING: connectToMongo and insertDocument functions MUST have all logging set to either localOnly: true or no sot use the Logger class - use console.log instead. Else you will get an infinite loop of logging to MongoDB.
*/

import * as mongodb from "mongodb";
import { logger } from "../utils/logger.js";
import { utcTimestamp } from "../utils/timestamp.js";
import dotenv from "dotenv";
dotenv.config();
const { MONGO_URI, DB_NAME, MONGO } = process.env;

let cachedClient = null;

export const connectToMongo = async () => {
    if (MONGO === "true") {
        logger.systemLog({ message: `MongoDB connection initiated at ${utcTimestamp()}`, type: "mongodb connection", source: "connectToMongo", localOnly: true });
    } else {
        logger.systemLog({ message: `MongoDB connection is disabled`, type: "mongodb connection", source: "connectToMongo", localOnly: true });
        return false;
    }
    
	
    if (cachedClient) return cachedClient;
	try {
		cachedClient = new mongodb.MongoClient(MONGO_URI, {
			maxPoolSize: 100,
			minPoolSize: 10,
			maxIdleTimeMS: 30000,
		});
		await cachedClient.connect();
		logger.systemLog({ message: `MongoDB connection established at ${utcTimestamp()}`, type: "mongodb connection", source: "connectToMongo", localOnly: true });
		return cachedClient;
	} catch (error) {
        logger.errorLog({ message: error.message, type: error.name, source: "connectToMongo", stack: error.stack, localOnly: true });
		throw error;
	}
};

export const queryMongo = async (query, collection) => {
	try {
		const client = await connectToMongo();
		const database = client.db(DB_NAME);
		const col = database.collection(collection);
		const result = await col.find(query).toArray();

		return result;
	} catch (error) {
		logger.errorLog({ message: error.message, type: error.name, source: "queryMongo", stack: error.stack });
	}
};

export const bulkOperation = async (data, collection) => {
	try {
        logger.systemLog({ message: `Performing bulk operation on ${collection}`, type: "bulk operation", source: "bulkOperation" });
		const client = await connectToMongo();
		const database = client.db(DB_NAME);
		const col = database.collection(collection);

		const bulkWrite = data.map((item) => {
			return {
				updateOne: {
					filter: { _id: item._id },
					update: { $set: item },
					upsert: true,
				},
			};
		});

		const result = await col.bulkWrite(bulkWrite);
		logger.log({ message: `Bulk operation successful for ${collection}`, type: "bulk operation", source: "bulkOperation" });
		return result;
	} catch (error) {
		logger.errorLog({ message: error.message, type: error.name, source: "bulkOperation", stack: error.stack });
	}
};

export const insertDocument = async (data, collection) => {
	try {

		const client = await connectToMongo();
		const database = client.db(DB_NAME);
		const col = database.collection(collection);
		const result = await col.insertOne(data);

		return result;
	} catch (error) {
		logger.errorLog({ message: error.message, type: error.name, source: "insertDocument", stack: error.stack, localOnly: true });
	}
};