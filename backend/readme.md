# Library API - Backend

Production-ready REST API for a full-stack library management system built with Express.js and MongoDB/Mongoose.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Scripts](#scripts)
- [Default Users](#default-users)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Security](#security)
- [Testing](#testing)
- [Deployment](#deployment)

## Features

- **Authentication & Authorization**: JWT-based auth with refresh token rotation and secure httpOnly cookies
- **Book Management**: Full CRUD operations with search and category filtering
- **Reviews & Ratings**: User reviews with approval workflow
- **Cart & Wishlist**: Persistent per-user cart and wishlist management
- **Order Management**: Order placement, status tracking, and cancellation
- **Database**: MongoDB with Mongoose ODM and automatic TTL cleanup
- **Security**: Helmet security headers, CORS with origin whitelist, rate limiting, input validation
- **File Uploads**: Multer integration with file type and size validation
- **Centralized Error Handling**: Consistent API responses across all endpoints
- **Pagination**: Built-in pagination support for list endpoints
- **Database Seeding**: Pre-configured roles, permissions, and test users

## Prerequisites

- **Node.js** >= 18.0.0
- **MongoDB** >= 6.0 (local installation or MongoDB Atlas cloud)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup MongoDB

**Option A: Local MongoDB**

- Install MongoDB: https://docs.mongodb.com/manual/installation/
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**

- Create account: https://www.mongodb.com/cloud/atlas
- Create a free cluster (512MB storage available)
- Create a database user
- Whitelist your IP address

### 4. Configure Environment Variables

```bash
# Copy the example environment file
cp .env.example .env.development
```

Generate secure JWT secrets:

```bash
# Run this command twice to generate two different secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Edit `.env.development` with your configuration values (see Configuration section below).

### 5. Seed the Database

```bash
npm run seed
```

This will create:

- Predefined roles (Admin, Manager, User)
- Default permissions
- Test users for development

### 6. Start the Server

```bash
npm run dev    # Development with hot reload
npm start      # Production mode
```

Server will run on `http://localhost:3000` by default.

## Configuration

### Environment Variables

Create a `.env.development` file with the following variables:

| Variable                       | Type    | Default       | Description                                               |
| ------------------------------ | ------- | ------------- | --------------------------------------------------------- |
| `NODE_ENV`                     | string  | `development` | Execution environment                                     |
| `PORT`                         | number  | `3000`        | Server port                                               |
| `MONGODB_URI`                  | string  | -             | MongoDB connection string (required)                      |
| `JWT_ACCESS_SECRET`            | string  | -             | Access token secret (min 32 chars, required)              |
| `JWT_REFRESH_SECRET`           | string  | -             | Refresh token secret (min 32 chars, required)             |
| `JWT_ACCESS_EXPIRES_IN`        | string  | `15m`         | Access token expiry duration                              |
| `JWT_REFRESH_EXPIRES_IN`       | string  | `7d`          | Refresh token expiry duration                             |
| `COOKIE_SECURE`                | boolean | `false`       | Use secure cookies (set to true in production)            |
| `COOKIE_SAME_SITE`             | string  | `lax`         | Cookie SameSite policy                                    |
| `CORS_ORIGIN`                  | string  | -             | Comma-separated list of allowed origins                   |
| `RATE_LIMIT_WINDOW_MS`         | number  | `900000`      | Global rate limit window (15 min)                         |
| `RATE_LIMIT_MAX_REQUESTS`      | number  | `100`         | Global rate limit max requests                            |
| `AUTH_RATE_LIMIT_WINDOW_MS`    | number  | `900000`      | Auth endpoint rate limit window (15 min)                  |
| `AUTH_RATE_LIMIT_MAX_REQUESTS` | number  | `10`          | Auth endpoint max requests per window                     |
| `MAX_FILE_SIZE`                | number  | `5242880`     | Max upload size in bytes (5MB default)                    |
| `ALLOWED_FILE_TYPES`           | string  | -             | Comma-separated MIME types (e.g., `image/jpeg,image/png`) |

### Example `.env.development`

```bash
NODE_ENV=development
PORT=3000
MONGODB_URI=mongodb://localhost:27017/library-dev

# JWT Secrets (generate with: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
JWT_ACCESS_SECRET=your_long_random_secret_here_min_32_chars
JWT_REFRESH_SECRET=your_long_random_secret_here_min_32_chars

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_SECURE=false
COOKIE_SAME_SITE=lax

CORS_ORIGIN=http://localhost:5173,http://localhost:3000

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX_REQUESTS=10

MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

### MongoDB Connection Strings

**Local MongoDB**:

```
mongodb://localhost:27017/library-dev
```

**MongoDB Atlas** (cloud):

```
mongodb+srv://username:password@cluster-name.mongodb.net/database-name?retryWrites=true&w=majority
```

## Scripts

```bash
npm run dev      # Start development server with auto-reload (requires nodemon)
npm start        # Start production server
npm run seed     # Seed database with default roles, permissions, and test users
```

## Default Users

All seeded users have the password: `Aa100100!!`

| Email                 | Role    | Use Case                                            |
| --------------------- | ------- | --------------------------------------------------- |
| `admin@example.com`   | Admin   | Full system access, user/role management            |
| `manager@example.com` | Manager | Book management, user management (limited), uploads |
| `user1@example.com`   | User    | Basic user access, book browsing, orders            |

**Note**: Change these credentials after seeding in production environments.

## API Documentation

### Base URL

```
http://localhost:3000/api/v1
```

### Response Format

All responses follow a consistent JSON structure:

**Success Response** (2xx):

```json
{
  "success": true,
  "data": {},
  "message": "Operation successful"
}
```

**Error Response** (4xx, 5xx):

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error description",
    "details": {}
  }
}
```

### Common Error Codes

| Code                    | Status | Description                       |
| ----------------------- | ------ | --------------------------------- |
| `VALIDATION_ERROR`      | 400    | Request validation failed         |
| `DUPLICATE_RESOURCE`    | 400    | Resource already exists           |
| `FILE_TOO_LARGE`        | 400    | Upload exceeds size limit         |
| `INVALID_FILE_TYPE`     | 400    | File type not allowed             |
| `FILE_UPLOAD_ERROR`     | 400    | File upload failed                |
| `AUTHENTICATION_ERROR`  | 401    | Missing or invalid credentials    |
| `INVALID_CREDENTIALS`   | 401    | Wrong email or password           |
| `TOKEN_EXPIRED`         | 401    | JWT token has expired             |
| `INVALID_TOKEN`         | 401    | JWT token is invalid or malformed |
| `REFRESH_TOKEN_INVALID` | 401    | Refresh token is invalid          |
| `REFRESH_TOKEN_EXPIRED` | 401    | Refresh token has expired         |
| `AUTHORIZATION_ERROR`   | 403    | Insufficient permissions          |
| `RESOURCE_NOT_FOUND`    | 404    | Resource not found                |
| `RATE_LIMIT_EXCEEDED`   | 429    | Rate limit exceeded               |
| `SERVER_ERROR`          | 500    | Internal server error             |

### Authentication Endpoints

#### Register

Creates a new user account.

```http
POST /api/v1/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

**Response** (201 Created):

```json
{
  "success": true,
  "data": {
    "user": {
      "_id": "507f1f77bcf86cd799439011",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "isActive": true
    }
  },
  "message": "User registered successfully"
}
```

#### Login

Authenticates user and returns access token.

```http
POST /api/v1/auth/login
Content-Type: application/json

{
  "email": "admin@example.com",
  "password": "Password123!"
}
```

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "user": {},
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Login successful"
}
```

**Note**: `refreshToken` is set as an httpOnly, secure cookie.

#### Refresh Token

Generates new access token using refresh token.

```http
POST /api/v1/auth/refresh
Cookie: refreshToken=...
```

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "message": "Token refreshed successfully"
}
```

#### Get Current User

Retrieves authenticated user's profile.

```http
GET /api/v1/auth/me
Authorization: Bearer <access_token>
```

#### Logout

Clears authentication tokens.

```http
POST /api/v1/auth/logout
Authorization: Bearer <access_token>
Cookie: refreshToken=...
```

### User Endpoints

#### List Users

Retrieves paginated list of users. Admin/Manager only.

```http
GET /api/v1/users?page=1&limit=10
Authorization: Bearer <access_token>
```

**Query Parameters**:

- `page` (optional): Page number, default 1
- `limit` (optional): Items per page, default 10, max 100

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "count": 50,
    "users": [],
    "page": 1,
    "limit": 10,
    "totalPages": 5
  },
  "message": "Users retrieved successfully"
}
```

#### Get User by ID

Retrieves a specific user's details.

```http
GET /api/v1/users/:id
Authorization: Bearer <access_token>
```

#### Create User

Creates a new user. Admin only.

```http
POST /api/v1/users
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "email": "newuser@example.com",
  "password": "SecurePass123!",
  "firstName": "Jane",
  "lastName": "Smith",
  "roleId": "507f1f77bcf86cd799439012"
}
```

#### Update User

Updates user information. Users can update their own profile; Admins can update any user.

```http
PUT /api/v1/users/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "firstName": "Updated",
  "isActive": false
}
```

#### Delete User

Deletes a user. Admin only.

```http
DELETE /api/v1/users/:id
Authorization: Bearer <access_token>
```

### Book Endpoints

#### List Books

Retrieves paginated list of books with optional filtering.

```http
GET /api/v1/books?page=1&limit=20&search=gatsby&category=Fiction
```

**Query Parameters**:

- `page` (optional): Page number
- `limit` (optional): Items per page
- `search` (optional): Search by title or author
- `category` (optional): Filter by category

#### Get Book by ID

Retrieves full details of a specific book.

```http
GET /api/v1/books/:id
```

#### Create Book

Creates a new book. Admin/Manager only.

```http
POST /api/v1/books
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "price": 19.99,
  "stockQuantity": 50,
  "categories": ["Fiction", "Classic"],
  "coverImage": "https://example.com/cover.jpg",
  "description": "A novel of the Jazz Age",
  "isbn": "978-0743273565"
}
```

#### Update Book

Updates book information. Admin/Manager only.

```http
PUT /api/v1/books/:id
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "price": 21.99,
  "stockQuantity": 40
}
```

#### Delete Book

Deletes a book. Admin/Manager only.

```http
DELETE /api/v1/books/:id
Authorization: Bearer <access_token>
```

### Review Endpoints

#### Submit Review

Submits a review for a book. Authenticated users only.

```http
POST /api/v1/books/:id/reviews
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Excellent read!"
}
```

**Note**: Reviews require approval by an Admin before appearing publicly.

#### Approve Review

Approves a pending review. Admin only.

```http
PATCH /api/v1/books/:id/reviews/:reviewId/approve
Authorization: Bearer <access_token>
```

#### Delete Review

Deletes a review. Admin or review author only.

```http
DELETE /api/v1/books/:id/reviews/:reviewId
Authorization: Bearer <access_token>
```

### Cart Endpoints

All cart endpoints require authentication.

#### Get Cart

Retrieves current user's shopping cart.

```http
GET /api/v1/cart
Authorization: Bearer <access_token>
```

#### Save Cart

Replaces entire cart with new items.

```http
PUT /api/v1/cart
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "items": [
    { "bookId": "507f1f77bcf86cd799439011", "quantity": 2 }
  ]
}
```

#### Clear Cart

Removes all items from cart.

```http
DELETE /api/v1/cart
Authorization: Bearer <access_token>
```

### Wishlist Endpoints

All wishlist endpoints require authentication.

#### Get Wishlist

Retrieves current user's wishlist.

```http
GET /api/v1/wishlist
Authorization: Bearer <access_token>
```

#### Toggle Wishlist Item

Adds or removes an item from wishlist.

```http
POST /api/v1/wishlist/toggle
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "bookId": "507f1f77bcf86cd799439011"
}
```

#### Clear Wishlist

Removes all items from wishlist.

```http
DELETE /api/v1/wishlist
Authorization: Bearer <access_token>
```

### Order Endpoints

All order endpoints require authentication.

#### List Orders

Retrieves user's orders. Admins/Managers can filter by userId.

```http
GET /api/v1/orders?userId=507f1f77bcf86cd799439011&page=1&limit=10
Authorization: Bearer <access_token>
```

**Query Parameters**:

- `userId` (optional, Admin only): Filter by specific user
- `page` (optional): Page number
- `limit` (optional): Items per page

#### Place Order

Creates a new order from cart items or provided items list.

```http
POST /api/v1/orders
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "items": [
    { "bookId": "507f1f77bcf86cd799439011", "quantity": 1 }
  ],
  "shippingAddress": "123 Main St, New York, NY 10001"
}
```

#### Update Order Status

Updates order status. Admin/Manager only.

```http
PATCH /api/v1/orders/:id/status
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "status": "SHIPPED"
}
```

**Valid statuses**: `PENDING`, `CONFIRMED`, `SHIPPED`, `DELIVERED`, `CANCELLED`

#### Cancel Order

Cancels an order. User can cancel their own pending orders; Admin can cancel any order.

```http
PATCH /api/v1/orders/:id/cancel
Authorization: Bearer <access_token>
```

### File Upload

Uploads a file with validation. Authenticated users only.

```http
POST /api/v1/upload
Authorization: Bearer <access_token>
Content-Type: multipart/form-data

file: <binary file data>
```

**Constraints**:

- Max size: 5MB (configurable via `MAX_FILE_SIZE`)
- Allowed types: JPEG, PNG, GIF, PDF (configurable via `ALLOWED_FILE_TYPES`)

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "filename": "photo_1234567890.jpg",
    "url": "http://localhost:3000/uploads/photo_1234567890.jpg"
  },
  "message": "File uploaded successfully"
}
```

### Health Check

Server health and status endpoint (no authentication required).

```http
GET /api/v1/health
```

**Response** (200 OK):

```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 123.456,
    "timestamp": "2024-01-04T12:00:00.000Z",
    "environment": "development",
    "database": "connected"
  },
  "message": "Server is healthy"
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/              # Configuration files
│   │   ├── db.js            # MongoDB connection
│   │   ├── env.js           # Environment variables
│   │   └── oauth.js         # OAuth configuration
│   │
│   ├── constants/           # Application constants
│   │   └── api-error-codes.js
│   │
│   ├── controllers/         # HTTP request handlers
│   │   ├── auth.controller.js
│   │   ├── book.controller.js
│   │   ├── cart.controller.js
│   │   ├── order.controller.js
│   │   ├── review.controller.js
│   │   ├── upload.controller.js
│   │   ├── user.controller.js
│   │   └── wishlist.controller.js
│   │
│   ├── middlewares/         # Express middlewares
│   │   ├── auth.middleware.js      # JWT authentication
│   │   ├── errorHandler.js         # Centralized error handling
│   │   ├── notFound.js             # 404 handler
│   │   ├── rateLimiter.js          # Rate limiting
│   │   ├── requestLogger.js        # Request logging
│   │   └── upload.js               # File upload handling
│   │
│   ├── models/              # Mongoose schemas
│   │   ├── Book.js
│   │   ├── Cart.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Permission.js
│   │   ├── RefreshToken.js
│   │   ├── Review.js
│   │   ├── Role.js
│   │   ├── User.js
│   │   ├── Wishlist.js
│   │   └── index.js         # Model exports
│   │
│   ├── routes/              # Route definitions
│   │   ├── auth.routes.js
│   │   ├── book.routes.js
│   │   ├── cart.routes.js
│   │   ├── health.routes.js
│   │   ├── oauth.routes.js
│   │   ├── order.routes.js
│   │   ├── review.routes.js
│   │   ├── upload.routes.js
│   │   ├── user.routes.js
│   │   ├── wishlist.routes.js
│   │   └── index.js         # Route aggregation
│   │
│   ├── services/            # Business logic
│   │   ├── book.service.js
│   │   ├── cart.service.js
│   │   ├── order.service.js
│   │   ├── review.service.js
│   │   ├── user.service.js
│   │   ├── wishlist.service.js
│   │   └── auth/            # Auth-specific services
│   │
│   ├── utils/               # Utility functions
│   │   ├── asyncHandler.js       # Async error wrapper
│   │   ├── auth-helpers.js       # Auth utilities
│   │   ├── error-factories.js    # Error creation
│   │   ├── jwt.js                # JWT token utilities
│   │   ├── logger.js             # Logging utility
│   │   ├── normalize.js          # Data normalization
│   │   ├── pagination.js         # Pagination helper
│   │   ├── password.js           # Password hashing
│   │   └── response.js           # Response formatter
│   │
│   ├── validators/          # Request validation
│   │   ├── authValidate.js
│   │   ├── bookValidate.js
│   │   ├── cartValidate.js
│   │   ├── orderValidate.js
│   │   ├── reviewValidate.js
│   │   ├── uploadValidate.js
│   │   ├── userValidate.js
│   │   ├── wishlistValidate.js
│   │   └── validatorUtils.js     # Validation helpers
│   │
│   ├── app.js               # Express app setup
│   ├── server.js            # Server entry point
│   └── seed.js              # Database seeder
│
├── uploads/                 # User-uploaded files (gitignored)
├── logs/                    # Application logs (gitignored)
├── .env.development         # Environment config (gitignored)
├── .env.example             # Environment template
├── .gitignore
├── Dockerfile               # Docker containerization
├── docker-compose.yml       # Docker Compose configuration
├── package.json
└── README.md
```

### Architectural Layers

1. **Routes** → Define endpoints and apply middleware
2. **Controllers** → Handle HTTP request/response logic
3. **Services** → Contain business logic and data operations
4. **Models** → Define schemas and interact with MongoDB
5. **Middlewares** → Cross-cutting concerns (auth, logging, etc.)
6. **Utils** → Reusable helper functions
7. **Validators** → Request input validation

## Security

This API implements multiple security layers:

### Authentication & Authorization

- ✅ **JWT Authentication**: Access and refresh token system
- ✅ **Refresh Token Rotation**: One-time use refresh tokens for enhanced security
- ✅ **HttpOnly Cookies**: Refresh tokens stored securely, inaccessible to JavaScript
- ✅ **Role-Based Access Control (RBAC)**: Admin, Manager, User roles with permissions
- ✅ **Permission System**: Granular control over user actions

### Data Protection

- ✅ **Password Hashing**: bcrypt with 10 salt rounds
- ✅ **Input Validation**: All endpoints validate request data
- ✅ **Auto-Expiring Tokens**: MongoDB TTL indexes for automatic cleanup

### Network Security

- ✅ **Helmet.js**: HTTP security headers (CSP, X-Frame-Options, etc.)
- ✅ **CORS**: Origin whitelist to prevent unauthorized cross-origin requests
- ✅ **Rate Limiting**: Global and auth-specific rate limiters
- ✅ **File Upload Restrictions**: Type and size validation

### Additional Measures

- ✅ **Error Handling**: Consistent error responses without exposing internals
- ✅ **Request Logging**: All requests logged for audit trail
- ✅ **Environment Separation**: Different configs for dev/prod environments

## Testing

### Using cURL

#### Register a new user

```bash
curl -X POST http://localhost:3000/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!@#",
    "firstName": "Test",
    "lastName": "User"
  }'
