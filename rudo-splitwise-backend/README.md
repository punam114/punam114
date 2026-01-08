# Simple Firebase Authentication Backend

This project serves as a minimal implementation of Firebase Authentication using Node.js and Express.

## Project Structure
- `server.js`: The entire backend logic in a single, easy-to-read file.
- `package.json`: Project dependencies and scripts.
- `fir-2...json`: Your private Firebase service account credentials.

## API Documentation

### 1. Signup (Public)
Create a new user in Firebase Authentication.
- **Method**: `POST`
- **Endpoint**: `/signup`
- **Body**:
  ```json
  {
      "email": "user@example.com",
      "password": "yourpassword"
  }
  ```

### 2. Profile (Protected)
Access user information from the Firebase ID Token.
- **Method**: `GET`
- **Endpoint**: `/profile`
- **Header**: `Authorization: Bearer <FIREBASE_ID_TOKEN>`

## How to Test
1. Start the server using `npm start` or `npm run dev`.
2. Use the `/signup` endpoint to create a user.
3. Obtain a Firebase ID Token (via a client app or the Firebase Auth REST API).
4. Call the `/profile` endpoint with the token in the Authorization header.
