const express = require('express');
const admin = require("firebase-admin");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// 1. Firebase Setup (Ensure credentials file exists in the root folder)
const credentials = require("./fir-2-db7a0-firebase-adminsdk-fbsvc-8416627615.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

console.log("Firebase initialized successfully");

// 2. Middleware to verify Token (The "Security Guard")
// This checks if the request has a valid Firebase ID Token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split('Bearer ')[1];

  if (!token) {
    return res.status(401).json({ error: "No token provided" });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // After verification, user info is attached to the request
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

// 3. Public Route: Signup
// Used to create a user in Firebase Auth for testing purposes
app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await admin.auth().createUser({ email, password });
    res.status(201).json({ message: "User created!", uid: user.uid });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Protected Route: Profile
// This route is only accessible if a valid ID Token is provided
app.get('/profile', verifyToken, (req, res) => {
  res.json({
    message: "Welcome to your profile!",
    user: req.user // Contains email, UID, and other token data
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
