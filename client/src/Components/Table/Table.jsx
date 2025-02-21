import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import { useStyles } from './Table.styles';
import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { useCallback, useContext, useMemo } from 'react';
import UserContext from '../../store/userContext';
import { useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';

const Table = ({
  data,
  isPending,
  updateSelectedRows,
  showVerifyStatus,
  colDefs,
  showDetails,
  isError,
  showDeleteModalFunction
}) => {
  let rowData;
  if (data) rowData = data;

  const navigate = useNavigate();
  const location = useLocation();

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
            info-table='true'
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
    return (
      <>
        <p className='count' info-table='true' onClick={() => {
            showDetails(params);
          }}>
          {params.value}
        </p>
      </>
    );
  };

  const DeleteComp = () => {
    return <DeleteIcon onClick={showDeleteModalFunction}/>
  };
  
  const modifiedColumnDefs = colDefs.map((colDef) => {
    if (colDef.field === 'isAdminVerified') {
      colDef.cellRenderer = IsAdminVerifiedComp;
    }
    if(colDef.field === 'Delete') colDef.cellRenderer = DeleteComp;

    if (colDef.field === 'lead_volunteers_count')
      colDef.cellRenderer = InfoTable;

    if (colDef.field === 'volunteers_count') colDef.cellRenderer = InfoTable;
    if (colDef.field === 'participants_count') colDef.cellRenderer = InfoTable;

    if (colDef.field === 'volunteers') colDef.cellRenderer = InfoTable;
    if (colDef.field === 'enrollments') colDef.cellRenderer = InfoTable;

    if (colDef.field === 'children') colDef.cellRenderer = InfoTable;

    return colDef;
  });

  const isRowSelectable = useMemo(() => {
    return (params) => {
      if (window.location.href.includes('/volunteers'))
        return !!params.data && params.data.email !== user.email;
      else return true;
    };
  }, [user]);

  const getRowStyle = (params) => {
    if (
      params.data.email === user.email &&
      window.location.href.includes('/volunteers')
    ) {
      return { background: '#f5f5f5', fontWeight: 'bold' }; // Apply specific styles to the row
    }
    return null; // Return null to apply default styles
  };

  const onRowClicked = useCallback((params) => {
    if(Boolean(params.event.target.getAttribute('info-table')) || params.event.target.tagName === 'path') return;
    switch (location.pathname) {
      case '/volunteers':
        navigate(`/volunteers/detail/${params.data.email}/view`);
        break;
      case '/workshops':
        navigate(`/workshops/detail/${params.data.id}/view`)
        break;
      case '/meetings':
        navigate(`/meetings/details/${params.data.id}/view`)
        break;
      default:
        navigate(`/enrollments/details/${params.data.id}/view`);
    }
  }, [navigate,location.pathname]);

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
          getRowStyle={getRowStyle}
          onRowClicked={onRowClicked}
        ></AgGridReact>
      )}
    </Box>
  );
};

export default Table;
