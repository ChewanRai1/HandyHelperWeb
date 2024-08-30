# Service Booking Platform - Backend

## Overview

The backend for the Service Booking Platform is built with Node.js and provides essential functionalities for managing service bookings, user authentication, and service management. It handles data management, authentication, and various API endpoints for service management, customer management, and booking.

## Features

### API Endpoints

#### Services API

- **GET /api/service/get_all_services**
  - Retrieve all services.
- **POST /api/service/create**
  - Add a new service.
- **GET /api/service/user_services**
  - Retrieve a users services.
- **DELETE /api/service/delete_service/:id**
  - Delete a new service.
- **GET /api/service/get_single_service/:id**
  - Retrieve a single service.
- **PUT /api/service/:id**
  - Update a service.

#### Users API

- **POST /api/user/register**
  - Create user profile.
- **POST /api/user/login**
  - Login user with JWT token.
- **GET /api/user/getprofile**
  - Get user profile.
- **PUT /api/user/updateprofile**
  - Update user profile.
- **POST /api/user/changePassword**
  - Change the user password.
- **POST /api/user/forgot_password**
  - Change the user passwor with email.

#### PlanForLater API

- **POST /api/service/add_favorite**
  - Adding on favorite for later.
- **GET /api/service/favorites**
  - Retrive all favorites.
- **DELETE /api/service/:favoriteId**
  - Delete favorite.

## Authentication

- **JWT-based Authentication**
  - Secure user authentication using JSON Web Tokens (JWT).

## Technologies

- **Node.js**: Server-side runtime environment.
- **Express.js**: Backend framework for building web applications.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB and Node.js.
- **JWT**: JSON Web Token for user authentication and authorization.

## Environment Variables

The following environment variables must be set:

- **MONGO_URI**: mongodb://localhost:27017/Handyhelperdb
- **JWT_SECRET**: SECRETCPR
- **PORT**: 9000

## Author

Chewan Rai
