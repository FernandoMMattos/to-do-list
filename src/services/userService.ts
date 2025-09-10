import api from "./api";

export const registerUser = async (email: string, password: string) => {
  const res = await api.post("/auth/register", { email, password });
  return res.data;
};

export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  localStorage.setItem("token", res.data.token);
  localStorage.setItem("userId", res.data.userId);

  return res.data;
};

export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
};

export const getUserId = (): string | null => {
  return localStorage.getItem("userId");
};

export const getToken = (): string | null => {
  return localStorage.getItem("token")
}