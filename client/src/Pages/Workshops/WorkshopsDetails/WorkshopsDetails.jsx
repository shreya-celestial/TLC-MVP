import React, { useContext, useEffect, useState } from 'react';
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
import moment from 'moment';
import AutocompletePopup from '../../../Components/AutocompletePopup/AutocompletePopup';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getWorkshop } from '../../../apis/workshops';
import { useParams, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { fetchRowDataWorkshop, validateWorkshop } from '../../../utils/utils';

import AlertReact from '../../../Components/Alert/AlertReact';
import { compareTwoArrays } from '../../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import { createWorkshop, updateWorkshop } from '../../../apis/workshops';
import UserContext from '../../../store/userContext';

function WorkshopsDetails() {
  let { id, type } = useParams();

  const nav = useNavigate();
  const { user } = useContext(UserContext);

  const [isView, setIsView] = useState(type === 'view' ? true : false);
  const [viewType, setViewType] = useState(type);
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const classes = useStyles();
  const [openLeadPopup, setOpenLeadPopup] = useState(false);
  const [openPopup, setopenPopup] = useState(false);
  const [mode, setMode] = useState('');

  const { data, isPending, isError } = useReactQuery([id], getWorkshop, {
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

  const {
    mutate,
    isPending: isPendingMutation,
    isError: isErrorMutation,
  } = useMutation({
    mutationFn: viewType === 'create' ? createWorkshop : updateWorkshop,
    onSuccess: (data) => {
      if (data.status === 'error') {
        let obj = {
          type: data.status,
          message: data.message,
        };
        setAlertType(obj);
      } else {
        if (viewType === 'create') nav('/workshops/success');
        else
          setAlertType({
            type: data.status,
            message: data.message,
          });
      }
    },
    onError: (error) => {
      let msg;
      if (error?.info?.message.includes('Uniqueness violation')) {
        msg = 'Workshop already exists';
      }
      setAlertType({
        type: 'error',
        message: msg || error?.info?.message || 'Something Went Wrong',
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
    setOpenLeadPopup(false);

    if (data) {
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

      if (role === 'volunteer')
        setVolunteersRowData((prev) => {
          return [...prev, ...data];
        });

      if (role === 'leadvolunteer')
        setLeadVolunteersRowData((prev) => {
          return [...prev, ...data];
        });
    }
  };

  const closePopupAndSetRows = function (data, mode) {
    setopenPopup(false);
    if (mode === 'Meetings' && data) {
      const isEvery = compareTwoArrays(meetingsRowData, data, 'id');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Meetings are already existing',
        });
        return;
      }

      setMeetingsRowData((prev) => {
        return [...prev, ...data];
      });
    }

    if (mode === 'Participants' && data) {
      const isEvery = compareTwoArrays(participantsRowData, data, 'email');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Participants are already existing',
        });
        return;
      }

      setParticipantsRowData((prev) => {
        return [...prev, ...data];
      });
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

  const [alertKey, setAlertKey] = useState(true);

  const mutateWorkshopHandler = function () {
    setAlertKey((prev) => !prev);

    const modifiedStartDate = moment(startDate).format('MM/DD/YYYY')
    const modifiedEndDate = moment(endDate).format('MM/DD/YYYY')
    const modifiedConcludingDate = moment(concludingDate).format('MM/DD/YYYY')

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

    let isValid
    if (viewType === 'create')
      isValid = validateWorkshop(body);
    else if (viewType === 'edit')
      isValid = validateWorkshop(body, false);
    if (isValid.type) return setAlertType(isValid);

    mutate({ body, id, key: user?.key });
  };

  const handleDeleteRow = function ({ email, row, id }) {
    if (row === 'Volunteers') {
      const updatedRow = volunteersRowData.filter((v) => v.email !== email);
      setVolunteersRowData(updatedRow);
    }
    if (row === 'Lead Volunteers') {
      const updatedRow = leadVolunteersRowData.filter((v) => v.email !== email);
      setLeadVolunteersRowData(updatedRow);
    }
    if (row === 'Participants') {
      const updatedRow = participantsRowData.filter((p) => p.email !== email);
      setParticipantsRowData(updatedRow);
    }
    if (row === 'Meetings') {
      const updatedRow = meetingsRowData.filter((m) => m.id !== id);
      setMeetingsRowData(updatedRow);
    }
  };

  useEffect(() => {
    if (viewType !== 'create' && viewType !== 'edit' && viewType !== 'view') {
      nav('/workshops');
    }
    if (viewType === 'view') {
      setIsView(true);
    }
  }, [viewType]);

  useEffect(() => {
    if (!user?.isAdmin && viewType !== 'view') {
      nav('/workshops');
    }
  }, [user, viewType]);

  if (viewType !== 'create' && viewType !== 'edit' && viewType !== 'view') {
    return;
  }

  if (!user?.isAdmin && viewType !== 'view') {
    return;
  }

  return (
    <>
      {isPending && viewType !== 'create' && (
        <Box className={classes.loader}>
          <CircularProgress />
        </Box>
      )}
      {isError && (
        <Box className={classes.loader}>
          <Typography className="errorMessage">
            Something went wrong while fetching data.
          </Typography>
        </Box>
      )}
      {(viewType === 'create' || data) && (
        <Box className={classes.root}>
          {alertType && (
            <AlertReact
              removeAlertType={removeAlertType}
              type={alertType.type}
              message={alertType.message || 'Something went wrong'}
              alertKey={alertKey}
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
                <FormControl className={classes.formControl} required>
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
                <FormControl className={classes.formControl} required>
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
                <FormControl className={classes.formControl} required>
                  <FormLabel htmlFor="worskhopVenueCity">Venue City</FormLabel>
                  <TextField
                    id="worskhopVenueCity"
                    placeholder="Enter Workshop Venue City"
                    name="venueCity"
                    disabled={isView}
                    value={venueCity}
                    onChange={(e) => setVenueCity(e.target.value)}
                  />
                </FormControl>
              </Box>

              <Box className={classes.formElementBox}>
                {/* start date */}
                <FormControl className={classes.formControl} required>
                  <FormLabel>Start Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className={classes.datepicker}
                  >
                    <DatePicker
                      name="startDate"
                      disabled={isView}
                      disablePast={type === 'create' ? true : false}
                      value={dayjs(startDate)}
                      onChange={(date) => setStartDate(new Date(date))}
                    />
                  </LocalizationProvider>
                </FormControl>
                {/* end date */}
                <FormControl className={classes.formControl} required>
                  <FormLabel>End Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className={classes.datepicker}
                  >
                    <DatePicker
                      name="endtDate"
                      disabled={isView}
                      value={dayjs(endDate)}
                      disablePast={type === 'create' ? true : false}
                      minDate={startDate && dayjs(startDate)}
                      onChange={(date) => setEndDate(new Date(date))}
                    />
                  </LocalizationProvider>
                </FormControl>
                {/* concluding session date */}
                <FormControl className={classes.formControl} required>
                  <FormLabel>Concluding Session Date</FormLabel>
                  <LocalizationProvider
                    dateAdapter={AdapterDayjs}
                    className={classes.datepicker}
                  >
                    <DatePicker
                      name="concludingSessionDate"
                      disabled={isView}
                      value={dayjs(concludingDate)}
                      disablePast={type === 'create' ? true : false}
                      minDate={
                        endDate ? dayjs(endDate) : startDate && dayjs(startDate)
                      }
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
                {openLeadPopup && (
                  <LeadVolunteerPopup
                    closeLeadPopupAndSetRows={closeLeadPopupAndSetRows}
                    openLeadPopup={openLeadPopup}
                    closeLeadPopup={closeLeadPopup}
                  />
                )}
              </Box>
              <Box className={classes.AccordionContainer}>
                <AccordionTable
                  rowData={volunteersRowData}
                  headingName={'Volunteers'}
                  isView={isView}
                  handleDeleteRow={handleDeleteRow}
                />
                <AccordionTable
                  rowData={leadVolunteersRowData}
                  headingName={'Lead Volunteers'}
                  isView={isView}
                  handleDeleteRow={handleDeleteRow}
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
                  rowData={participantsRowData}
                  headingName={'Participants'}
                  isView={isView}
                  handleDeleteRow={handleDeleteRow}
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
                  rowData={meetingsRowData}
                  headingName={'Meetings'}
                  isView={isView}
                  handleDeleteRow={handleDeleteRow}
                />
              </Box>
            </Box>
            {/* popup for adding participant and meetings  */}
            {openPopup && (
              <AutocompletePopup
                mode={mode}
                openPopup={openPopup}
                closeOpenPopup={closeOpenPopup}
                closePopupAndSetRows={closePopupAndSetRows}
              />
            )}
          </Box>

          {/* action bar  */}
          {user?.isAdmin && (
            <Box className={classes.actionBar}>
              <Button
                disableTouchRipple
                className="cancelBtn"
                onClick={() => nav('/workshops')}
              >
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
          )}
        </Box>
      )}
    </>
  );
}

export default WorkshopsDetails;
