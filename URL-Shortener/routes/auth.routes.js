const express = require("express");
const router = express.Router();
const User = require("../models/user.models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

//Register
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const existingUSer = await User.findOne({ email });
    if (existingUSer) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({ name, email, password: hashPassword });

    res.status(201).json({ message: "User Registered", user: newUser });
  } catch (error) {
    res.status(400).json({ error: "User already registered or Invalid data" });
  }
});

//Login

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ error: "Invalid Credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "24hr",
    });
    res.json({ message: "User Logged IN", token });
  } catch (error) {
    return res.status(500).json({ error: "Server Error" });
  }
});

module.exports = router;
