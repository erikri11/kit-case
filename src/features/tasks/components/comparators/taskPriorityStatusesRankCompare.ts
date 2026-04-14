import { TASK_PRIORITY_STATUS_CONFIG } from "@features/tasks/models/taskPriorityStatusConfig";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const taskPriorityStatusesCompare = createConfigRankCompare(TASK_PRIORITY_STATUS_CONFIG);
