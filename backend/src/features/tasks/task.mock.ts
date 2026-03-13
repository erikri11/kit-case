import { Task } from "./task.model";
import dayjs from "dayjs";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up customer onboarding",
    description: "Call customer and verify setup",
    priority: "High",
    status: "Todo",
    dueDate: dayjs().add(12, "day").toDate(),
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Review contract",
    description: "Check latest contract details",
    priority: "Medium",
    status: "InProgress",
    dueDate: dayjs().add(14, "day").toDate(),
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Send welcome email",
    priority: "Low",
    status: "Done",
    dueDate: dayjs().add(16, "day").toDate(),
    createdAt: new Date()
  }
];
