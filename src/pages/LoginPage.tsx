import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Label from "../components/Label";
import LayoutPage from "./Layout";
import { useState } from "react";
import { loginUser } from "../services/userService";
import styled from "styled-components";
import { errorMessage, successMessage } from "../utils/notifications";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = (location.state as { from?: Location })?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await loginUser(email, password);
      successMessage("User created!");
      navigate(from, { replace: true });
    } catch (err: unknown) {
      errorMessage("Invalid email or password");
      console.log(err);
    }
  };

  return (
    <LayoutPage>
      <h1>Welcome, Sign In!</h1>
      <StyledForm onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
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
        <p>
          Doesn't have an account? <Link to={"/register"}>Click here!</Link>
        </p>
        <Button type="submit" disabled={loading || !email || !password}>
          {loading ? "Signing in..." : "Sign In"}
        </Button>
      </StyledForm>
    </LayoutPage>
  );
};

export default LoginPage;
