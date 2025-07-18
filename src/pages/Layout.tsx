import styled from "styled-components";

type LayoutProps = {
  children: React.ReactNode;
};

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  max-width: 45%;
  border: 2px solid var(--medium-gray);
  padding: 1rem;
  border-radius: 1rem;
  align-items: center;
  margin-top: 10%;
  text-align: center;
  place-self: center;
`;

const LayoutPage = ({ children }: LayoutProps) => {
  return (
    <StyledSection>
      {children}
    </StyledSection>
  );
};

export default LayoutPage;
