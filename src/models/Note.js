// Create a Note Class object to represent a note in the database
import { v4 as uuidv4 } from "uuid";

class Note {
	constructor({ user_id, owner_id = user_id, authorized_editors = [], authorized_viewers = [], auth, note_title, note_body = "", note_tags = [], note_category = "My Notes" }) {
		this.note_id = uuidv4(); // Generate a unique ID for the note
		this.user_id = user_id; // The ID of the user who created the note
		this.owner_id = owner_id; // The ID of the owner of the note
		this.authorized_editors = authorized_editors; // Array of IDs of users who can edit the note
		this.authorized_viewers = authorized_viewers; // Array of IDs of users who can view the note
		this.auth = auth; // Authentication token or session identifier
		this.note_title = note_title; // Title of the note
		this.note_body = note_body; // Body content of the note
		this.note_tags = note_tags; // Tags associated with the note
		this.note_category = note_category; // Category or group to which the note belongs
	}
}

// Export the Note class for use in other modules
export default Note;
