import * as mongo from "../clients/mongodb.js";
import { authMiddleware } from "../utils/auth.js";
import { logger } from "../utils/logger.js";

export const testController = async (req, res) => {
	try {

		logger.systemLog({ message: "Test controller triggered", type: "test", source: "testController" });

        // You can utilize additional authentication on a per route basis if needed
		let auth = await authMiddleware({ req });
		if (!auth) {
			res.status(401).send("Unauthorized");
			return;
		}
		res.status(200).send("Test Route Triggered");
	} catch (error) {
		logger.errorLog({ message: error.message, type: error.name, source: "testController", stack: error.stack });
		res.status(500).send("Internal server error");
	}
};

// trigger the find one function
export const testController2 = async (req, res) => {
	try {
        logger.systemLog({ message: "Test controller 2 triggered", type: "test", source: "testController2" });
		const message = "This is a sample static response from test conrtroller 2";

        res.status(200).json({message});
	} catch (error) {
		logger.errorLog({ message: error.message, type: error.name, source: "testController2", stack: error.stack });
		res.status(500).send("Internal server error");
	}
};

