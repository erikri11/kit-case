import type { ChipProps } from "@mui/material";
import type { CustomerStatus } from "./customer.model";

export const statusColorMap: Record<CustomerStatus, ChipProps["color"]> = {
  Active: "success",
  Pending: "warning",
  Blocked: "error",
};
