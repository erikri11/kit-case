import { TASK_STATUS_CONFIG } from "@features/tasks/models/taskStatusConfig";
import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";

export const taskRankStatusesCompare = createConfigRankCompare(TASK_STATUS_CONFIG);
