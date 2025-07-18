import { FaRegTrashCan } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import Button from "./Button";
import TaskNameDisplay from "./TaskNameDisplay";
import type ITasks from "../types/ITasks";
import styled from "styled-components";
import { cycleTaskStatus } from "../services/tasksService";

type ToDoListContentProps = {
  tasks: ITasks[];
  onDelete: (id: string) => void;
  onStatusChange: (updatedTask: ITasks) => void;
};

const StyledListItem = styled.li`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  width: 100%;
`;

const ToDoListContent = ({
  tasks,
  onDelete,
  onStatusChange,
}: ToDoListContentProps) => {
  const changeStatus = async (task: ITasks) => {
    try {
      const updatedTask = await cycleTaskStatus(task);
      if (updatedTask) {
        onStatusChange(updatedTask);
      }
    } catch (err) {
      console.error("Error changing task status:", err);
    }
  };

  const getTaskColor = (deadline?: Date | string | null) => {
    if (!deadline) return "black";

    const now = new Date();
    const deadlineDate = new Date(deadline);
    const diffInDays =
      (deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays <= 1) return "red";
    if (diffInDays <= 3) return "orange";
    return "black";
  };

  return (
    <>
      {tasks.map((task) => (
        <StyledListItem key={task.taskId}>
          <TaskNameDisplay color={getTaskColor(task.deadline)}>
            {"!".repeat(task.importance || 0) +
              " " +
              task.name[0].toUpperCase() +
              task.name.substring(1)}
          </TaskNameDisplay>
          <Button onClick={() => changeStatus(task)}>
            <FaCheck />
          </Button>
          <Button
            onClick={() => {
              if (task.taskId) {
                onDelete(task.taskId);
              } else {
                console.warn("No ID found for task:", task);
              }
            }}
          >
            <FaRegTrashCan />
          </Button>
        </StyledListItem>
      ))}
    </>
  );
};

export default ToDoListContent;
