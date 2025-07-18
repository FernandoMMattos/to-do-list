import { useNavigate } from "react-router-dom";
import { getToken, getUserId } from "../services/userService";
import { useCallback, useMemo } from "react";

const useAuth = () => {
  const navigate = useNavigate();

  const isAuthenticated = useMemo(() => !!getToken(), []);
  const userId = useMemo(() => getUserId(), []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  }, [navigate]);

  return { isAuthenticated, userId, logout };
};

export default useAuth;
