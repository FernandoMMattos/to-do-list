import type { LabelHTMLAttributes } from "react";
import styled from "styled-components";

type LabelProps = {
  children: React.ReactNode;
} & LabelHTMLAttributes<HTMLLabelElement>;

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
`;

const Label = ({ children, ...props }: LabelProps) => {
  return <StyledLabel {...props}>{children}</StyledLabel>;
};

export default Label;
