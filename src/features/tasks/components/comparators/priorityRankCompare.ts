import { PRIORITY_RANK } from "@features/tasks/models/priorityRank";
import { createRankCompare } from "@shared/utils/createRankCompare";

export const priorityRankCompare = createRankCompare(PRIORITY_RANK);
