import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useContext, useMemo } from 'react';
import UserContext from '../../store/userContext';

const Table = ({
  data,
  isPending,
  updateSelectedRows,
  showVerifyStatus,
  colDefs,
  showDetails,
  isError,
}) => {
  let rowData;
  if (data) rowData = data;

  const classes = useStyles();
  const { user } = useContext(UserContext);

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
  console.log(user);

  const IsAdminVerifiedComp = (params) => {
    const classes = useStyles();
    return (
      <>
        {params.value ? (
          <Typography className={classes.verified}>Verified</Typography>
        ) : (
          <Button
            className={classes.pending}
            onClick={
              user?.isAdmin ? () => handleClickInColumn(params) : () => {}
            }
            sx={{
              cursor: user?.isAdmin ? 'pointer' : 'default',
            }}
            disableRipple
          >
            Pending
          </Button>
        )}
      </>
    );
  };

  const InfoTable = (params) => {
    const classes = useStyles();

    return (
      <>
        <p className={classes.count} onClick={() => showDetails(params)}>
          {params.value}
        </p>
      </>
    );
  };

  // const [orderBy, setOrderBy] = useState('none');

  // const handleHeaderClick = function (columnName) {
  //   updateSort({ sortBy: columnName, orderBy });
  //   if (orderBy === 'asc') setOrderBy('desc');
  //   if (orderBy === 'desc') setOrderBy('none');
  //   if (orderBy === 'none') setOrderBy('asc');
  // };

  // const CustomHeaderComponent = (params) => {
  //   return (
  //     <Typography
  //       component="body1"
  //       className="ag-header-cell-text"
  //       onClick={() => handleHeaderClick(params.column.colId)}
  //     >
  //       {params.displayName}
  //     </Typography>
  //   );
  // };

  const modifiedColumnDefs = colDefs.map((colDef) => {
    if (colDef.field === 'isAdminVerified') {
      colDef.cellRenderer = IsAdminVerifiedComp;
    }
    if (colDef.field === 'lead_volunteers_count')
      colDef.cellRenderer = InfoTable;

    if (colDef.field === 'volunteers_count') colDef.cellRenderer = InfoTable;
    if (colDef.field === 'participants_count') colDef.cellRenderer = InfoTable;

    if (colDef.field === 'volunteers') colDef.cellRenderer = InfoTable;
    if (colDef.field === 'enrollments') colDef.cellRenderer = InfoTable;

    if (colDef.field === 'children') colDef.cellRenderer = InfoTable;

    // colDef.headerComponent = CustomHeaderComponent;
    // colDef

    return colDef;
  });

  // const onFirstDataRendered = useCallback((params) => {
  //   const nodesToSelect = [];
  //   params.api.forEachNode((node) => {
  //     // console.log(node);
  //     if (node.data && node.data.email === 'gauravyadav.mern@gmail.com') {
  //       // node.selectable = false;
  //       nodesToSelect.push(node);
  //     }
  //   });
  //   params.api.setNodesSelected({ nodes: nodesToSelect, newValue: true });
  // }, []);

  const isRowSelectable = useMemo(() => {
    return (params) => {
      return !!params.data && params.data.email !== user.email;
    };
  }, [user]);

  return (
    <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
      {isPending && (
        <Box className={classes.tableSkeleton}>
          <CircularProgress className="circularProgress" />
        </Box>
      )}
      {isError && (
        <Box className={classes.tableSkeleton}>
          <Typography className="errorMessage">
            Something went wrong while fetching data.
          </Typography>
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
          isRowSelectable={isRowSelectable}
        ></AgGridReact>
      )}
    </Box>
  );
};

export default Table;
