import Input from "../components/Input";
import Button from "../components/Button";
import LayoutPage from "./Layout";
import Label from "../components/Label";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { registerUser } from "../services/userService";
import styled from "styled-components";
import { errorMessage, successMessage } from "../utils/notifications";

  const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
  `;

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const register = async () => {
    if (!email || !password || !confirmPassword) {
      errorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      errorMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      await registerUser(email, password, confirmPassword);
      successMessage("User logged in");
      navigate("/login");
    } catch {
      errorMessage("Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register();
  };

  return (
    <LayoutPage>
      <h1>Welcome, create your account!</h1>
      <StyledForm onSubmit={handleSubmit} autoComplete="off">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
          />
        </div>

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="confirmPassword">Confirm your password</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <p>
          Already have an account? <Link to={"/login"}>Sign In!</Link>
        </p>

        <Button type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Create account"}
        </Button>
      </StyledForm>
    </LayoutPage>
  );
};

export default RegisterPage;
