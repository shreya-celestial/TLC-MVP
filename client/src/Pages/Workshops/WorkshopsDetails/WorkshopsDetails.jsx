import React, { useEffect, useState } from 'react';
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
  MeetingColDef,
  VolunteersColDef,
  LeadVolunteersColDef,
  ParticipantColDef,
} from '../coldefs/coldefs';

import { DeleteButtonCell } from '../../../Components/DeleteButtonCell/DeleteButtonCell';
import AutocompletePopup from '../../../Components/AutocompletePopup/AutocompletePopup';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getWorkshop } from '../../../apis/workshops';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchRowData } from '../utils';
import AlertReact from '../../../Components/Alert/AlertReact';
import { compareTwoArrays } from '../../../utils/utils';

function WorkshopsDetails() {
  let { id, type } = useParams();

  const [isView, setIsView] = useState(type === 'view' ? true : false);
  const [viewType, setViewType] = useState(type);
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

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

  const { data, isLoading, isError, error } = useReactQuery([id], getWorkshop, {
    enabled: viewType !== 'create',
  });

  const workshop = data?.data?.workshop;

  const [volunteersRowData, setVolunteersRowData] = useState([]);
  const [leadVolunteersRowData, setLeadVolunteersRowData] = useState([]);
  const [participantsRowData, setParticipantsRowData] = useState([]);
  const [meetingsRowData, setMeetingsRowData] = useState([]);

  const [workshopType, setWorkshopType] = useState('');
  const [venue, setVenue] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [concludingDate, setConcludingDate] = useState('');

  const handleMeetingMode = () => {
    setopenPopup(true);
    setMode('Meetings');
  };
  const handleParticipantMode = () => {
    setopenPopup(true);
    setMode('Participants');
  };
  const closeLeadPopup = (data) => {
    setOpenLeadPopup(false);
  };
  const closeOpenPopup = () => {
    setopenPopup(false);
  };

  const closeLeadPopupAndSetRows = (data, role) => {
    const combinedArray = [...volunteersRowData, ...leadVolunteersRowData];

    const isEvery = compareTwoArrays(combinedArray, data, 'email');

    if (!isEvery) {
      setAlertType({
        type: 'error',
        message: 'Some Users are already existing',
      });
      setOpenLeadPopup(false);
      return;
    }

    setOpenLeadPopup(false);
    if (role === 'volunteer')
      setVolunteersRowData((prev) => {
        return [...prev, ...data];
      });

    if (role === 'leadvolunteer')
      setLeadVolunteersRowData((prev) => {
        return [...prev, ...data];
      });
  };

  const closeEnrollmentsPopupAndSetRows = function (data, mode) {
    setOpenLeadPopup(false);
    if (mode === 'Meetings') {
      const isEvery = compareTwoArrays(meetingsRowData, data, 'email');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Meetings are already existing',
        });
        setopenPopup(false);
        return;
      }

      setMeetingsRowData((prev) => {
        return [...prev, ...data];
      });
      setopenPopup(false);
    }

    if (mode === 'Participants') {
      const isEvery = compareTwoArrays(participantsRowData, data, 'email');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Participants are already existing',
        });
        setopenPopup(false);
        return;
      }

      setParticipantsRowData((prev) => {
        return [...prev, ...data];
      });
      setopenPopup(false);
    }
  };

  useEffect(() => {
    setWorkshopType(workshop?.types || '');
    setVenue(workshop?.venue || '');
    setVenueCity(workshop?.venue_city || '');
    setStartDate(workshop?.start_date || '');
    setEndDate(workshop?.end_date || '');
    setConcludingDate(workshop?.concluding_date || '');

    if (viewType !== 'create') {
      const { fetchVolunteers, fetchLeadVolunteers, fetchParticipants } =
        fetchRowData(workshop);
      setVolunteersRowData(fetchVolunteers || []);
      setLeadVolunteersRowData(fetchLeadVolunteers || []);
      setParticipantsRowData(fetchParticipants || []);
    }
  }, [workshop, viewType]);

  const editHandler = function () {
    setIsView(false);
    setViewType('edit');
  };

  const editWorkshop = function () {
    console.log(
      workshopType,
      venue,
      venueCity,
      startDate,
      endDate,
      concludingDate
    );
  };

  const createWorkshop = function () {
    console.log(
      volunteersRowData,
      leadVolunteersRowData,
      meetingsRowData,
      participantsRowData
    );
  };

  return (
    <>
      {isLoading && <Box className={classes.flex}>Loading....</Box>}
      {
        <Box className={classes.root}>
          {alertType && (
            <AlertReact
              removeAlertType={removeAlertType}
              type={alertType.type}
              message={alertType.message}
            />
          )}
          <Box className={classes.HeaderMainContent}>
            <PageHeader
              currentPage={
                viewType === 'view'
                  ? 'View Workshop'
                  : viewType === 'edit'
                  ? 'Edit Workshop'
                  : 'Create Workshop'
              }
              prevPage={'Workshops'}
            />
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
                    value={workshopType}
                    onChange={(e) => setWorkshopType(e.target.value)}
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
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                  />
                </FormControl>
                <FormControl className={classes.formControl}>
                  <FormLabel htmlFor="worskhopVenueCity">Venue City</FormLabel>
                  <TextField
                    id="worskhopVenueCity"
                    placeholder="Enter Workshop Venue"
                    name="venueCity"
                    disabled={isView}
                    value={venueCity}
                    onChange={(e) => setVenueCity(e.target.value)}
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
                    <DatePicker
                      name="startDate"
                      disabled={isView}
                      value={dayjs(startDate)}
                      onChange={(date) => setStartDate(date)}
                    />
                  </LocalizationProvider>
                </FormControl>
                {/* end date */}
                <FormControl className={classes.formControl}>
                  <FormLabel>End Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className={classes.datepicker}
                  >
                    <DatePicker
                      name="endtDate"
                      disabled={isView}
                      value={dayjs(endDate)}
                      onChange={(date) => setEndDate(date)}
                    />
                  </LocalizationProvider>
                </FormControl>
                {/* concluding session date */}
                <FormControl className={classes.formControl}>
                  <FormLabel>Concluding Session Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className={classes.datepicker}
                  >
                    <DatePicker
                      name="concludingSessionDate"
                      disabled={isView}
                      value={dayjs(concludingDate)}
                      onChange={(date) => setConcludingDate(date)}
                    />
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
                  closeLeadPopupAndSetRows={closeLeadPopupAndSetRows}
                  openLeadPopup={openLeadPopup}
                  closeLeadPopup={closeLeadPopup}
                />
              </Box>
              <Box className={classes.AccordionContainer}>
                <AccordionTable
                  columnDefs={volunteerCustomDef}
                  rowData={volunteersRowData}
                  headingName={'Volunteers'}
                />
                <AccordionTable
                  columnDefs={LeadvolunteerCustomDef}
                  rowData={leadVolunteersRowData}
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
                  rowData={participantsRowData}
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
                  rowData={meetingsRowData}
                  headingName={'Meetings'}
                />
              </Box>
            </Box>
            {/* popup for adding participant and meetings  */}
            <AutocompletePopup
              mode={mode}
              openPopup={openPopup}
              closeOpenPopup={closeOpenPopup}
              closeEnrollmentsPopupAndSetRows={closeEnrollmentsPopupAndSetRows}
            />
          </Box>

          {/* action bar  */}
          <Box className={classes.actionBar}>
            <Button disableTouchRipple className="cancelBtn">
              Cancel
            </Button>
            {viewType === 'view' ? (
              <Button
                disableTouchRipple
                className="editBtn"
                onClick={editHandler}
              >
                Edit
              </Button>
            ) : viewType === 'edit' ? (
              <Button
                disableTouchRipple
                className="saveBtn"
                onClick={editWorkshop}
              >
                Save
              </Button>
            ) : (
              <Button
                disableTouchRipple
                className="saveBtn"
                onClick={createWorkshop}
              >
                Create
              </Button>
            )}
          </Box>
        </Box>
      }
    </>
  );
}

export default WorkshopsDetails;
