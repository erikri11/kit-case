import type { ChipProps } from "@mui/material";
import type { CustomerStatus } from "./customer.model";

export const STATUS_COLOR_MAP: Record<CustomerStatus, ChipProps["color"]> = {
  Active: "success",
  Pending: "warning",
  Blocked: "error",
};
