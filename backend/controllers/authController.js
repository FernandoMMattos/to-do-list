import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getUsersCollection } from "../db/mongoClient.js";

const JWT_SECRET = process.env.JWT_PASSWORD;

export const register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersCollection = getUsersCollection();

    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { email, password: hashedPassword, tasks: [] };
    const result = await usersCollection.insertOne(newUser);

    res.status(201).json({ message: "User registered", userId: result.insertedId });
  } catch (err) {
    console.error("Error in register:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const usersCollection = getUsersCollection();

    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });
    res.json({ token, userId: user._id });
  } catch (err) {
    console.error("Error in login:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};
