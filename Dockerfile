# Using a lightweight Node.js image
FROM node:18-slim

# Set the working directory
WORKDIR /app

# Copying package files separately for layer caching
COPY package*.json ./

# Installing production dependencies only
RUN npm install --production && npm cache clean --force

# Copying only necessary application code
COPY . .

# Setting non-root user for security
RUN adduser --disabled-password appuser && chown -R appuser /app
USER appuser

# Expose the required port
EXPOSE 3000

# Start the application
CMD ["node", "app.js"]
