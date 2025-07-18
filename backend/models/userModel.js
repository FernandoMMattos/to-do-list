const { ObjectId } = require("mongodb");
const { getUsersCollection } = require("../db/mongoClient");

async function findUserByEmail(email) {
  return getUsersCollection().findOne({ email });
}

async function insertUser(user) {
  return getUsersCollection().insertOne(user);
}

async function findUserById(id) {
  return getUsersCollection().findOne({ _id: new ObjectId(id) });
}

async function findUserTasks(userId) {
  return getUsersCollection().findOne(
    { _id: new ObjectId(userId) },
    { projection: { tasks: 1 } }
  );
}

async function addTask(userId, task) {
  return getUsersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $push: { tasks: task } }
  );
}

async function updateTask(userId, taskId, updateData) {
  return getUsersCollection().updateOne(
    { _id: new ObjectId(userId), "tasks.taskId": taskId },
    { $set: updateData }
  );
}

async function deleteTask(userId, taskId) {
  return getUsersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { tasks: { taskId } } }
  );
}

async function findTask(userId, taskId) {
  const user = await getUsersCollection().findOne(
    { _id: new ObjectId(userId), "tasks.taskId": taskId },
    { projection: { "tasks.$": 1 } }
  );
  return user?.tasks?.[0] || null;
}

module.exports = {
  findUserByEmail,
  insertUser,
  findUserById,
  findUserTasks,
  addTask,
  updateTask,
  deleteTask,
  findTask,
};
