class Settings {
	constructor() {
		this.settings = {
			theme: "light", // Default theme
			notifications: false, // Default notification setting
			language: "en", // Default language setting
		};
		this.updatedAt = new Date().toISOString(); // Timestamp when the settings were last updated
		this.theme = theme; // Default theme setting
		this.notifications = false; // Default notification setting
		this.language = language; // Default language setting
	}

	// Method to get a setting
	getSetting(key) {
		return this.settings[key];
	}

	// Method to set a setting
	setSetting(key, value) {
		this.settings[key] = value;
	}

	// Method to delete a setting
	deleteSetting(key) {
		delete this.settings[key];
	}
}

export default Settings;
