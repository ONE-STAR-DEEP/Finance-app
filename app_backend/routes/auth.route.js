import express from "express";
import mongoose from 'mongoose';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Auth from "../models/auth.js";

const router = express.Router();

const SECRET_KEY = "your_secret_key"; 

// --- Middleware: authenticateToken ---
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = req.cookies.token || (authHeader && authHeader.split(' ')[1]);
  console.log("Token from cookies:", token);
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// --- Register ---
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existing = await Auth.findOne({ email });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new Auth({ username, email, passwordHash });
    await newUser.save();

    res.json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Login ---
router.post("/login", async (req, res) => {
  try {
    const { email , password } = req.body;
    const user = await Auth.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: false,      // true in production HTTPS
        sameSite: "lax",
      })
      .json({ message: "Logged in successfully", token: token });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// --- Check logged-in user ---
router.get("/me", authenticateToken, async (req, res) => {
  const user = await Auth.findById(req.user.id).select("-passwordHash");
  res.json(user);
});

// --- Logout ---
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out successfully" });
});


export default router;