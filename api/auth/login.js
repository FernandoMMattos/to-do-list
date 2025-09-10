import { login } from "../../backend/controllers/authController.js";
import { connectDB } from "../../backend/db/mongoClient.js";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    await connectDB();
    return login(req, res);
  } catch (err) {
    console.error("Error in login API:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
