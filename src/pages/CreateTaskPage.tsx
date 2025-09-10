import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import Input from "../components/Input";
import Button from "../components/Button";
import { createTask } from "../services/tasksService";
import styled from "styled-components";
import { errorMessage, successMessage } from "../utils/notifications";
import { useIsMobile } from "../hooks/useIsMobile";
import type ITasks from "../types/ITasks";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  border: 2px solid var(--medium-gray);
  padding: 1rem;
  border-radius: 1rem;
  align-items: center;
  justify-self: anchor-center;
  margin-top: 10%;
`;

const StyledBtns = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: space-around;

  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledBtn = styled.button`
  display: flex;
  gap: 5px;
  background-color: transparent;
  border: none;
`;

const StyledDivBtns = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const StyledH2 = styled.h2`
  text-align: center;
`

const CreateTask = () => {
  const [value, setValue] = useState<Dayjs | null>(null);
  const [taskName, setTaskName] = useState<string>("");
  const [type, setType] = useState<"personal" | "work" | "">("");
  const [importance, setImportance] = useState<number | null>(null);
  const [hasDeadline, setHasDeadline] = useState<boolean | null>(null);

  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const handleAddTask = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!taskName || !type || !importance || (hasDeadline && !value)) {
      errorMessage("Please fill in all fields.");
      return;
    }

    const task: ITasks = {
      name: taskName,
      status: "pending",
      importance,
      type,
      deadline: hasDeadline && value ? value.toDate() : null,
      taskId: "",
    };

    try {
      await createTask(task);
      successMessage("Task created!");
      setTaskName("");
      setType("");
      setImportance(null);
      setValue(null);
      setHasDeadline(null);
      navigate("/");
    } catch (error: unknown) {
      if (error instanceof Error) console.error(error.message);
      else console.error(error);
      errorMessage("Oops, something went wrong!");
    }
  };

  return (
    <StyledForm
      onSubmit={handleAddTask}
      style={{ width: `${isMobile ? "90%" : "50%"}` }}
    >
      <h1>Create a task</h1>

      <Input
        placeholder="Name of the task"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        id="task_name"
        name="task_name"
      />

      <StyledH2>Task importance</StyledH2>
      <StyledBtns>
        <StyledDivBtns>
          {[
            { label: "Not much", value: 1 },
            { label: "Important", value: 2 },
            { label: "Very", value: 3 },
          ].map(({ label, value }) => (
            <StyledBtn key={label} type="button">
              <input
                type="radio"
                name="importance"
                value={value}
                checked={importance === value}
                onChange={() => setImportance(value)}
                id={label}
              />
              <label htmlFor={label}>{label}</label>
            </StyledBtn>
          ))}
        </StyledDivBtns>
      </StyledBtns>

      <StyledH2>What is the type of the task?</StyledH2>
      <StyledBtns>
        <StyledDivBtns>
          {["personal", "work"].map((t) => (
            <StyledBtn key={t} type="button">
              <input
                type="radio"
                name="type"
                value={t}
                checked={type === t}
                onChange={() => setType(t as typeof type)}
                id={t}
              />
              <label htmlFor={t}>{t[0].toUpperCase() + t.slice(1)}</label>
            </StyledBtn>
          ))}
        </StyledDivBtns>
      </StyledBtns>

      <StyledH2>Does the task have a deadline?</StyledH2>
      <StyledBtns>
        <StyledDivBtns>
          <StyledBtn type="button">
            <input
              type="radio"
              name="deadline"
              value="true"
              checked={hasDeadline === true}
              onChange={() => {
                setHasDeadline(true);
                setValue(dayjs());
              }}
              id="yes"
            />
            <label htmlFor="yes">Yes</label>
          </StyledBtn>
          <StyledBtn type="button">
            <input
              type="radio"
              name="deadline"
              value="false"
              checked={hasDeadline === false}
              onChange={() => {
                setHasDeadline(false);
                setValue(null);
              }}
              id="no"
            />
            <label htmlFor="no">No</label>
          </StyledBtn>
        </StyledDivBtns>
      </StyledBtns>

      {hasDeadline ? (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Deadline"
            value={value}
            onChange={(newValue) => setValue(newValue)}
            minDate={dayjs()}
          />
        </LocalizationProvider>
      ) : null}

      <StyledBtns>
        <StyledDivBtns>
          <Button onClick={() => navigate("/")} type="button">
            Go Back
          </Button>
          <Button type="submit">Save Task</Button>
        </StyledDivBtns>
      </StyledBtns>
    </StyledForm>
  );
};

export default CreateTask;
