import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box } from '@mui/material';

const Table = ({
  data,
  isPending,
  updateSelectedRows,
  showVerifyStatus,
  colDefs,
}) => {
  let rowData;
  if (data) rowData = data;

  const classes = useStyles();

  const rowHeight = 35;

  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    updateSelectedRows(selectedData);
  };

  const gridOptions = {
    rowSelection: 'multiple', // Enable multiple row selection
    onSelectionChanged: onSelectionChanged,
  };

  let gridApi;

  const handleClickInColumn = function (params) {
    showVerifyStatus(params.data.email);
  };

  const IsAdminVerifiedComp = (params) => {
    const classes = useStyles();
    return (
      <>
        {params.value ? (
          <p className={classes.verified}>Verified</p>
        ) : (
          <p
            className={classes.pending}
            onClick={() => handleClickInColumn(params)}
          >
            Pending
          </p>
        )}
      </>
    );
  };

  const modifiedColumnDefs = colDefs.map((colDef) => {
    if (colDef.headerName === 'Status' && true) {
      colDef.cellRenderer = IsAdminVerifiedComp;
    }
    return colDef;
  });

  return (
    <div
      className="ag-theme-quartz" // applying the grid theme
      style={{ height: 405 }} // the grid will fill the size of the parent container
    >
      {isPending && <Box className={classes.tableSkeleton}>Loading...</Box>}
      {data && (
        <AgGridReact
          rowData={rowData}
          columnDefs={modifiedColumnDefs}
          gridOptions={gridOptions}
          getRowClass={() => classes.row}
          getRowHeight={() => rowHeight}
          headerHeight={35}
          onGridReady={(params) => (gridApi = params.api)}
        ></AgGridReact>
      )}
    </div>
  );
};

export default Table;
