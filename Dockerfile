# Use Node only to install http-server
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy site files
COPY . .

# Install http-server globally
RUN npm install -g http-server

# Expose port
EXPOSE 1234

# Run http-server on container start
CMD ["http-server", "-p", "1234", "-a", "0.0.0.0", "."]
 