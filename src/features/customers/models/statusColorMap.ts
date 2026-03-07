import type { ChipProps } from "@mui/material";
import type { CustomerStatus } from "./customer";

export const statusColorMap: Record<CustomerStatus, ChipProps["color"]> = {
  Active: "success",
  Pending: "warning",
  Blocked: "error",
};
