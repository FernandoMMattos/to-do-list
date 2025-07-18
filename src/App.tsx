import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import CreateTask from "./pages/CreateTaskPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import RequireAuth from "./components/requireAuth";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <RequireAuth>
              <HomePage />
            </RequireAuth>
          }
        />
        <Route
          path="/create-task"
          element={
            <RequireAuth>
              <CreateTask />
            </RequireAuth>
          }
        />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
