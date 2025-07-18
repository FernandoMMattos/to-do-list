import styled from "styled-components";

interface TaskNameProps {
  color?: string;
}

const TaskNameDisplay = styled.div<TaskNameProps>`
  border-radius: 1rem;
  width: 100%;
  text-align: center;
  font-weight: bold;
  padding: 1rem;
  border: 2px solid var(--medium-gray);
  white-space: pre-wrap;
  overflow-wrap: break-word;
  background-color: var(--white);
  color: ${(props) => props.color || "black"};
`;

export default TaskNameDisplay;
