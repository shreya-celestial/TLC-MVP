import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useState } from 'react';
import colDefs from './coldefs';
import { useStyles } from './Table.styles';
import { Box } from '@mui/material';

const Table = ({ data, isPending }) => {
  let rowData;
  if (data) rowData = data.data.users;

  const classes = useStyles();

  const rowHeight = 35;

  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    setSelectedRows(selectedData);
  };

  const gridOptions = {
    rowSelection: 'multiple', // Enable multiple row selection
    onSelectionChanged: onSelectionChanged,
  };

  let gridApi;

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 405 }} // the grid will fill the size of the parent container
    >
      {isPending && <Box className={classes.tableSkeleton}>loading</Box>}
      {data && (
        <AgGridReact
          rowData={rowData}
          columnDefs={colDefs}
          gridOptions={gridOptions}
          getRowClass={() => classes.row}
          getRowHeight={() => rowHeight}
          headerHeight={35}
          onGridReady={(params) => (gridApi = params.api)}

          // rowStyle={{ background: 'black' }}
          // pagination={true}
          // paginationPageSize={10}
          // onPaginationChanged={onPageClicked}
        ></AgGridReact>
      )}
    </div>
  );

  // ...
};

export default Table;
