
# Euro Travel Server

Euro Travel Server is a backend application built with Express.js and MongoDB, designed to manage user data, travel spots, and country information for a travel-related application.

## Features

- **User Management**: Allows CRUD operations for managing user data.
- **Spot Management**: Provides endpoints to handle CRUD operations for travel spots, including create, read, update, and delete.
- **Country Data**: Manages country information, enabling CRUD operations for country data.
- **RESTful API**: Implements a RESTful API architecture for easy integration with frontend applications.

## Technologies Used

- **Express.js**: A minimalist web framework for Node.js used for building the server-side logic.
- **MongoDB**: A NoSQL database used for storing user data, travel spot information, and country details.
- **cors**: Middleware used for enabling CORS (Cross-Origin Resource Sharing) to allow requests from different origins.
- **dotenv**: Module used for loading environment variables from a .env file.
- **mongodb**: MongoDB Node.js driver for interacting with MongoDB databases.

## Setup

1. Clone the repository:

   ```
   git clone https://github.com/yourusername/euro-travel-server.git
   ```

2. Install dependencies:

   ```
   cd euro-travel-server
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and define the following variables:

   ```
   PORT=3000
   MONGODB=<your_mongodb_connection_uri>
   ```

4. Start the server:

   ```
   npm start
   ```

   The server will start running on the specified port, defaulting to port 3000 if not defined.

## API Endpoints

- **GET /users**: Retrieve all users.
- **GET /users/:id**: Retrieve a specific user by ID.
- **POST /users**: Create a new user.
- **GET /spots**: Retrieve all travel spots.
- **POST /spots**: Create a new travel spot.
- **GET /spots/:id**: Retrieve a specific travel spot by ID.
- **PUT /spots/:id**: Update a specific travel spot by ID.
- **DELETE /spots/:id**: Delete a specific travel spot by ID.
- **GET /countries**: Retrieve all country data.
- **POST /countries**: Create new country data.

## Contributing

Contributions are welcome! If you have any suggestions or improvements, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

