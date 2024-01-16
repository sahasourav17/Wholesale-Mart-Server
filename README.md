# Wholesale Mart E-commerce Server

Welcome to the Wholesale Mart E-commerce Server, a backend API built with Express.js for a seamless e-commerce experience.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Configuration](#configuration)
- [Contributing](#contributing)

## Introduction

Wholesale Mart E-commerce Server is the backend component of the Wholesale Mart E-commerce application. It is responsible for handling authentication, managing products, processing orders, and integrating with third-party services such as Stripe and Cloudinary.

## Features

- User authentication with JSON Web Tokens (JWT)
- Secure password hashing using bcrypt
- Cloudinary integration for handling image uploads
- Cross-Origin Resource Sharing (CORS) configuration
- Environment variable management with dotenv
- MongoDB integration with Mongoose
- File uploading with Multer
- Stripe integration for processing payments

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

## Configuration

#### 1. Create a .env file in the root directory:

```bash
PORT=5000
MONGODB_URL=your MONGODB_URL
JWT_SECTET=your JWT_SECTET
STRIPE_SECRET_KEY=your STRIPE_SECRET_KEY
CLOUDINARY_CLOUD_NAME=your CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY=your CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET=your CLOUDINARY_API_SECRET
```

## Contributing

If you have any suggestions on what to improve this, please make a issue share your ideas and create your pull request.
