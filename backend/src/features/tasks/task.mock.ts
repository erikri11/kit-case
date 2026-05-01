import { addDays } from "../../shared/utils/addDays";
import { generateTaskNumber } from "../../shared/utils/generateTaskNumber";
import { Task } from "./task.model";

export const mockTasks: Task[] = [
  // (April 2026)
  {
    id: generateTaskNumber(),
    title: "Follow up customer onboarding",
    description: "Call customer and verify setup",
    priority: "High",
    status: "Todo",
    dueDate: addDays(7),
    createdAt: new Date("2026-04-20T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Review contract",
    description: "Check latest contract details",
    priority: "Medium",
    status: "InProgress",
    dueDate: addDays(5),
    createdAt: new Date("2026-04-18T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Send welcome email",
    priority: "Low",
    status: "Done",
    dueDate: addDays(3),
    createdAt: new Date("2026-04-10T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Fix login bug",
    description: "Resolve authentication issue",
    priority: "High",
    status: "Todo",
    dueDate: addDays(7),
    createdAt: new Date("2026-04-22T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Update dashboard UI",
    priority: "Medium",
    status: "InProgress",
    dueDate: addDays(7),
    createdAt: new Date("2026-04-24T12:00:00")
  },

  // (March 2026)
  {
    id: generateTaskNumber(),
    title: "Prepare product demo",
    description: "Create demo environment and test data",
    priority: "High",
    status: "InProgress",
    dueDate: addDays(7),
    createdAt: new Date("2026-03-20T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Update documentation",
    description: "Add latest feature updates to docs",
    priority: "Low",
    status: "Todo",
    dueDate: addDays(5),
    createdAt: new Date("2026-03-15T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Refactor API calls",
    priority: "Medium",
    status: "Done",
    dueDate: addDays(3),
    createdAt: new Date("2026-03-10T12:00:00")
  },
  {
    id: generateTaskNumber(),
    title: "Customer feedback review",
    priority: "Low",
    status: "Todo",
    dueDate: addDays(3),
    createdAt: new Date("2026-03-12T12:00:00")
  },

  // (February 2026)
  {
    id: generateTaskNumber(),
    title: "Initial project setup",
    priority: "High",
    status: "Done",
    dueDate: addDays(7),
    createdAt: new Date("2026-02-10T12:00:00")
  }
];
