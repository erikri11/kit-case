import { TASK_STATUS_RANK } from "@features/tasks/models/taskStatusRank";
import { createRankCompare } from "@shared/utils/createRankCompare";

export const taskStatusRankCompare = createRankCompare(TASK_STATUS_RANK);
