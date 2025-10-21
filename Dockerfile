# Use an official Node.js runtime as a parent image
FROM node:20-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install project dependencies
# This uses a legacy SSL provider compatible with your project's dependencies and Node v20
RUN npm install

# Copy the rest of the application's source code
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# The command to run the app
# The NODE_OPTIONS flag is set to handle the OpenSSL issue
CMD ["sh", "-c", "NODE_OPTIONS=--openssl-legacy-provider npm start"]
