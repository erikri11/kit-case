import { Task } from "./task.model";
import { v4 as uuidv4 } from "uuid";

export const mockTasks: Task[] = [
  {
    id: uuidv4(),
    title: "Follow up customer onboarding",
    description: "Call customer and verify setup",
    priority: "High",
    status: "Todo",
    dueDate: new Date() ,
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Review contract",
    description: "Check latest contract details",
    priority: "Medium",
    status: "InProgress",
    dueDate: new Date(),
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Send welcome email",
    priority: "Low",
    status: "Done",
    dueDate: new Date(),
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Prepare product demo",
    description: "Create demo environment and test data",
    priority: "High",
    status: "InProgress",
    dueDate: new Date(),
    createdAt: new Date()
  },
  {
    id: uuidv4(),
    title: "Update documentation",
    description: "Add latest feature updates to docs",
    priority: "Low",
    status: "Todo",
    dueDate: new Date(),
    createdAt: new Date()
  }
];
