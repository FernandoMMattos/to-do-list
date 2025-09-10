import {
  getTasks,
  createTask,
} from "../../../../backend/controllers/tasksController.js";
import verifyToken from "../../../../backend/middlewares/authMiddleware.js";
import verifyUserAccess from "../../../../backend/middlewares/verifyUserAccess.js";
import { connectDB } from "../../../../backend/db/mongoClient.js";

export default async function handler(req, res) {
  const { method } = req;

  try {
    await connectDB();
    await verifyToken(req, res);
    await verifyUserAccess(req, res);

    if (method === "GET") return getTasks(req, res);
    if (method === "POST") return createTask(req, res);

    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("Error in tasks API:", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
