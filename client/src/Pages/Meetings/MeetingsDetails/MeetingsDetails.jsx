import React, { useState } from 'react';
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
  MeetingPageEnrollmentsRowData,
  MeetingPageVolunteersColDef,
  MeetingPageVolunteersRowData,
} from './MeetingDummyData';
import { DeleteButtonCell } from '../../../Components/DeleteButtonCell/DeleteButtonCell';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getMeeting } from '../../../apis/meetings';
import { useParams } from 'react-router-dom';

function MeetingsDetails() {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);
  const [mode, setMode] = useState('');
  const isView = false;
  const DummyWorkshopList = [
    'Freedom',
    'Bhagwad Gita',
    'Live Better Life',
    'Confidence, Power and Excellence',
    'Love, Relationship, and Romance',
  ];
  const { id, type } = useParams();

  const { data, isPending, isError, error } = useReactQuery([id], getMeeting);

  console.log(data);

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
    setMode('Enrollments');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.HeaderMainContent}>
        <PageHeader currentPage={'Create Meeting'} prevPage={'Meetings'} />
        <Box className={classes.mainContent}>
          {/* meeting type and workshop autocomplete  */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="meetingType">Meeting Type</FormLabel>
              <Select
                id="meetingType"
                name="meetingType"
                value="none"
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
                <MenuItem value="meetingType1">Meeting Type 1</MenuItem>
                <MenuItem value="meetingType2">Meeting Type 2</MenuItem>
                <MenuItem value="meetingType3">Meeting Type 3</MenuItem>
                <MenuItem value="meetingType4">Meeting Type 4</MenuItem>
              </Select>
            </FormControl>

            {/* workshop autocomplete */}
            <FormControl className={classes.formControl}>
              <FormLabel>Workshop</FormLabel>
              <Autocomplete
                options={DummyWorkshopList}
                disabled={isView}
                onChange={(e, value) => console.log(value)}
                renderInput={(params) => (
                  <TextField
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
                <DatePicker name="date" disabled={isView} />
              </LocalizationProvider>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="cityField">City</FormLabel>
              <TextField
                id="cityField"
                placeholder="Enter City "
                name="city"
                disabled={isView}
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
            rowData={MeetingPageVolunteersRowData}
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
            rowData={MeetingPageEnrollmentsRowData}
            headingName={'Enrollments'}
          />
        </Box>
        {/* popup for adding volunteer and enrollments */}
        <AutocompletePopup
          mode={mode}
          closeOpenPopup={closeOpenPopup}
          openPopup={openPopup}
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

export default MeetingsDetails;
