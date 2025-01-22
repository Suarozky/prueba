# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy project files
COPY . .


# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
