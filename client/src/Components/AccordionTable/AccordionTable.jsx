import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
} from '@mui/material';
import React, { useState } from 'react';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import { useStyles } from './AccordionTable.styles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-quartz.css';

import {
  MeetingColDef,
  VolunteersColDef,
  LeadVolunteersColDef,
  ParticipantColDef,
} from '../../Pages/Workshops/coldefs/coldefs';

import { ChildrenColDef } from '../../Pages/Enrollments/coldefs/coldefs';
import AddChildPopup from '../../Pages/Enrollments/AddChildPopup/AddChildPopup';
import { workShopColDef } from '../../Pages/Volunteers/coldefs/coldefs';
import { MeetingPageEnrollmentsColDef } from '../../Pages/Meetings/coldefs/coldefs';

function AccordionTable({
  rowData,
  headingName,
  handleDeleteRow,
  isView,
  updateChild,
  columnDefs,
}) {
  const defaultColDef = {
    sortable: false,
    flex: 1,
  };

  const gridOptions = {
    rowHeight: 30,
    headerHeight: 30,
    domLayout: 'autoHeight',
    suppressHorizontalScroll: true,
    overlayNoRowsTemplate: 'No Records Found',
  };
  const classes = useStyles();

  const DeleteEditButtonCell = (param) => {
    const classes = useStyles();
    const [childData, setChildData] = useState('');
    const [openChild, setOpenChild] = useState(false);
    const handleCloseOpenChild = () => {
      setOpenChild(false);
    };

    const handleEditChild = () => {
      setChildData({
        name: param.data.name,
        gender: param.data.gender,
        dob: param.data.dob,
        id: param.data.id,
      });
      setOpenChild(true);
    };

    const updateChildAndClosePopup = (data, id) => {
      updateChild(data, id);
      setOpenChild(false);
    };

    return (
      <Box className={classes.BtnWrapper}>
        <IconButton
          className={`${classes.childActionBtn} childEditIcon`}
          disableRipple
          onClick={handleEditChild}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          className={`${classes.childActionBtn} childDeleteIcon`}
          disableRipple
          onClick={() =>
            handleDeleteRow({
              email: param.data.email,
              row: headingName,
              id: param.data.id,
            })
          }
        >
          <DeleteForeverIcon />
        </IconButton>

        <AddChildPopup
          openChild={openChild}
          handleCloseOpenChild={handleCloseOpenChild}
          childData={childData}
          updateChildAndClosePopup={updateChildAndClosePopup}
        />
      </Box>
    );
  };

  const DeleteButtonCell = (param) => {
    const classes = useStyles();

    return (
      <IconButton
        className={classes.DeletBtn}
        disableRipple
        onClick={() =>
          handleDeleteRow({
            email: param.data.email,
            row: headingName,
            id: param.data.id,
          })
        }
      >
        <DeleteForeverIcon />
      </IconButton>
    );
  };

  const volunteerCustomDef = [
    ...VolunteersColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
          minWidth: 100,
        }
      : undefined,
  ].filter(Boolean);

  const LeadvolunteerCustomDef = [
    ...LeadVolunteersColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
          minWidth: 100,
        }
      : undefined,
  ].filter(Boolean);

  const ParticipantCustomDef = [
    ...ParticipantColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
          minWidth: 100,
        }
      : undefined,
  ].filter(Boolean);

  const MeetingCustomColDef = [
    ...MeetingColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
          minWidth: 100,
        }
      : undefined,
  ].filter(Boolean);

  const ChildrenCustomColDef = [
    ...ChildrenColDef,
    !isView && {
      field: 'Actions',
      cellRenderer: DeleteEditButtonCell,
      minWidth: 100,
    },
  ].filter(Boolean);

  const EnrollmentCustomDef = [
    ...MeetingPageEnrollmentsColDef,
    !isView && {
      field: 'Actions',
      cellRenderer: DeleteButtonCell,
      minWidth: 100,
    },
  ].filter(Boolean);

  const modifiedColumnDefs =
    headingName === 'Volunteers'
      ? volunteerCustomDef
      : headingName === 'Lead Volunteers'
      ? LeadvolunteerCustomDef
      : headingName === 'Participants'
      ? ParticipantCustomDef
      : headingName === 'Enrollments'
      ? EnrollmentCustomDef
      : headingName === 'Children'
      ? ChildrenCustomColDef
      : headingName === 'Workshops'
      ? workShopColDef
      : MeetingCustomColDef;

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary
        className="accordianSummary"
        expandIcon={<ExpandMoreOutlinedIcon />}
      >
        {headingName} {`(${rowData.length})`}
      </AccordionSummary>
      <AccordionDetails className={classes.accordionDetails}>
        <Box className={`ag-theme-quartz ${classes.gridContainer}`}>
          <AgGridReact
            className={classes.AgGridMain}
            columnDefs={columnDefs ? columnDefs : modifiedColumnDefs}
            rowData={rowData}
            gridOptions={gridOptions}
            defaultColDef={defaultColDef}
          />
        </Box>
      </AccordionDetails>
    </Accordion>
  );
}

export default AccordionTable;