```

#### Login and save refresh token

```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -c cookies.txt \
  -d '{
    "email": "admin@example.com",
    "password": "Password123!"
  }'
```

**Note**: The `-c cookies.txt` flag saves cookies (including refresh token) to a file.

#### Get users (authenticated)

```bash
curl -X GET http://localhost:3000/api/v1/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE"
```

#### Refresh access token

```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -b cookies.txt \
  -H "Content-Type: application/json"
```

**Note**: The `-b cookies.txt` flag sends saved cookies with the request.

#### Upload file

```bash
curl -X POST http://localhost:3000/api/v1/upload \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN_HERE" \
  -F "file=@/path/to/your/file.jpg"
```

#### Health check

```bash
curl http://localhost:3000/api/v1/health
```

### Using Postman

1. Create a collection in Postman
2. Import endpoints from the API Documentation section
3. Set up environment variables:
   - `baseUrl`: `http://localhost:3000/api/v1`
   - `accessToken`: Obtained from login response
4. Use **Pre-request Script** to refresh token before authenticated requests:
   ```javascript
   // Auto-refresh token if expired
   const accessToken = pm.environment.get("accessToken");
   if (!accessToken) {
     pm.sendRequest(
       {
         url: `${pm.environment.get("baseUrl")}/auth/refresh`,
         method: "POST",
       },
       (err, response) => {
         const { data } = response.json();
         pm.environment.set("accessToken", data.accessToken);
       }
     );
   }
   ```

