# Backend API

## Endpoints

### POST /register
Register a new user.

**Request:**
```json
{
  "username": "string",
  "email": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "username": "string"
}
```

### POST /login
Login an existing user.

**Request:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "username": "string"
}
```

## Database
Uses JSON file storage (`database.json`) for simplicity.

## Security
- Passwords are hashed using SHA-256
- CORS enabled for frontend integration
