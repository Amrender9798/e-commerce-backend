// controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import ResetToken from "../models/resetToken.js";

export async function register(req, res) {
  try {
    const { username, email, password } = req.body;
    console.log(username, email, password);
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ token, name: user.username, email: user.email, expiresIn: 60 * 60 * 1000 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function setPassword(req, res) {
  const { token, newPassword } = req.body;
  try {
    const tokenRecord = await ResetToken.findOne({ token });
    if (!tokenRecord) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }
    if (tokenRecord.createdAt < Date.now() - 3600000) {
      return res.status(400).json({ message: "Token has expired" });
    }
    const user = await User.findOne({ email: tokenRecord.email });
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    await ResetToken.deleteOne({ token });
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
}
