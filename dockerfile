# Use the latest bun image
FROM oven/bun:latest

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and bun.lock first (for efficient caching)
COPY package.json bun.lock ./

# Install dependencies
RUN bun install

# Copy the entire application code to the container
COPY . .

# Expose the necessary port (3000)
EXPOSE 3000

# Run the NestJS app (in development mode)
CMD ["bun", "run", "start:dev"]
