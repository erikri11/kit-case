import { useMemo, type ComponentType } from 'react';
import type { ColDef, GridApi, GridReadyEvent, IDetailCellRendererParams } from 'ag-grid-community';
import { AgGridReact } from 'ag-grid-react';
import { Box } from '@mui/material';
import { useAgTheme } from './useAgTheme';
import { setupAgGrid } from './agGridSetup';
import { defaultColDefBase, paginationPageSizeSelectorBase } from './baseTableDefault';

setupAgGrid();

interface BaseTableProps<T> {
  data: T[];
  headers: ColDef<T>[];
  isPaginationEnabled?: boolean;
  expandComponent?: ComponentType<IDetailCellRendererParams<T>>;
  setGridApi: (gridApi: GridApi | null) => void;
}

export function BaseTable<T>({ 
  data, 
  headers, 
  isPaginationEnabled,
  expandComponent,
  setGridApi,
}: BaseTableProps<T>) {
  
  const agTheme = useAgTheme();
  const onGridReady = (params: GridReadyEvent) => setGridApi(params.api);

  const defaultColDef = 
    useMemo<ColDef<T>>(
      () => defaultColDefBase as ColDef<T>,
      []
  );
  
  const paginationPageSizeSelector = 
    useMemo<number[] | boolean>(
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
        pagination={isPaginationEnabled}
        paginationPageSize={10}
        paginationPageSizeSelector={paginationPageSizeSelector}
        masterDetail={!!expandComponent}
        detailRowAutoHeight={true}
        detailCellRenderer={expandComponent}
      />
    </Box>
  );
}

export default BaseTable;
