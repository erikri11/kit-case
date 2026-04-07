import { createConfigRankCompare } from "@shared/utils/createConfigRankCompare";
import { TASK_STATUS_CONFIG } from "../models/taskStatusConfig";

export const taskRankStatusesCompare = createConfigRankCompare(TASK_STATUS_CONFIG);
