import api from "./api";
import { getUserId } from "./userService";
import type ITasks from "../types/ITasks";
import type { AxiosResponse } from "axios";

const getValidUserId = (): string => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found");
  return userId;
};

const getTasks = async (): Promise<ITasks[]> => {
  const userId = getValidUserId();
  const baseUrl = `/users/${userId}/tasks`;

  const res: AxiosResponse<ITasks[]> = await api.get(baseUrl);

  if (!Array.isArray(res.data)) {
    console.error("Unexpected data received from API:", res.data);
    return [];
  }

  return res.data.map((task) => ({
    taskId: task.taskId,
    name: task.name,
    status: task.status,
    importance: task.importance,
    type: task.type,
    deadline: task.deadline,
  }));
};

const createTask = async (taskData: ITasks) => {
  const userId = getValidUserId();
  const baseUrl = `/users/${userId}/tasks`;

  const res = await api.post(baseUrl, taskData);
  return res.data;
};

const updateTask = async (taskId: string, updatedData: Partial<ITasks>) => {
  const userId = getValidUserId();
  const url = `/users/${userId}/tasks/${taskId}`;

  const res = await api.put(url, updatedData);
  return res.data;
};

const deleteTask = async (taskId: string) => {
  const userId = getValidUserId();
  const url = `/users/${userId}/tasks/${taskId}`;

  const res = await api.delete(url);
  return res.data;
};

const cycleTaskStatus = async (task: ITasks) => {
  const userId = getValidUserId();
  const url = `/users/${userId}/tasks/${task.taskId}`;

  const statuses: ("pending" | "in progress" | "completed")[] = [
    "pending",
    "in progress",
    "completed",
  ];

  const currentIndex = statuses.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  const newStatus = statuses[nextIndex];

  const res = await api.put(url, { status: newStatus });

  return res.data; // updated task
};

export { getTasks, createTask, updateTask, deleteTask, cycleTaskStatus };
