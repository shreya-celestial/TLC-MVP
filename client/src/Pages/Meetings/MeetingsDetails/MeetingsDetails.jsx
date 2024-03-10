import React, { useEffect, useState } from 'react';
import {
  Box,
  MenuItem,
  Select,
  Autocomplete,
  Button,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import { useStyles } from './MeetingsDetails.styles';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import AutocompletePopup from '../../../Components/AutocompletePopup/AutocompletePopup';
import {
  MeetingPageEnrollmentsColDef,
  MeetingPageVolunteersColDef,
} from './MeetingDummyData';
import { DeleteButtonCell } from '../../../Components/DeleteButtonCell/DeleteButtonCell';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getMeeting } from '../../../apis/meetings';
import { useParams } from 'react-router-dom';
import { fetchRowDataMeeting } from '../utils';
import dayjs from 'dayjs';
import { compareTwoArrays } from '../../../utils/utils';
import AlertReact from '../../../Components/Alert/AlertReact';
import { workshops } from '../../../apis/workshops';
import { createMeeting, updateMeeting } from '../../../apis/meetings';

import { useMutation } from '@tanstack/react-query';

function MeetingsDetails() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [mode, setMode] = useState('');

  const { id, type } = useParams();

  const [isView, setIsView] = useState(type === 'view' ? true : false);

  const dummyEnrollmentsColDef = [
    ...MeetingPageEnrollmentsColDef,
    !isView && {
      field: 'Actions',
      cellRenderer: DeleteButtonCell,
    },
  ].filter(Boolean);

  const dummyVolunteersColDef = [
    ...MeetingPageVolunteersColDef,
    !isView && {
      field: 'Actions',
      cellRenderer: DeleteButtonCell,
    },
  ].filter(Boolean);

  const closeOpenPopup = () => {
    setOpenPopup(false);
  };

  const handleVolunteerMode = () => {
    setOpenPopup(true);
    setMode('Volunteers');
  };

  const handleEnrollmentMode = () => {
    setOpenPopup(true);
    setMode('Participants');
  };

  const [volunteersRowData, setVolunteersRowData] = useState([]);
  const [enrollmentsRowData, setEnrollmentsRowData] = useState([]);
  const [workshopOptions, setWorkshopOptions] = useState([]);

  const [meetingType, setMeetingType] = useState('none');
  const [workshop, setWorkshop] = useState();
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('');
  const [venueCity, setVenueCity] = useState('');
  const [selectedWorkshop, setSelectedWorkshop] = useState([]);

  const [viewType, setViewType] = useState(type);

  const { data, isLoading, isError, error } = useReactQuery([id], getMeeting, {
    enabled: viewType !== 'create',
  });

  const [filters, setFilters] = useState({});
  const [debouncedFilters, setDebouncedFilters] = useState();

  const {
    data: workshopsData,
    isPending: isPendingWorkshops,
    isError: iseErrorWorkshops,
    error: errorWorkshop,
  } = useReactQuery([1, 10, { ...debouncedFilters }], workshops, {
    enabled: debouncedFilters?.search !== undefined,
  });

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: type === 'create' ? createMeeting : updateMeeting,
    onSuccess: (data) => {
      console.log(data);
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
      console.log(error);

      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  const meeting = data?.data;

  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const closePopupAndSetRows = function (data, mode) {
    if (mode === 'Participants') {
      const isEvery = compareTwoArrays(enrollmentsRowData, data, 'email');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Participants are already existing',
        });
        setOpenPopup(false);
        return;
      }

      setEnrollmentsRowData((prev) => {
        return [...prev, ...data];
      });
      setOpenPopup(false);
    }

    if (mode === 'Volunteers') {
      console.log(volunteersRowData, data);
      const isEvery = compareTwoArrays(volunteersRowData, data, 'email');

      if (!isEvery) {
        setAlertType({
          type: 'error',
          message: 'Some Volunteers are already existing',
        });
        setOpenPopup(false);
        return;
      }

      setVolunteersRowData((prev) => {
        return [...prev, ...data];
      });
      setOpenPopup(false);
    }
  };

  useEffect(() => {
    setMeetingType(meeting?.type?.trim() || 'none');
    setWorkshop(meeting?.workshop);
    setVenue(meeting?.venue || '');
    setVenueCity(meeting?.venue_city || '');
    setDate(meeting?.date || '');
    setWorkshopOptions([meeting?.workshop]);

    if (viewType !== 'create') {
      const { fetchVolunteers, fetchEnrollments } =
        fetchRowDataMeeting(meeting);
      setVolunteersRowData(fetchVolunteers || []);
      setEnrollmentsRowData(fetchEnrollments || []);
    }
  }, [meeting, viewType, isView]);

  useEffect(() => {
    if (!isView) {
      setWorkshopOptions(workshopsData?.data?.workshops || []);
    }
  }, [workshopsData, isView]);

  const mutateMeetingHandler = function (type) {
    let modifiedDate = date;
    if (type === 'create') modifiedDate = date.toISOString().split('T')[0];

    mutate({
      body: {
        date: modifiedDate,
        type: meetingType,
        venue,
        venue_city: venueCity,
        workshop_id: selectedWorkshop.id,
        enrollments: enrollmentsRowData.map((enrollment) => enrollment.id),
        volunteers: volunteersRowData.map((volunteer) => volunteer.email),
      },
      id,
    });
  };

  const editHandler = function () {
    setIsView(false);
    setViewType('edit');
  };

  return (
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
              ? 'View Meeting'
              : viewType === 'edit'
              ? 'Edit Meeting'
              : 'Create Meeting'
          }
          prevPage={'Meetings'}
          path={'meetings'}
        />
        <Box className={classes.mainContent}>
          {/* meeting type and workshop autocomplete  */}
          <Box className={classes.formElementBox}>
            {!isView ? (
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="meetingType">Meeting Type</FormLabel>
                <Select
                  id="meetingType"
                  name="meetingType"
                  value={meetingType}
                  onChange={(e) => setMeetingType(e.target.value)}
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  disabled={isView}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  <MenuItem value="none">None</MenuItem>
                  <MenuItem value="Meeting Type 1">Meeting Type 1</MenuItem>
                  <MenuItem value="Meeting Type 2">Meeting Type 2</MenuItem>
                  <MenuItem value="Meeting Type 3">Meeting Type 3</MenuItem>
                  <MenuItem value="Meeting Type 4">Meeting Type 4</MenuItem>
                </Select>
              </FormControl>
            ) : (
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="meetingType">Meeting Type</FormLabel>
                <TextField
                  id="meetingType"
                  placeholder="Meeting"
                  name="meeting"
                  disabled={isView}
                  value={meetingType}
                />
              </FormControl>
            )}

            {/* workshop autocomplete */}

            <FormControl className={classes.formControl}>
              <FormLabel>Workshop</FormLabel>
              <Autocomplete
                options={workshopOptions}
                defaultValue={workshopOptions[0]}
                onChange={(event, selectedElement) =>
                  setSelectedWorkshop((prev) => selectedElement)
                }
                disabled={isView}
                renderInput={(params) => (
                  <TextField
                    onChange={(e) => setFilters({ search: e.target.value })}
                    className={classes.autocompleteTextField}
                    placeholder="Search and add workshop"
                    {...params}
                  />
                )}
                PaperComponent={(props) => (
                  <Paper
                    {...props}
                    className={classes.customAutocompleteDropdown}
                  />
                )}
                className={classes.autocomplete}
                popupIcon={<ExpandMoreOutlinedIcon />}
                noOptionsText={
                  <Typography className={classes.notFound}>
                    No Match Found
                  </Typography>
                }
                getOptionLabel={(option) => `${option.types} `}
              />
            </FormControl>
          </Box>

          {/* date and city */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel>Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker
                  name="date"
                  disabled={isView}
                  value={dayjs(date)}
                  onChange={(date) => setDate(new Date(date))}
                />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="cityField">City</FormLabel>
              <TextField
                id="cityField"
                placeholder="Enter City "
                name="city"
                disabled={isView}
                value={venueCity}
                onChange={(e) => setVenueCity(e.target.value)}
              />
            </FormControl>
          </Box>
          {/* venue */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="venueField">Venue</FormLabel>
              <TextField
                id="venueField"
                placeholder="Enter Meeting Venue"
                name="venue"
                disabled={isView}
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              />
            </FormControl>
          </Box>
        </Box>
        {/* add volunteer autocomplete and accordion table */}
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Add Volunteers</Typography>
            {!isView && (
              <Button
                className={classes.addBtn}
                disableRipple
                onClick={handleVolunteerMode}
              >
                Add
              </Button>
            )}
          </Box>

          <AccordionTable
            columnDefs={dummyVolunteersColDef}
            rowData={volunteersRowData}
            headingName={'Volunteers'}
          />
        </Box>
        {/* add enrollments and accordion table  */}
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Add Enrollments</Typography>
            {!isView && (
              <Button
                className={classes.addBtn}
                disableRipple
                onClick={handleEnrollmentMode}
              >
                Add
              </Button>
            )}
          </Box>

          <AccordionTable
            columnDefs={dummyEnrollmentsColDef}
            rowData={enrollmentsRowData}
            headingName={'Enrollments'}
          />
        </Box>
        {/* popup for adding volunteer and enrollments */}
        <AutocompletePopup
          mode={mode}
          closeOpenPopup={closeOpenPopup}
          openPopup={openPopup}
          closePopupAndSetRows={closePopupAndSetRows}
        />
      </Box>

      {/* action bar  */}
      <Box className={classes.actionBar}>
        <Button disableTouchRipple className="cancelBtn">
          Cancel
        </Button>
        {viewType === 'view' ? (
          <Button disableTouchRipple className="editBtn" onClick={editHandler}>
            Edit
          </Button>
        ) : viewType === 'edit' ? (
          <Button
            disableTouchRipple
            className="saveBtn"
            onClick={() => mutateMeetingHandler('edit')}
          >
            {isPendingMutation ? 'Loading...' : 'Save'}
          </Button>
        ) : (
          <Button
            disableTouchRipple
            className="saveBtn"
            onClick={() => mutateMeetingHandler('create')}
          >
            {isPendingMutation ? 'Loading...' : 'Create'}
          </Button>
        )}
      </Box>
    </Box>
  );
}

export default MeetingsDetails;
