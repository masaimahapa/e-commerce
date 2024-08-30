# E-Commerce API

This is a RESTful API for a simple e-commerce application built with Node.js, Express, TypeScript, and TypeORM.

## Features

- Product management (CRUD operations)
- User authentication
- Shopping cart functionality
- Order processing
- Product search

## Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

## Setup and Running the Application

1. Clone the repository:
   ```
   git clone https://github.com/masaimahapa/e-commerce.git
   cd e-commerce
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the application:
   ```
   npm start
   ```

The server will start on `http://localhost:3000`.

## API Endpoints

- Users:
  - POST /users/register - Register a new user
  - POST /users/login - Login and receive JWT token

- Products:
  - GET /products - List all products
  - GET /products/:id - Get a specific product
  - POST /products - Create a new product (admin only)
  - PUT /products/:id - Update a product (admin only)
  - DELETE /products/:id - Delete a product (admin only)
  - GET /products/search - Search products by name or description

- Orders:
  - POST /orders/cart/add - Add a product to the cart
  - POST /orders/cart/remove - Remove a product from the cart
  - GET /orders/cart - View the current cart
  - POST /orders/checkout - Place an order

## Testing

Use a tool like Postman to test the API endpoints. Remember to include the JWT token in the Authorization header for protected routes.

## Note

This application uses an in-memory SQLite database for demonstration purposes. Data will be reset when the server restarts.