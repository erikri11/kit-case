import { useEffect, useState } from "react";
import type { Task } from "../models/task.model";
import { taskApi } from "../api/taskApi";
import { socket, connectSocket } from "@shared/socket/socket";
import { EVENTS } from "@shared/models/constants/events.constants";

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
    connectSocket();

    const handleCreated = (task: Task) => {
      setTasks((prev) =>
        prev.some((t) => t.id === task.id) ? prev : [task, ...prev]
      );
    };

    const handleUpdated = (updatedTask: Task) => {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    };

    const handleDeleted = (taskId: string) => {
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
    };

    socket.on(EVENTS.TASK.CREATED, handleCreated);
    socket.on(EVENTS.TASK.UPDATED, handleUpdated);
    socket.on(EVENTS.TASK.DELETED, handleDeleted);

    return () => {
      socket.off(EVENTS.TASK.CREATED, handleCreated);
      socket.off(EVENTS.TASK.UPDATED, handleUpdated);
      socket.off(EVENTS.TASK.DELETED, handleDeleted);
    };
  }, []);

  const activeTasks = tasks.filter(
    (task) => task.status === "Todo" || task.status === "InProgress"
  ).length;

  return {
    tasks,
    activeTasks,
  };
}
