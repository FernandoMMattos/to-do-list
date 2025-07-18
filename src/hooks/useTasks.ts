import { useEffect, useState } from "react";
import type ITasks from "../types/ITasks";
import { getTasks } from "../services/tasksService";

const useTasks = () => {
  const [tasks, setTasks] = useState<ITasks[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadTasks = async () => {
      setLoading(true);
      setError(null);

      try {
        const fetchedTasks = await getTasks();
        if (isMounted) setTasks(fetchedTasks);
      } catch (error) {
        console.error(error);
        if (isMounted) setError("Error on loading tasks");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadTasks();

    return () => {
      isMounted = false;
    };
  }, []);

  return { tasks, setTasks, loading, error };
};

export default useTasks;
