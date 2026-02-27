import type { ColDef } from "ag-grid-enterprise";

export const defaultColDefBase: ColDef = {
  sortable: true,
  filter: true,
  resizable: true
};

export const paginationPageSizeSelectorBase = [5, 10, 20, 50, 100] as const;
