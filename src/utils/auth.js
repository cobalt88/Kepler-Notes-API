/* 
take in the request/payload 
extract the api-key and user-email from the headers
make call to api-key collection and verify if the key is valid
if the key is valid make a request to users collection and get the users permissions
assign permissions to the context to be used in the resolvers
*/

const { USE_AUTH } = process.env;
import { logger } from "./logger.js";

import * as keys from "../controllers/api-keys.js";

export const authMiddleware = async ({ req }) => {
	const api_key = req.headers["api-key"];

    // The most basic form of authentication, you can expand this to include more complex logic. This feature is able to be disabled by setting AUTH to false in the .env file.
	const validateKey = USE_AUTH === "true" ? await keys.validateKey(api_key) : true;
	if (validateKey) {
		return true;
	} else {
		
        logger.errorLog({ message: "Unauthorized access attempt", type: "auth", source: "authMiddleware" });
        return false;
	}
};
