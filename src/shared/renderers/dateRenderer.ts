import type { ValueFormatterParams } from "ag-grid-enterprise";
import dayjs from "dayjs";

export const dateRenderer = (params: ValueFormatterParams) => {
  const pv = params.value;
  if (!pv) return null;
  
  return dayjs(pv).format("DD.MM.YYYY HH:mm");
}