import User from "../models/User.js";
import jwt from "jsonwebtoken";

/* ===== REGISTER ===== */
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const user = await User.create({ name, email, password, role });

    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ===== LOGIN ===== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user || user.password !== password) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export const toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      msg: `User is now ${user.isActive ? "ACTIVE" : "INACTIVE"}`,
      user
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

/* ===== GET USERS (ADMIN) ===== */
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};