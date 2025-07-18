import type { InputHTMLAttributes } from "react";
import styled from "styled-components";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

const StyledInput = styled.input`
  border-radius: 1rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 1rem;
  border: 2px solid var(--medium-gray);
  background-color: var(--white);
  word-wrap: break-word;

  &:focus {
    border-color: var(--light-blue);
    outline: none;
  }

  &::placeholder {
    text-align: center;
  }
`;

const Input = ({ type="text", ...props }: InputProps) => {
  return <StyledInput type={type} {...props} />;
};

export default Input;
