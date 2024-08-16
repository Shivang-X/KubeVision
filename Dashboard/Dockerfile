# Use a lightweight Node.js base image
FROM node:alpine

# ENV NEXT_PUBLIC_API_GATEWAY "${NEXT_PUBLIC_API_GATEWAY}"

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Expose the port your application will listen on (replace with your actual port)
EXPOSE 3000

# Command to start the application
CMD [ "npm", "start" ]
