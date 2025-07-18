const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/authMiddleware");
const verifyUserAccess = require("../middlewares/verifyUserAccess");
const {
  getTasks,
  createTask,
  updateTaskController,
  deleteTaskController,
} = require("../controllers/tasksController");

router.get("/:userId/tasks", verifyToken, verifyUserAccess, getTasks);
router.post("/:userId/tasks", verifyToken, verifyUserAccess, createTask);
router.put(
  "/:userId/tasks/:taskId",
  verifyToken,
  verifyUserAccess,
  updateTaskController
);
router.delete(
  "/:userId/tasks/:taskId",
  verifyToken,
  verifyUserAccess,
  deleteTaskController
);

module.exports = router;
