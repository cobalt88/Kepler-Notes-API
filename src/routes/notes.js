/*
    ============NOTES ROUTE FILE============
    Path to here: {base_url}/api/notes/
    ==========================================
*/

import express from "express";
import Note from "../models/Note";

/* 
Notes will be organized by user and user defined tags/categories or folders or groups?
Similar to how other note applications work users can create tags for notes with a "#" followed by the tag name. No spaces but underscores, dots, and hyphens are ok. 
Users can create groups of notes that will operate like folders that notes belong to, by default all notes will belong to "My Notes" group.

Routes to build:
- Create a new note
    required params: user_id, auth, note_title, note_body
    optional params: note_tags (array of strings), note_category

- Update/edit an existing note

- Delete a note

*/

/**
 * @function createNote
 * @description Creates a new note for a user.
 * @param {Object} req - The request object containing user_id, auth, note_title, note_body, and optional note_tags and note_category.
 * @param {Object} res - Response object with status code and appropriate messages.
 * @example req.body = {
 *   user_id: "12345", Required cannot be null
 *   owner_id: "67890", Default is initial user_id, cannot be null
 *   authorized_editors: ["editor1", "editor2"], not required, but if provided must be an array of strings default: []
 *   authorized_viewers: ["viewer1", "viewer2"], not required, but if provided must be an array of strings default: []
 *   auth: "auth_token", Required - should be session token or similar for user authentication on top of API key auth that is provided by the application
 *   note_title: "My First Note", Required - title of the note, cannot be null and should not be an exact match for another note for the same owner_id. Throw warning if it is an exact match.
 *   note_body: "This is the body of my first note.", Required, default is an empty string
 *   note_tags: ["tag1", "tag2"], Not required, default is empty array
 *   note_category: "My Notes", Required, default is empty string
 */

export const createNote = (req, res) => {
	try {
	} catch (error) {
		console.error("Error creating note:", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

export default router;
