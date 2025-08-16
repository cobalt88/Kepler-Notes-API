// Create a User Class object to represent a user in the database
import { v4 as uuidv4 } from "uuid";

class User {
	constructor({
		user_id = uuidv4(), // Generate a unique ID for the user if not provided
		username,
		email,
		password, // Password should be hashed before storing
		created_at = new Date().toISOString(), // Default to current date and time
		updated_at = new Date().toISOString(), // Default to current date and time
	}) {
		this.user_id = user_id; // Unique identifier for the user
		this.username = username; // Username of the user
		this.email = email; // Email address of the user
		this.password = password; // Hashed password of the user
		this.created_at = created_at; // Timestamp when the user was created
		this.updated_at = updated_at; // Timestamp when the user was last updated
	}
}
