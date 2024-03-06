import React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useStyles } from './InfoTable.styles';
import {
  LeadVolunteersColDef,
  LeadVolunteersRowData,
} from '../../Pages/Workshops/WorkshopsDetails/WorkshopDummyData';

function InfoTable() {
  const classes = useStyles();
  const defaultColDef = {
    sortable: false,
    minWidth: 150,
    flex: 1,
  };

  const gridOptions = {
    rowHeight: 30,
    headerHeight: 30,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: true,
    overlayNoRowsTemplate: 'No Records Found',
  };

  return (
    <Dialog open className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Lead Volunteers</Typography>
        <IconButton className={classes.CloseIcon} disableRipple>
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.DiaogContent}>
        <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
          <AgGridReact
            className={classes.AgGridMain}
            columnDefs={LeadVolunteersColDef}
            rowData={LeadVolunteersRowData}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
          />
        </Box>
      </DialogContent>

      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button className="cancelBtn" disableRipple>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoTable;
