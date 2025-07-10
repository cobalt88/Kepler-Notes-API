import * as mongo from "../clients/mongodb.js";
import dotenv from "dotenv";
import { logger } from "../utils/logger.js";
dotenv.config();


/***
 * validateKey: API Key Validation Function. 
 * Source: 
 * @param {string} key The key to be validated.
 * @returns {object|boolean} Returns the key object if valid and active, otherwise returns false.
 * @throws {Error} Will return false on errors. Local error handling is done in the function.
 */
export const validateKey = async (key) => {
	try {
		const client = await mongo.connectToMongo();
		const db = client.db(process.env.DB_NAME);
		const result = await db.collection("keys").findOne({ KeyValue: key });
		if (result) {
			if (result.active) {
				return result;
			} else {
				return false;
			}
		} else {
			return false;
		}
	} catch (err) {
		logger.errorLog({ message: err.message, type: err.name, source: "validateKey", stack: err.stack });
		return false;
	}
};

export const createKey = async (key) => {
	try {
		const client = await mongo.connectToMongo();
		const db = client.db(process.env.DB_NAME);
		const result = await db.collection("keys").insertOne(key);
		return result;
	} catch (err) {
		logger.errorLog({ message: err.message, type: err.name, source: "createKey", stack: err.stack });
	}
};

export const updateKey = async (key) => {
	try {
		const client = await mongo.connectToMongo();
		const db = client.db(process.env.DB_NAME);
		const result = await db.collection("keys").updateOne({ KeyValue: key.KeyValue }, { $set: key });
		return result;
	} catch (err) {
		logger.errorLog({ message: err.message, type: err.name, source: "updateKey", stack: err.stack });
	}
};

export const deleteKey = async (key) => {
	try {
		const client = await mongo.connectToMongo();
		const db = client.db(process.env.DB_NAME);
		const result = await db.collection("keys").deleteOne({ KeyValue: key });
		return result;
	} catch (err) {
		logger.errorLog({ message: err.message, type: err.name, source: "deleteKey", stack: err.stack });
	}
};
