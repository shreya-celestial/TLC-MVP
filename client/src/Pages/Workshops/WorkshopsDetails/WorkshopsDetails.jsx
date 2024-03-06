import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Button,
} from '@mui/material';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import { useStyles } from './WorkshopsDetails.styles';
import LeadVolunteerPopup from '../LeadVolunteerPopup/LeadVolunteerPopup';
import {
  LeadVolunteersColDef,
  LeadVolunteersRowData,
  MeetingColDef,
  MeetingRowData,
  ParticipantColDef,
  ParticipantRowData,
  VolunteersColDef,
  VolunteersRowData,

} from './WorkshopDummyData';
import { DeleteButtonCell } from '../../../Components/DeleteButtonCell/DeleteButtonCell';
import AutocompletePopup from '../../../Components/AutocompletePopup/AutocompletePopup';

function WorkshopsDetails() {
  const isView = false;
  // custom column def for showing delete icon in edit mode
  const volunteerCustomDef = [
    ...VolunteersColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
        }
      : undefined,
  ].filter(Boolean);

  const LeadvolunteerCustomDef = [
    ...LeadVolunteersColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
        }
      : undefined,
  ].filter(Boolean);
  const ParticipantCustomDef = [
    ...ParticipantColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
        }
      : undefined,
  ].filter(Boolean);
  const MeetingCustomColDef = [
    ...MeetingColDef,
    !isView
      ? {
          headerName: 'Actions',
          cellRenderer: DeleteButtonCell,
        }
      : undefined,
  ].filter(Boolean);

  const classes = useStyles();
  const [openLeadPopup, setOpenLeadPopup] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  const [mode, setMode] = useState('');
  const handleMeetingMode = () => {
    setopenPopup(true);
    setMode('Meetings');
  };
  const handleParticipantMode = () => {
    setopenPopup(true);
    setMode('Participants');
  };
  const closeLeadPopup = () => {
    setOpenLeadPopup(false);
  };
  const closeOpenPopup = () => {
    setopenPopup(false);
  };
  return (
    <Box className={classes.root}>
      <Box className={classes.HeaderMainContent}>
        <PageHeader currentPage={'Create Workshop'} prevPage={'Workshops'} />
        <Box className={classes.mainContent}>
          {/* workshop type */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="worskhopType">Workshop Type</FormLabel>
              <TextField
                id="worskhopType"
                placeholder="Enter Workshop Type"
                name="worskhoptype"
                disabled={isView}
              />
            </FormControl>
          </Box>
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="workshopVenue">Venue</FormLabel>
              <TextField
                id="workshopVenue"
                placeholder="Enter Workshop Venue"
                name="venue"
                disabled={isView}
              />
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="worskhopVenueCity">Venue City</FormLabel>
              <TextField
                id="worskhopVenueCity"
                placeholder="Enter Workshop Venue"
                name="venueCity"
                disabled={isView}
              />
            </FormControl>
          </Box>

          <Box className={classes.formElementBox}>
            {/* start date */}
            <FormControl className={classes.formControl}>
              <FormLabel>Start Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker name="startDate" disabled={isView} />
              </LocalizationProvider>
            </FormControl>
            {/* end date */}
            <FormControl className={classes.formControl}>
              <FormLabel>End Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker name="endtDate" disabled={isView} />
              </LocalizationProvider>
            </FormControl>
            {/* concluding session date */}
            <FormControl className={classes.formControl}>
              <FormLabel>Concluding Session Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker name="concludingSessionDate" disabled={isView} />
              </LocalizationProvider>
            </FormControl>
          </Box>
        </Box>

        {/* add lead volunteer and volunteer */}
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Add Volunteers and Lead Volunteers</Typography>
            {!isView && (
              <Button
                className={classes.addBtn}
                disableRipple
                onClick={() => setOpenLeadPopup(true)}
              >
                Add
              </Button>
            )}
            <LeadVolunteerPopup
              openLeadPopup={openLeadPopup}
              closeLeadPopup={closeLeadPopup}
            />
          </Box>
          <Box className={classes.AccordionContainer}>
            <AccordionTable
              columnDefs={volunteerCustomDef}
              rowData={VolunteersRowData}
              headingName={'Volunteers'}
            />
            <AccordionTable
              columnDefs={LeadvolunteerCustomDef}
              rowData={LeadVolunteersRowData}
              headingName={'Lead Volunteers'}
            />
          </Box>
        </Box>
        {/* add participants */}
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Add Participants</Typography>
            {!isView && (
              <Button
                className={classes.addBtn}
                disableRipple
                onClick={handleParticipantMode}
              >
                Add
              </Button>
            )}
          </Box>

          <Box className={classes.AccordionContainer}>
            <AccordionTable
              columnDefs={ParticipantCustomDef}
              rowData={ParticipantRowData}
              headingName={'Participants'}
            />
          </Box>
        </Box>
        {/* add meetings */}
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Add Meetings</Typography>
            {!isView && (
              <Button
                className={classes.addBtn}
                disableRipple
                onClick={handleMeetingMode}
              >
                Add
              </Button>
            )}
          </Box>
          <Box className={classes.AccordionContainer}>
            <AccordionTable
              columnDefs={MeetingCustomColDef}
              rowData={MeetingRowData}
              headingName={'Meetings'}
            />
          </Box>
        </Box>
        {/* popup for adding participant and meetings  */}
        <AutocompletePopup
          mode={mode}
          openPopup={openPopup}
          closeOpenPopup={closeOpenPopup}
        />
      </Box>

      {/* action bar  */}
      <Box className={classes.actionBar}>
        <Button disableTouchRipple className="cancelBtn">
          Cancel
        </Button>
        {isView ? (
          <Button disableTouchRipple className="editBtn">
            Edit
          </Button>
        ) : (
          <Button disableTouchRipple className="saveBtn">
            Save
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default WorkshopsDetails;
