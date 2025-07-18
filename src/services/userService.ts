import axios from "axios";

const API_URL = "http://localhost:4000";

const loginUser = async (email: string, password: string) => {
  const res = await axios.post(`${API_URL}/login`, { email, password });
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
  
  const res = await axios.post(`${API_URL}/register`, { email, password });
  return res.data;
};

const getUserId = () => {
  return localStorage.getItem("userId");
};

const getToken = () => {
  return localStorage.getItem("token");
};

export { loginUser, registerUser, getUserId, getToken };
