import type { CustomerStatus } from "../../models/customer";
import { STATUS_RANK } from "../../models/statusRank";

export const statusRankCompare = (a?: string, b?: string) =>
  (STATUS_RANK[a as CustomerStatus] ?? 999) -
  (STATUS_RANK[b as CustomerStatus] ?? 999);
