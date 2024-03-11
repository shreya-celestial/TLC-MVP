import React, { useEffect, useState } from 'react';
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
import { LeadVolunteersColDef } from '../../Pages/Workshops/WorkshopsDetails/WorkshopDummyData';
import { useReactQuery } from '../../hooks/useReactQuery';
import { getWorkshop } from '../../apis/workshops';
import { getMeeting } from '../../apis/meetings';
import { getEnrollment } from '../../apis/enrollments';

function InfoTable({ hideInfoTable, clickedCountDetails, type }) {
  const { id, field } = clickedCountDetails;

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

  const { data, isPending, isError, error } = useReactQuery(
    [id],
    type === 'meetings'
      ? getMeeting
      : type === 'workshops'
      ? getWorkshop
      : getEnrollment
  );

  let title;
  if (field === 'lead_volunteers_count') title = 'Lead Volunteers';
  if (field === 'volunteers_count') title = 'Volunteers';
  if (field === 'participants_count') title = 'Participants';
  if (field === 'enrollments') title = 'Enrollments';
  if (field === 'children') title = 'Children';

  const [rowData, setRowData] = useState();

  useEffect(() => {
    if (field === 'lead_volunteers_count')
      setRowData(
        data?.data?.workshop.workshop_lead_volunteers.map((lv) => lv.user)
      );

    if (field === 'volunteers_count')
      setRowData(data?.data?.workshop.workshop_volunteers.map((v) => v.user));

    if (field === 'participants_count')
      setRowData(
        data?.data?.workshop.workshop_participants.map((p) => p.enrollment)
      );

    if (field === 'volunteers')
      setRowData(data?.data?.meetings_volunteers.map((v) => v.user));

    if (field === 'enrollments')
      setRowData(data?.data?.meetings_enrollments.map((e) => e.enrollment));

    if (field === 'children') setRowData(data?.data?.children);
  }, [data, field]);

  return (
    <Dialog open className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>{title}</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={hideInfoTable}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.DiaogContent}>
        <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
          <AgGridReact
            className={classes.AgGridMain}
            columnDefs={LeadVolunteersColDef}
            rowData={rowData}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
          />
        </Box>
      </DialogContent>
      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button className="cancelBtn" disableRipple onClick={hideInfoTable}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InfoTable;