## Deployment

### Production Environment Variables

Before deploying to production, ensure you have configured:

```bash
NODE_ENV=production
PORT=3000                          # Or your production port
MONGODB_URI=your_production_uri    # MongoDB Atlas connection string

# Generate secure secrets (min 32 characters)
JWT_ACCESS_SECRET=your_long_secure_secret
JWT_REFRESH_SECRET=your_long_secure_secret

JWT_ACCESS_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

COOKIE_SECURE=true                 # HTTPS only
COOKIE_SAME_SITE=strict            # Stricter SameSite policy
CORS_ORIGIN=https://your-frontend-domain.com

RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
AUTH_RATE_LIMIT_WINDOW_MS=900000
AUTH_RATE_LIMIT_MAX_REQUESTS=10

MAX_FILE_SIZE=5242880
ALLOWED_FILE_TYPES=image/jpeg,image/png,image/gif,application/pdf
```

### MongoDB Atlas Setup

1. Create account: https://www.mongodb.com/cloud/atlas
2. Create a new cluster (M0 free tier or higher)
3. Create a database user with strong password
4. Add your server IP to IP whitelist (or use 0.0.0.0/0 for any IP)
5. Connect your app using the connection string provided
6. Recommended: Enable backup and monitoring features for production

### Docker Deployment

