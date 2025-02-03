# Use the latest node image
FROM node:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json first (for efficient caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire application code to the container
COPY . .

# Expose the necessary port (3000)
EXPOSE 3000

# Run the NestJS app (in development mode)
CMD ["npm", "run", "start:dev"]
