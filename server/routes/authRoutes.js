const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
require("dotenv").config();

const router = express.Router();
// Login API
router.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
  
      console.log("🔹 Login request received:", req.body);
  
      // Check if the user exists
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });
  
      res.status(200).json({
        message: "Login successful",
        token,
        user: { id: user.id, username: user.username, email: user.email },
      });
  
      console.log("✅ User logged in:", user.username);
    } catch (error) {
      console.error("❌ Login error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });
  
// Register API
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({ username, email, password: hashedPassword });

    // Generate JWT
    const token = jwt.sign(
        { userId: newUser.id },
        process.env.JWT_SECRET || "fallback_secret",
        { expiresIn: "1h" }
      );
    console.log('token - >>', token)

    res.status(201).json({ message: "User registered successfully", token, user: { id: newUser.id, username, email } });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
