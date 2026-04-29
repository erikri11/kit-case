export const EVENTS = {
  TASK: {
    CREATED: "task:created",
    UPDATED: "task:updated",
    DELETED: "task:deleted",
  },
  ORDER: {
    CREATED: "order:created",
    UPDATED: "order:updated",
    DELETED: "order:deleted",
  },
  PRODUCT: {
    CREATED: "product:created",
    UPDATED: "product:updated",
    DELETED: "product:deleted",
  },
  CUSTOMER: {
    CREATED: "customer:created",
    UPDATED: "customer:updated",
    DELETED: "customer:deleted",
  },
} as const;
