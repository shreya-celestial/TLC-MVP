import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box, Button, CircularProgress, Typography } from '@mui/material';

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

  const onSelectionChanged = () => {
    const selectedNodes = gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map((node) => node.data);
    updateSelectedRows(selectedData);
  };

  const gridOptions = {
    rowSelection: 'multiple',
    onSelectionChanged: onSelectionChanged,
    rowHeight: 30,
    headerHeight: 30,
    suppressHorizontalScroll: true,
    domLayout: 'autoHeight',
    overlayNoRowsTemplate: 'No Records Found',
  };
  const defaultColDef = {
    flex: 1,
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
          <Typography className={classes.verified}>Verified</Typography>
        ) : (
          <Button
            className={classes.pending}
            onClick={() => handleClickInColumn(params)}
            disableRipple
          >
            Pending
          </Button>
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
    <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
      {isPending && (
        <Box className={classes.tableSkeleton}>
          <CircularProgress className="circularProgress" />
        </Box>
      )}
      {data && (
        <AgGridReact
          className={classes.AgGridMain}
          rowData={rowData}
          defaultColDef={defaultColDef}
          columnDefs={modifiedColumnDefs}
          gridOptions={gridOptions}
          onGridReady={(params) => (gridApi = params.api)}
          suppressRowClickSelection
        ></AgGridReact>
      )}
    </Box>
  );
};

export default Table;
