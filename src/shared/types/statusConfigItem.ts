import type { ChipProps } from "@mui/material";
import type { ElementType } from "react";

export interface StatusConfigItem {
  labelKey: string;
  icon: ElementType;
  color: ChipProps["color"];
  rank: number;
}
