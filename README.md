
# JavaScript REST API Template

This is a professional and modular REST API boilerplate built with **Node.js** and **Express.js**. It provides optional MongoDB integration and API key authentication, along with a structured file layout and built-in logging to local files, the console, and (if mongo is enabled) to mongoDB. <br />
There is a file included in this repository labelled ROUTE-MAP.md that contains documentation on all the example API routes included in this template. This is intended to serve as a guide for some basic API documentation methedologies that will help you and everyone else use any api's you build. 

---

## 🛠️ Local Setup Instructions

To run this project locally, you'll need the following installed on your local machine:

- **Node.js v22 or higher**
- **GIT or GIT Bash** (For windows users only)
- **npm** (comes with Node.js)
- [Optional] **MongoDB** (for full functionality)

Instructions and resources for where to find the above listed software is in a lower section. 

### Step-by-Step Setup

1. **Clone the Repository**  
   ```bash
   git clone https://github.com/your-repo-name.git
   cd your-repo-name
   ```

   Note: Alternatively you can download the project as a ZIP and upload it to a new project to play around with it and make changes. <br />
   DO NOT COMMIT CHANGES TO THIS REPOSITORY it is a template only. 

2. **Install Dependencies**  
   ```bash
   npm install
   ```

3. **Install Dev Dependencies (for development use)**  
   ```bash
   npm install --include=dev
   ```


4. **Run Initial Setup Script**  
   This script will:
   - create local log files
   - create a .env file

   Run with:
   ```bash
   npm run setup
   ```

5. **Set Up Environment Configuration**  
   Copy the base values from the `.env` example file:
   ```bash
   cp Mongo_and_auth_disabled_example.env .env
   ```
   Edit `.env` to suit your environment. This file includes settings for enabling/disabling MongoDB and auth, and storing sensitive config values.
---

6. **(Optional) Run Database Setup Script**
   This script will create a new database with some pre-defined collections for logging, api keys, and a dummy_data collection for you to experiment with. 
   ```bash
   npm run db_setup
   ```

## ⚙️ Feature Configuration

This template supports enabling/disabling two major features:

### 1. MongoDB Integration

To enable MongoDB support, ensure the following variables are present in your `.env` file:

```env
MONGODB_URI=mongodb://localhost:27017
DB_NAME=template_database
MONGO=true
```

If `MONGO=false`, the API will run without connecting to a database.

### 2. API Key Authentication

API key authentication requires MongoDB to be enabled. To enable auth, include this in your `.env`:

```env
USE_AUTH=true
```

- If `USE_AUTH=false`, routes will be publicly accessible.
- If `USE_AUTH=true`, the system checks for a valid `api-key` header against the `keys` collection in MongoDB.

> ⚠️ If you enable `USE_AUTH`, ensure Mongo is also enabled (`MONGO=true`) and you have run the database setup script.

---

## 📦 External Resources & Installation Guides

If you do not already have MongoDB, Node.js, or other tools installed, here are some helpful resources:

### Git Bash
- [Git For Windows](https://git-scm.com/downloads)
- Git is natively included in MacOS and most Linnux distributions

### MongoDB
- [Install MongoDB Community Edition](https://www.mongodb.com/docs/manual/installation/)
- [MongoDB Compass GUI (optional)](https://www.mongodb.com/products/compass)

### Node.js and npm
- [Install Node.js (includes npm)](https://nodejs.org/)

### Postman (for API testing)
- [Download Postman](https://www.postman.com/downloads/)

### GitLab
- [GitLab SSH Key Setup](https://docs.gitlab.com/user/ssh/)

---

## 📬 Questions or Feedback?

**Author:** Vincent Teune   
**Email:** vincent@vtportfolio.net
