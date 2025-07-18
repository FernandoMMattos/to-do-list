const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { findUserByEmail, insertUser } = require("../models/userModel");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_PASSWORD;

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checar se usuário já existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hashear senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário novo com tasks vazio
    const newUser = {
      email,
      password: hashedPassword,
      tasks: [],
    };

    const result = await insertUser(newUser);

    res.status(201).json({
      message: "User registered successfully",
      userId: result.insertedId,
    });
  } catch (err) {
    console.error("Error in registration:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Comparar senha
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ error: "Incorrect password" });
    }

    // Gerar token JWT
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  register,
  login,
};
