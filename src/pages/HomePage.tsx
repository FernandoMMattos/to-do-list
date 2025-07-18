import { useNavigate } from "react-router-dom";
import ToDoList from "../components/ToDoList";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) return null;

  return <ToDoList />;
};

export default HomePage;
