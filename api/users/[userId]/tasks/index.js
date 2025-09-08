import verifyToken from "../../../../backend/middlewares/authMiddleware";
import verifyUserAccess from "../../../../backend/middlewares/verifyUserAccess";
import {
  getTasks,
  createTask,
} from "../../../../backend/controllers/tasksController";

export default async function handler(req, res) {
  const {
    method,
    query: { userId },
  } = req;

  try {
    await verifyToken(req, res);
    await verifyUserAccess(req, res);

    if (method === "GET") {
      return getTasks(req, res);
    }
    if (method === "POST") {
      return createTask(req, res);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    return res.status(401).json({ message: err.message || "Unauthorized" });
  }
}
