#!/bin/bash

# Create the .env file if it doesn't exist
if [ ! -f .env ]; then
    touch .env
    echo ".env file created."
else
    echo ".env file already exists."
fi

# Create the logs directory if it doesn't exist
if [ ! -d logs ]; then
    mkdir src/logs
    echo "logs directory created."
else
    echo "logs directory already exists."
fi

# Create error.log and system.log inside the logs directory
touch src/logs/error.log 
touch src/logs/system.log
echo "error.log and system.log created in logs directory."

# Install Nodemon globally
run npm install nodemon -g

# install npm packages
run npm install

# Confirm completion
echo "Setup complete."