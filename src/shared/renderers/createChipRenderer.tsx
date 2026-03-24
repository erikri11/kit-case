import { Chip } from "@mui/material";
import type { ChipProps } from "@mui/material";
import type { ElementType } from "react";
import { useTranslation } from "react-i18next";
import type { ICellRendererParams } from "ag-grid-enterprise";

export interface ChipConfigItem {
  labelKey: string;
  icon: ElementType;
  color: ChipProps["color"];
  rank?: number;
}

export function createChipRenderer<TRow, TValue extends string>(
  configMap: Record<TValue, ChipConfigItem>
) {
  
  return function ChipRenderer(params: ICellRendererParams<TRow, TValue>) {
    const { t } = useTranslation();

    const value = params.value;
    if (!value) return null;

    const config = configMap[value];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <Chip
        icon={<Icon />}
        label={t(config.labelKey)}
        color={config.color}
        variant="outlined"
        size="small"
      />
    );
  };
}