```bash
# Build Docker image
docker build -t library-api .

# Run container
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e MONGODB_URI=your_mongodb_uri \
  -e JWT_ACCESS_SECRET=your_secret \
  -e JWT_REFRESH_SECRET=your_secret \
  -e CORS_ORIGIN=https://your-domain.com \
  --name library-api \
  library-api
```

### Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down
```

See `docker-compose.yml` for service configuration.

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/AmazingFeature`
3. Make your changes and commit: `git commit -m 'Add AmazingFeature'`
4. Push to branch: `git push origin feature/AmazingFeature`
5. Open a Pull Request

Please ensure your code:

- Follows the existing code style and patterns (see `agents.md`)
- Includes appropriate error handling
- Validates all inputs
- Maintains security best practices
- Respects the layered architecture

## License

MIT License - see LICENSE file for details

## Support & Issues

- **Bug Reports**: Open an issue on GitHub with detailed reproduction steps
- **Feature Requests**: Submit as GitHub issues with use case description
- **Security Vulnerabilities**: Please email security@example.com (do not open public issues)

## Quick References

- [Express.js Docs](https://expressjs.com/)
- [Mongoose Docs](https://mongoosejs.com/)
- [MongoDB Docs](https://docs.mongodb.com/)
- [JWT.io](https://jwt.io/)
- [Helmet.js Docs](https://helmetjs.github.io/)
