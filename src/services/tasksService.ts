import api from "./api";
import { getUserId } from "./userService";

export interface ITask {
  taskId: string;
  name: string;
  status: "pending" | "in progress" | "completed";
  importance: "low" | "medium" | "high";
  type: string;
  deadline?: string | null;
}

const getValidUserId = (): string => {
  const userId = getUserId();
  if (!userId) throw new Error("User not found");
  return userId;
};

export const getTasks = async (): Promise<ITask[]> => {
  const userId = getValidUserId();
  const res = await api.get(`/users/${userId}/tasks`);
  return res.data;
};

export const createTask = async (taskData: Omit<ITask, "taskId">) => {
  const userId = getValidUserId();
  const res = await api.post(`/users/${userId}/tasks`, taskData);
  return res.data;
};

export const updateTask = async (
  taskId: string,
  updatedData: Partial<ITask>
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

export const cycleTaskStatus = async (task: ITask) => {
  const statuses: ITask["status"][] = ["pending", "in progress", "completed"];
  const currentIndex = statuses.indexOf(task.status);
  const nextIndex = (currentIndex + 1) % statuses.length;
  const newStatus = statuses[nextIndex];

  return updateTask(task.taskId, { status: newStatus });
};
