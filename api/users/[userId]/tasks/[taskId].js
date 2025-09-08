import verifyToken from "../../../../../backend/middlewares/authMiddleware";
import verifyUserAccess from "../../../../../backend/middlewares/verifyUserAccess";
import {
  updateTaskController,
  deleteTaskController,
} from "../../../../../backend/controllers/tasksController";

export default async function handler(req, res) {
  const {
    method,
    query: { userId, taskId },
  } = req;

  try {
    await verifyToken(req, res);
    await verifyUserAccess(req, res);

    if (method === "PUT") {
      return updateTaskController(req, res);
    }
    if (method === "DELETE") {
      return deleteTaskController(req, res);
    }

    return res.status(405).json({ message: "Method Not Allowed" });
  } catch (err) {
    return res.status(401).json({ message: err.message || "Unauthorized" });
  }
}
