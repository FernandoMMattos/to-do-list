import api from "./api";

const loginUser = async (email: string, password: string) => {
  const res = await api.post("/login", { email, password });
  const { token, userId } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("userId", userId);
  return { token, userId };
};

const registerUser = async (
  email: string,
  password: string,
  confirmedPassword: string
) => {
  if (!email || !password || !confirmedPassword) {
    throw new Error("All fields are required.");
  }
  if (password !== confirmedPassword) {
    throw new Error("Passwords do not match.");
  }

  const res = await api.post("/register", { email, password });
  return res.data;
};

const getUserId = () => localStorage.getItem("userId");

const getToken = () => localStorage.getItem("token");

export { loginUser, registerUser, getUserId, getToken };
