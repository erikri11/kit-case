import { useEffect, useState } from 'react';
import type { ColDef, GridApi } from 'ag-grid-community';
import { BaseToolbar } from '../BaseToolbar/BaseToolbar';
import BaseTable from '../BaseTable/BaseTable';

export interface DataGridTableProps<T> {
  data: T[];
  headers: ColDef<T>[];
  isAddButtonVisible?: boolean;
  onAddButtonClick?: () => void;
}

export function DataGridTable<T>({ 
  data, 
  headers, 
  isAddButtonVisible, 
  onAddButtonClick
}: DataGridTableProps<T>) {
  
  const [gridApi, setGridApi] = useState<GridApi | null>(null);
  const [quickFilter, setQuickFilter] = useState<string>("");

  useEffect(() => {
    gridApi?.setGridOption('quickFilterText', (quickFilter ?? '').trim());
  }, [quickFilter, gridApi]);
  
  return (
    <>
      <BaseToolbar 
        quickFilter={quickFilter}
        setQuickFilter={setQuickFilter}
        isAddButtonVisible={isAddButtonVisible}
        onAddButtonClick={onAddButtonClick}
      />

      <BaseTable 
        setGridApi={setGridApi}
        data={data} 
        headers={headers}
      />
    </> 
  );
}

export default DataGridTable;
