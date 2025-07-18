const { v4: uuidv4 } = require("uuid");
const {
  findUserTasks,
  addTask,
  updateTask,
  deleteTask,
  findTask,
} = require("../models/userModel");

const getTasks = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await findUserTasks(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user.tasks || []);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

const createTask = async (req, res) => {
  try {
    const { userId } = req.params;
    const { name, status, importance, type, deadline } = req.body;

    if (!name || !status || !importance || !type) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newTask = {
      taskId: uuidv4(),
      name,
      status,
      importance,
      type,
      deadline: deadline ? new Date(deadline) : null,
    };

    const result = await addTask(userId, newTask);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
};

const updateTaskController = async (req, res) => {
  try {
    const { userId, taskId } = req.params;
    const allowedFields = ["name", "status", "importance", "type", "deadline"];
    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[`tasks.$.${field}`] =
          field === "deadline" && req.body[field]
            ? new Date(req.body[field])
            : req.body[field];
      }
    });

    const result = await updateTask(userId, taskId, updateData);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updatedTask = await findTask(userId, taskId);
    res.json(updatedTask);
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Error updating task" });
  }
};

const deleteTaskController = async (req, res) => {
  try {
    const { userId, taskId } = req.params;

    const result = await deleteTask(userId, taskId);

    if (result.modifiedCount === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Error deleting task" });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTaskController,
  deleteTaskController,
};
