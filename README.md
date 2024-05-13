# Blog App Backend

This is the backend for a blog application built using Node.js, Express, PostgreSQL with Sequelize for ORM, Umzug for migrations, and JSON Web Token (JWT) for authentication. 
The backend provides API endpoints to manage users, blogs, and user interactions like logging in/out and maintaining reading lists.

## Features

- **User Authentication:**
  - Register new users
  - Login existing users using JWT
  - Logout users

- **Blog Management:**
  - Create, read, update, and delete blogs
  - Allow users to mark blogs to their reading lists

- **Database Management:**
  - Use PostgreSQL as the database hosted in a Docker container
  - Sequelize ORM for interacting with the database
  - Umzug for managing database migrations

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize
- Umzug
- JSON Web Token (JWT)
- Docker

## Getting Started

### Prerequisites

- Node.js (v12 or later)
- Docker
- npm package manager

### Installation
- first run `npm install`
- start the PostrgreSQL database in a Docker container with `docker run --name blogs-postgres -e POSTGRES_PASSWORD=mypassword -d postgres`

- run with `node index.js` or in development mode with `npm run dev`


