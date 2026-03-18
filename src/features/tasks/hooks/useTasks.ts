import { useEffect, useState } from "react";
import type { Task } from "../models/task.model";
import { taskApi } from "../api/taskApi";

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
    
    useEffect(() => {
      const loadTasks = async () => {
        try {
          const data = await taskApi.get();
          setTasks(data);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : String(error);
          console.error("Failed to load tasks:", errorMessage);
        } 
      };
      loadTasks();
    }, []);

  return tasks;
}
