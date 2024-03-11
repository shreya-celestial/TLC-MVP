import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  TextField,
  Typography,
  Button,
  CircularProgress,
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
import { fetchRowDataWorkshop, validateWorkshop } from '../../../utils/utils';

import AlertReact from '../../../Components/Alert/AlertReact';
import { compareTwoArrays } from '../../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import { createWorkshop, updateWorkshop } from '../../../apis/workshops';

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

  const { data, isPending, isError, error } = useReactQuery([id], getWorkshop, {
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

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: type === 'create' ? createWorkshop : updateWorkshop,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

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
    console.log(combinedArray, data);
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

  const closePopupAndSetRows = function (data, mode) {
    setOpenLeadPopup(false);
    if (mode === 'Meetings') {
      const isEvery = compareTwoArrays(meetingsRowData, data, 'id');

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
      const {
        fetchVolunteers,
        fetchLeadVolunteers,
        fetchParticipants,
        fetchMeetings,
      } = fetchRowDataWorkshop(workshop);
      setVolunteersRowData(fetchVolunteers || []);
      setLeadVolunteersRowData(fetchLeadVolunteers || []);
      setParticipantsRowData(fetchParticipants || []);
      setMeetingsRowData(fetchMeetings || []);
    }
  }, [workshop, viewType]);

  const editHandler = function () {
    setIsView(false);
    setViewType('edit');
  };

  const mutateWorkshopHandler = function (type) {
    let modifiedStartDate = startDate;
    let modifiedEndDate = endDate;
    let modifiedConcludingDate = concludingDate;

    if (type === 'create' && startDate && endDate && concludingDate) {
      modifiedStartDate = startDate?.toISOString().split('T')[0];
      modifiedEndDate = endDate?.toISOString().split('T')[0];
      modifiedConcludingDate = concludingDate?.toISOString().split('T')[0];
    }

    const body = {
      types: workshopType,
      venue,
      venue_city: venueCity,
      start_date: modifiedStartDate,
      end_date: modifiedEndDate,
      concluding_date: modifiedConcludingDate,
      vols: volunteersRowData.map((vol) => vol.email),
      leads: leadVolunteersRowData.map((vol) => vol.email),
      participants: participantsRowData.map((participant) => participant.id),
      meetings: meetingsRowData.map((meeting) => meeting.id),
    };

    const isValid = validateWorkshop(body);
    if (isValid.type) return setAlertType(isValid);

    mutate({ body, id });
  };

  return (
    <>
      {isPending && viewType !== 'create' && (
        <Box className={classes.loader}>
          <CircularProgress />
        </Box>
      )}
      {(viewType === 'create' || data) && (
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
              prevPage={'workshops'}
              path={'workshops'}
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
                      onChange={(date) => setStartDate(new Date(date))}
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
                      onChange={(date) => setEndDate(new Date(date))}
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
                      onChange={(date) => setConcludingDate(new Date(date))}
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
              closePopupAndSetRows={closePopupAndSetRows}
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
                onClick={() => mutateWorkshopHandler('edit')}
              >
                {isPendingMutation ? 'Loading...' : 'Save'}
              </Button>
            ) : (
              <Button
                disableTouchRipple
                className="saveBtn"
                onClick={() => mutateWorkshopHandler('create')}
              >
                {isPendingMutation ? 'Loading...' : 'Create'}
              </Button>
            )}
          </Box>
        </Box>
      )}
    </>
  );
}

export default WorkshopsDetails;
