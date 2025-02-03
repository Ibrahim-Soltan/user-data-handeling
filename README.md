<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# User Data Handling Backend Service

## Description

This project is a backend service designed to efficiently handle user data and support basic CRUD operations. The service is modular, scalable, and secure, ensuring best practices in handling data and API development.

## Project Setup

### Prerequisites

- Node.js (latest version)
- Docker
- Docker Compose

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-repo/user-data-handling.git
cd user-data-handling
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:

```env
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=60s
MONGODB_URI=mongodb://username:password@mongodb:27017/mydb?authSource=admin
```

### Running the Project

#### Locally

1. Start the application:

```bash
npm run start:dev
```

2. The application will be running at `http://localhost:3000`.

#### Using Docker

1. Build and start the containers:

```bash
docker-compose up --build
```

2. The application will be running at `http://localhost:3000`.

### Deployment

The API is deployed on Render and can be accessed at [https://user-data-handeling.onrender.com/](https://user-data-handeling.onrender.com/).

## API Documentation

The API documentation is available at `http://localhost:3000/api` when running locally. It is generated using Swagger.

## Features

### Main Features

- **CRUD Operations**: Perform CRUD operations for managing user profiles.
- **Database Models**: MongoDB is used to handle user data.
- **Token-Based Authentication**: JWT is used for securing the endpoints.

### API Endpoints

### Admin Routes

To manage user profiles, an admin must first be created and logged in to obtain a JWT token. Below are the routes for creating an admin and logging in.

- **POST /admin/signup**: Create a new admin account.

  - **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "adminpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "60d0fe4f5311236168a109cb",
      "username": "admin"
    }
    ```

- **POST /admin/login**: Log in as an admin to obtain a JWT token.
  - **Request Body**:
    ```json
    {
      "username": "admin",
      "password": "adminpassword"
    }
    ```
  - **Response**:
    ```json
    {
      "access_token": "your.jwt.token.here"
    }
    ```

### Using the JWT Token

Once logged in, include the JWT token in the `Authorization` header of each request to access protected routes.

- **Header**:
  ```http
  Authorization: Bearer your.jwt.token.here
  ```

These routes ensure that only authenticated admins can perform CRUD operations on user profiles.

To access the following routes, an admin must first sign up and then log in to obtain a JWT token, which should be included in the Authorization header of each request.

- **POST /users**: Create a new user profile.

  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com"
    }
    ```

- **GET /users**: Fetch all user profiles (supports pagination and optional filtering by age).

  - **Query Parameters**:
    - `page`: Page number (default is 1)
    - `limit`: Number of profiles per page (default is 10)
    - `age`: Filter profiles by age
  - **Response**:
    ```json
    [
      {
        "id": "60d0fe4f5311236168a109ca",
        "name": "John Doe",
        "age": 30,
        "email": "john.doe@example.com"
      },
      ...
    ]
    ```

- **GET /users/:id**: Fetch a specific user profile by ID.

  - **Response**:
    ```json
    {
      "id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "age": 30,
      "email": "john.doe@example.com"
    }
    ```

- **PUT /users/:id**: Update an existing user profile.

  - **Request Body**:
    ```json
    {
      "name": "John Doe",
      "age": 31,
      "email": "john.doe@example.com"
    }
    ```
  - **Response**:
    ```json
    {
      "id": "60d0fe4f5311236168a109ca",
      "name": "John Doe",
      "age": 31,
      "email": "john.doe@example.com"
    }
    ```

- **DELETE /users/:id**: Delete a user profile by ID.
  - **Response**:
    ```json
    {
      "message": "User profile deleted successfully"
    }
    ```

### Data Validation

Data validation is handled using Data Transfer Objects (DTOs) with the help of the `class-validator` package. Each DTO defines the structure and validation rules for the data being transferred.

#### Example DTO

```typescript
import { IsString, IsInt, IsEmail, Min, Max, Length } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(2, 30)
  readonly name: string;

  @IsInt()
  @Min(18)
  @Max(100)
  readonly age: number;

  @IsEmail()
  readonly email: string;
}
```

#### Validation Rules

- **IsString**: Ensures the value is a string.
- **Length**: Specifies the minimum and maximum length of the string.
- **IsInt**: Ensures the value is an integer.
- **Min**: Specifies the minimum value for the integer.
- **Max**: Specifies the maximum value for the integer.
- **IsEmail**: Ensures the value is a valid email address.

These validation rules help in maintaining data integrity and ensuring that the data conforms to the expected format before processing.

### Error Handling

- Graceful handling of errors, including invalid input, missing resources, and server errors.

### Modular Code Structure

- Clean folder structure with separation of controllers, models, routes, and utilities.

## Bonus Points

### Deployment

The API is deployed on Render and can be accessed at [https://user-data-handeling.onrender.com/](https://user-data-handeling.onrender.com/).

### Documentation

API documentation is generated using Swagger and is available at `http://localhost:3000/api` when running locally.

## Running with Bun

For higher performance, the project can also run with Bun. The code is available on the `bun` branch.

```bash
git checkout bun
bun install
bun run start:dev
```

## License

This project is [UNLICENSED](LICENSE).

## Author

- [Ibrahim Soltan](https://github.com/Ibrahim-Soltan)
