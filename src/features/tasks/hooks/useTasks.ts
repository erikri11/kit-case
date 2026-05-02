import { useEffect, useState } from "react";
import type { Task } from "../models/task.model";
import { taskApi } from "../api/taskApi";
import { socket, connectSocket } from "@shared/socket/socket";
import { EVENTS } from "@shared/models/constants/events.constants";
import type { Trend } from "@features/overview/models/trend.type";
import { getPercentChange } from "@shared/utils/getPercentChange";

const isActiveTask = (task: Task) =>
  task.status === "Todo" || task.status === "InProgress";

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

  const now = new Date();

  const startOfThisMonth = new Date(
    now.getFullYear(),
    now.getMonth(),
    1
  );

  const startOfLastMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1
  );

  const activeTasks = tasks.filter(isActiveTask).length;

  const activeTasksThisMonth = tasks.filter((task) => {
    const createdAt = new Date(task.createdAt);
    return (
      isActiveTask(task) &&
      createdAt >= startOfThisMonth
    );
  }).length;

  const activeTasksLastMonth = tasks.filter((task) => {
    const createdAt = new Date(task.createdAt);
    return (
      isActiveTask(task) &&
      createdAt >= startOfLastMonth &&
      createdAt < startOfThisMonth
    );
  }).length;

  const activeTasksDiff = getPercentChange(
    activeTasksThisMonth,
    activeTasksLastMonth
  );

  const activeTasksTrend: Trend =
    activeTasksDiff === null || activeTasksDiff >= 0 ? "up" : "down";

  const upcomingTasks = tasks
    .filter((task) => task.status !== "Done")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 3);

  return {
    tasks,
    activeTasks,
    activeTasksThisMonth,
    activeTasksDiff,
    activeTasksTrend,
    upcomingTasks
  };
}
