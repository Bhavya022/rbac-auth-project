# rbac-auth-project 

# RBAC Authentication Project

This project implements a Role-Based Access Control (RBAC) authentication system using Node.js, Express.js, MongoDB, and JSON Web Tokens (JWT). It allows for user registration, login, and profile management with different user roles.

## Features

- User Registration
- User Login
- Get User Profile (Protected Route)
- Logout (Client-side token removal)
- Rate Limiting for Register and Login endpoints
- JWT Authentication and Authorization

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose for ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Rate Limiting**: Express Rate Limiter
- **Environment Variables**: dotenv

## Installation

Follow these steps to set up the project on your local machine:

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/rbac-auth-project.git
cd rbac-auth-project
2. Install Dependencies
Run the following command to install required dependencies:

bash
Copy code
npm install
3. Set up Environment Variables
Create a .env file in the root directory of the project and add the following environment variables:

bash
Copy code
JWT_SECRET=your_secret_key
MONGO_URI=your_mongodb_connection_string
PORT=3000
Replace your_secret_key with a strong secret key for JWT signing and your_mongodb_connection_string with your MongoDB URI.

4. Start the Server
Run the following command to start the server:

bash
Copy code
npm start
The server will run on http://localhost:3000.

Endpoints
1. Register User (POST /api/auth/register)
Description: Registers a new user.

Request Body:

json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "roles": ["roleId1", "roleId2"]
}
Response:

Success:
json
Copy code
{
  "message": "User registered successfully"
}
Failure:
json
Copy code
{
  "message": "User already exists"
}
2. Login User (POST /api/auth/login)
Description: Authenticates the user and returns a JWT token.

Request Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "securepassword"
}
Response:

Success:
json
Copy code
{
  "token": "JWT_TOKEN"
}
Failure:
json
Copy code
{
  "message": "Invalid credentials"
}
3. Get User Profile (GET /api/auth/profile)
Description: Retrieves the profile of the authenticated user.

Headers:

json
Copy code
{
  "Authorization": "Bearer JWT_TOKEN"
}
Response:

Success:
json
Copy code
{
  "_id": "userId",
  "name": "John Doe",
  "email": "john@example.com",
  "roles": ["roleId1", "roleId2"]
}
4. Logout User (POST /api/auth/logout)
Description: Logs out the user (client-side token removal).

Headers:

json
Copy code
{
  "Authorization": "Bearer JWT_TOKEN"
}
Response:

Success:
json
Copy code
{
  "message": "User logged out successfully"
}
Middleware
1. Authentication Middleware (authenticate)
This middleware verifies the JWT token sent in the Authorization header. It ensures that only authenticated users can access protected routes like /profile and /logout.

2. Rate Limiting (rateLimiter)
Rate limiting is applied to the /register and /login routes to prevent brute-force attacks. The middleware limits the number of requests from a single IP in a given time frame.

Testing with Thunder Client (or Postman)
1. Register User (POST /api/auth/register):
Body (JSON):
json
Copy code
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "roles": ["roleId1", "roleId2"]
}
2. Login User (POST /api/auth/login):
Body (JSON):
json
Copy code
{
  "email": "john@example.com",
  "password": "securepassword"
}
3. Get User Profile (GET /api/auth/profile):
Headers:
json
Copy code
{
  "Authorization": "Bearer <JWT_TOKEN>"
}
4. Logout User (POST /api/auth/logout):
Headers:
json
Copy code
{
  "Authorization": "Bearer <JWT_TOKEN>"
}