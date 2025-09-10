import api from "./api";
import { getUserId } from "./userService";
import type ITasks from "../types/ITasks";

const getValidUserId = (): string => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found");
  return userId;
};

export const getTasks = async (): Promise<ITasks[]> => {
  const userId = getValidUserId();
  const res = await api.get(`/users/${userId}/tasks`);
  return res.data;
};

export const createTask = async (taskData: Omit<ITasks, "taskId">) => {
  const userId = getValidUserId();
  const res = await api.post(`/users/${userId}/tasks`, taskData);
  return res.data;
};

export const updateTask = async (
  taskId: string,
  updatedData: Partial<ITasks>
) => {
  const userId = getValidUserId();
  const res = await api.put(`/users/${userId}/${taskId}`, updatedData);
  return res.data;
};

export const deleteTask = async (taskId: string) => {
  const userId = getValidUserId();
  const res = await api.delete(`/users/${userId}/${taskId}`);
  return res.data;
};

export const cycleTaskStatus = async (task: ITasks) => {
  const statuses: ITasks["status"][] = ["pending", "in progress", "completed"];
  const currentIndex = statuses.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  const newStatus = statuses[nextIndex];

  return updateTask(task.taskId, { status: newStatus });
};
