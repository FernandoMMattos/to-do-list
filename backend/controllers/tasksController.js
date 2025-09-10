import { v4 as uuidv4 } from "uuid";
import { getUsersCollection } from "../db/mongoClient.js";
import { ObjectId } from "mongodb";

export const getTasks = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await getUsersCollection().findOne({
      _id: new ObjectId(userId),
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user.tasks || []);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { userId } = req.query;
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

    const result = await getUsersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $push: { tasks: newTask } }
    );

    if (result.modifiedCount === 0)
      return res.status(404).json({ error: "User not found" });

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error creating task:", err);
    res.status(500).json({ error: "Error creating task" });
  }
};

export const updateTaskController = async (req, res) => {
  try {
    const { userId, taskId } = req.query;
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

    const result = await getUsersCollection().updateOne(
      { _id: new ObjectId(userId), "tasks.taskId": taskId },
      { $set: updateData }
    );

    if (result.modifiedCount === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task updated successfully" });
  } catch (err) {
    console.error("Error updating task:", err);
    res.status(500).json({ error: "Error updating task" });
  }
};

export const deleteTaskController = async (req, res) => {
  try {
    const { userId, taskId } = req.query;

    const result = await getUsersCollection().updateOne(
      { _id: new ObjectId(userId) },
      { $pull: { tasks: { taskId } } }
    );

    if (result.modifiedCount === 0)
      return res.status(404).json({ error: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting task:", err);
    res.status(500).json({ error: "Error deleting task" });
  }
};
