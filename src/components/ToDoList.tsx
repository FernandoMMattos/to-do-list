import ToDoListContent from "./ToDoListContent";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteTask } from "../services/tasksService";
import styled from "styled-components";
import DropDown from "./Dropdown";
import useTasks from "../hooks/useTasks";
import type ITasks from "../types/ITasks";
import { warningMessage } from "../utils/notifications";
import { useIsMobile } from "../hooks/useIsMobile";

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100vh;
  padding-top: 5vh;
  text-align: center;
`;

const StyledTitle = styled.h1`
  margin-bottom: 1.5rem;
`;

const StyledListSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 2px solid var(--medium-gray);
  padding: 1rem;
  border-radius: 1rem;
  align-self: center;
  margin: 1rem;
  width: 90%;
`;

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  gap: 1.5rem;
`;

const StyledLists = styled.div<{ $isMobile?: boolean }>`
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 1rem;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`;

const StyledUl = styled.ul`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 0.5rem;
  border-radius: 1rem;
  width: 100%;
  max-height: 300px;
`;

const StyledHeaderBtns = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  gap: 1rem;
`;

const ToDoList = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>("");
  const [selectedType] = useState<string>("all");
  const { tasks, setTasks, loading, error } = useTasks();
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");
  const statuses = ["pending", "in progress", "completed"];
  const [hasWarned, setHasWarned] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (tasks.length > 0 && !hasWarned) {
      const now = new Date();

      tasks.forEach((task) => {
        if (task.deadline) {
          const deadLineDate = new Date(task.deadline);
          const diffInDays =
            (deadLineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

          if (diffInDays <= 3 && diffInDays > 0) {
            warningMessage(
              `Task near deadline! You have approximately ${Math.ceil(
                diffInDays
              )} day(s) to do the "${task.name}" task`
            );
          }
        }
      });

      setHasWarned(true);
    }
  }, [tasks, hasWarned]);

  const handleDelete = async (id: string) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((task) => task.taskId !== id));
  };

  const handleStatusChange = (updatedTask: ITasks) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.taskId === updatedTask.taskId ? updatedTask : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesType =
      selectedType === "all" ||
      task.type.toLowerCase() === selectedType.toLowerCase();
    return matchesSearch && matchesType;
  });

  if (loading) return <p>loading tasks...</p>;
  if (error) return <p>{error}</p>;

  return (
    <StyledSection>
      <StyledTitle>To do list</StyledTitle>
      <StyledListSection>
        <StyledHeader>
          {isMobile ? (
            <>
              <Input
                placeholder="Search for a task"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="task"
                id="task"
              />
              <StyledHeaderBtns>
                <DropDown
                  selectedType={selectedStatus}
                  setSelectedType={setSelectedStatus}
                  options={statuses}
                />
                <Button onClick={() => navigate("/create-task")}>
                  Add task
                </Button>
              </StyledHeaderBtns>
            </>
          ) : (
            <StyledHeaderBtns>
              <Input
                placeholder="Search for a task"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                name="task"
                id="task"
              />
              <Button onClick={() => navigate("/create-task")}>Add task</Button>
            </StyledHeaderBtns>
          )}
        </StyledHeader>

        <StyledLists>
          {statuses.map((status) => {
            const filteredByStatus = filteredTasks.filter(
              (task) => task.status === status
            );

            const sortedTasks = [...filteredByStatus].sort(
              (a, b) => (b.importance || 0) - (a.importance || 0)
            );

            return (
              <div
                key={status}
                style={{
                  display:
                    isMobile && selectedStatus !== status ? "none" : "block",
                }}
              >
                <h2>{status[0].toUpperCase() + status.substring(1)}</h2>
                <StyledUl>
                  {sortedTasks.length > 0 ? (
                    <ToDoListContent
                      tasks={sortedTasks}
                      onDelete={handleDelete}
                      onStatusChange={handleStatusChange}
                    />
                  ) : (
                    <p style={{ fontStyle: "italic", color: "gray" }}>
                      Empty list
                    </p>
                  )}
                </StyledUl>
              </div>
            );
          })}
        </StyledLists>
      </StyledListSection>
    </StyledSection>
  );
};

export default ToDoList;
