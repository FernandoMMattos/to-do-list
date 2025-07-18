import type { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

type ButtonProps = {
  children: React.ReactNode;
  iconOnly?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Btn = styled.button`
  border: 2px solid var(--medium-gray);
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--white);
  cursor: pointer;
  width: auto;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  place-self: center;

  &:hover {
    border-color: var(--light-blue);
  }
`;

const BtnIcon = styled.span`
  font-size: large;
`;

const Button = ({
  children,
  iconOnly = false,
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <Btn type={type} {...props}>
      {iconOnly ? <BtnIcon>{children}</BtnIcon> : children}
    </Btn>
  );
};

export default Button;
