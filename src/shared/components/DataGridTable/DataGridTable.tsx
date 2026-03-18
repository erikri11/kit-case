import { useEffect, useState, type ComponentType } from 'react';
import type { ColDef, GridApi, IDetailCellRendererParams } from 'ag-grid-community';
import { BaseToolbar } from '../BaseToolbar/BaseToolbar';
import BaseTable from '../BaseTable/BaseTable';

export interface DataGridTableProps<T> {
  data: T[];
  headers: ColDef<T>[];
  isAddButtonVisible?: boolean;
  addButtonLabel?: string;
  disableSearch?: boolean;
  expandComponent?: ComponentType<IDetailCellRendererParams<T>>;
  onAddButtonClick?: () => void;
  isPaginationEnabled?: boolean;
}

export function DataGridTable<T>({ 
  data, 
  headers, 
  isAddButtonVisible, 
  addButtonLabel,
  disableSearch,
  expandComponent,
  isPaginationEnabled,
  onAddButtonClick
}: DataGridTableProps<T>) {

  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>("");

  useEffect(() => {
    gridApi?.setGridOption("quickFilterText", (quickFilter ?? "").trim());
  }, [quickFilter, gridApi]);
  
  return (
    <>
      <BaseToolbar 
        quickFilter={quickFilter}
        setQuickFilter={setQuickFilter}
        addButtonLabel={addButtonLabel}
        isAddButtonVisible={isAddButtonVisible}
        onAddButtonClick={onAddButtonClick}
        disableSearch={disableSearch}
      />

      <BaseTable 
        setGridApi={setGridApi}
        data={data} 
        headers={headers}
        expandComponent={expandComponent}
        isPaginationEnabled={isPaginationEnabled}
      />
    </> 
  );
}

export default DataGridTable;
