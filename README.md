Description
This project is a web application that allows users to upload images, save them to a MongoDB database, and view the uploaded images. The application was containerized using Docker and managed with Docker Compose to simplify deployment and environment setup.

Technologies Used
Backend Framework: Node.js with Express.js
Database: MongoDB
File Upload: Multer (for handling multipart/form-data)
Frontend: Basic HTML (for testing purposes)
Containerization: Docker and Docker Compose
Setup and Implementation
1. Project Setup
Node.js and Express.js:

Initialized a Node.js project.
Set up an Express server for handling routes.
Used the Multer library to handle image uploads.
MongoDB Integration:

Created a schema for storing image metadata (image name and path).
Connected the application to a MongoDB instance.
File Upload Feature:

Configured Multer to save uploaded images to a local uploads folder.
Stored image file paths in the MongoDB database.
2. Docker Integration
Dockerfile:

Created a Dockerfile to define the application environment.
Installed dependencies and copied the project files into the Docker image.
dockerfile
Copy code
FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["node", "app.js"]
Docker Compose:

Used Docker Compose to set up the application and a MongoDB service.
Defined volumes for persistent MongoDB data storage.
yaml
Copy code
version: '3.8'
services:
  web:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./uploads:/app/uploads
    depends_on:
      - mongo
  mongo:
    image: mongo
    ports:
      - "27017:27017"
    volumes:
      - mongo_data:/data/db
volumes:
  mongo_data:
Build and Run:

Built and ran the application using docker-compose up --build.
3. Challenges Faced
Multer Configuration:

Challenge: Initially, Multer failed to save uploaded files due to incorrect folder permissions.
Solution: Ensured the uploads directory was dynamically created if it did not exist.
Docker Build Errors:

Challenge: Encountered the error: failed to fetch metadata: fork/exec /usr/local/lib/docker/cli-plugins/docker-buildx.
Solution: Installed the docker-buildx plugin and set up a new Buildx builder instance.
MongoDB Connection in Docker:

Challenge: The Node.js application couldn’t connect to MongoDB.
Solution: Used the service name mongo in the connection string to align with Docker Compose networking.
Permission Issues in WSL:

Challenge: Docker commands like docker-compose were not recognized in the WSL environment.
Solution: Enabled WSL integration in Docker Desktop settings and installed required packages.
Persistent Data Storage:

Challenge: MongoDB data was lost every time the container was restarted.
Solution: Configured Docker volumes to persist MongoDB data.
4. Lessons Learned
Importance of Containerization: Docker and Docker Compose simplified environment setup and deployment, making the application platform-agnostic.

Error Debugging in WSL: Working with WSL required understanding how to integrate Docker Desktop and resolve system-level configuration issues.

Database Connectivity in Docker: Using service names in Docker Compose was crucial for inter-service communication.

Building a Resilient Application: Persistent storage and dynamic folder creation are key aspects of building a reliable system.

5. Future Improvements
Implement a frontend interface for better user interaction.
Add authentication to secure the upload endpoint.
Optimize the Dockerfile to reduce image size.
Enhance error handling and logging mechanisms.
Conclusion
This project provided valuable experience in building and containerizing a web application with a focus on backend development. While challenges arose during the development process, they served as an opportunity to learn about Docker, MongoDB, and Node.js best practices.
