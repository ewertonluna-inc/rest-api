# REST API
## Project Overview
This project consists of a REST API using the Express Framework. The API will provide a way for users to administer a school database information about courses: users can interact with the relational database by retrieving a list of courses, as well as adding, updating and deleting courses in the database.

It's build using REST API design, Node.js, and Express to create API routes, Sequelize ORM for data modeling, validation, and persistence along with SQLite.

## Basic Instructions
- Open a `Command Prompt` (on Windows) or `Terminal` (on macOS and Linux) and browse to the root project folder.
- Run the command `npm install` to install the required dependencies.
- Run the command `npm run seed` to automatically seed the database with default data. The database file is nammed `fsjstd-restapi.db`.
- Run the command `npm start` to run the Node.js Express application.

## Sequelize Model definitions
There are two models representing the two related tables in the database:
1. **User**
The User's table consists of the following properties: