import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";
import { TASK_PRIORITY_STATUS_CONFIG } from "../models/taskPriorityStatusConfig";

export const taskPriorityStatusesCompare = createConfigRankCompare(TASK_PRIORITY_STATUS_CONFIG);
