import { useMemo } from 'react';
import type { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Box } from '@mui/material';
import { useAgTheme } from './useAgTheme';
import { setupAgGrid } from './agGridSetup';
import { defaultColDefBase, paginationPageSizeSelectorBase } from './baseTableDefault';

setupAgGrid();

interface BaseTableProps<T> {
  data: T[];
  headers: ColDef<T>[];
  setGridApi: (gridApi: GridApi | null) => void;
}

export default function BaseTable<T>({ 
  data, 
  headers, 
  setGridApi 
}: BaseTableProps<T>) {
  const agTheme = useAgTheme();
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api);

  const defaultColDef = useMemo<ColDef<T>>(
    () => defaultColDefBase as ColDef<T>,
    []
  );
  
  const paginationPageSizeSelector = useMemo<number[] | boolean>(
    () => [...paginationPageSizeSelectorBase],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <AgGridReact<T>
        theme={agTheme}
        columnDefs={headers}
        rowData={data}
        defaultColDef={defaultColDef}
        animateRows={true}
        rowHeight={50}
        headerHeight={48}
        onGridReady={onGridReady}
        domLayout={"autoHeight"}
        pagination={true}
        paginationPageSize={5}
        paginationPageSizeSelector={paginationPageSizeSelector}
      />
    </Box>
  );
}
