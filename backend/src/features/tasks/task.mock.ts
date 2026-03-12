import { Task } from "./task.model";
import dayjs from "dayjs";

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Follow up customer onboarding",
    description: "Call customer and verify setup",
    priority: "High",
    status: "Todo",
    customerId: "customer-1",
    dueDate: dayjs().add(12, "day").toDate(),
    createdAt: new Date()
  },
  {
    id: "2",
    title: "Review contract",
    description: "Check latest contract details",
    priority: "Medium",
    status: "InProgress",
    customerId: "customer-2",
    dueDate: dayjs().add(14, "day").toDate(),
    createdAt: new Date()
  },
  {
    id: "3",
    title: "Send welcome email",
    priority: "Low",
    status: "Done",
    customerId: "customer-3",
    dueDate: dayjs().add(16, "day").toDate(),
    createdAt: new Date()
  }
];
