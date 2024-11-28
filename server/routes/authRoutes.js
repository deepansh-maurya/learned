import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import authenticateToken from "../middleware/authenticateToken.js";

const router = express.Router();
const JWT_SECRET = "your_secret_key"; 

router.post("/register", async (req, res) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !password || !email) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const newUser = new User({ email,fullName, password });
    console.log(newUser);

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
console.log(email,password);

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Username and password are required" });
  }

  try {
    const user = await User.findOne({ email });
    console.log(user);
    
    if (!user) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const isMatch = await user.comparePassword(password);
    console.log(isMatch);
    
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user }, JWT_SECRET, { expiresIn: "5d" });

    res.status(200).json({ message: "Login successful", token,user   });
  } catch (err) {
    console.log(err);
    
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/check', authenticateToken, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User is authenticated',
      user: req.user, 
    });
  } catch (error) {
    console.error('Error checking authentication:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
});


export default router;
