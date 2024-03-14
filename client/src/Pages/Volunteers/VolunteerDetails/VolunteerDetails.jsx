import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  CircularProgress,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './VolunteerDetails.styles';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import { useParams, useNavigate } from 'react-router-dom';
import {
  workshopColDefVolunteersPage,
  meetingsColDefVolunteersPage,
} from '../coldefs/coldefs';

import { getVolunteer } from '../../../apis/volunteers';
import { useReactQuery } from '../../../hooks/useReactQuery';

import dayjs from 'dayjs';
import { useMutation } from '@tanstack/react-query';
import { updateVolunteerRole } from '../../../apis/volunteers';
import AlertReact from '../../../Components/Alert/AlertReact';
import UserContext from '../../../store/userContext';

function VolunteerDetails() {
  const classes = useStyles();
  const [isView, setIsView] = useState();

  const isAdmin = true;
  const { user } = useContext(UserContext);
  const nav = useNavigate();

  const { email, type } = useParams();

  useEffect(() => {
    if (type === 'edit') {
      setIsView(false);
    }
    if (type === 'view') {
      setIsView(true);
    }
  }, [type]);

  const { data, isPending, isError } = useReactQuery([email], getVolunteer);

  const [role, setRole] = useState(
    data?.user?.isAdmin === true ? 'admin' : 'volunteer'
  );

  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: updateVolunteerRole,
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
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const saveVolunteer = function () {
    mutate({ email, isAdmin: role === 'admin' ? 'true' : 'false' });
  };

  const [historyLeadRowData, setHistoryLeadRowData] = useState([]);
  const [historyRowData, setHistoryRowData] = useState([]);
  const [MeetingHistoryRowData, setMeetingHistoryRowData] = useState([]);

  useEffect(() => {
    if (data) {
      setHistoryLeadRowData(
        data?.user?.workshop_lead_volunteers.map((v) => {
          v.workshop.role = 'Lead Volunteer';
          return v.workshop;
        })
      );
      setHistoryRowData(
        data?.user?.workshop_volunteers.map((v) => {
          v.workshop.role = 'Volunteer';
          return v.workshop;
        })
      );

      setMeetingHistoryRowData(
        data?.user?.meetings_volunteers.map((m) => m.meeting)
      );
    }
  }, [data]);

  useEffect(() => {
    if (type !== 'edit' && type !== 'view') {
      nav('/volunteers');
    }
    if (type === 'view') {
      setIsView(true);
    }
  }, [type]);

  useEffect(() => {
    if (!user?.isAdmin && type !== 'view') {
      nav('/volunteers');
    }
  }, [user, type]);

  if (type !== 'edit' && type !== 'view') {
    return;
  }

  if (!user?.isAdmin && type !== 'view') {
    return;
  }

  return (
    <>
      {isPending && (
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
      {data && (
        <Box className={classes.root}>
          {alertType && (
            <AlertReact
              removeAlertType={removeAlertType}
              type={alertType.type}
              message={alertType.message}
            />
          )}
          <Box className={classes.HeaderMainContent}>
            {/* page header with breadcrumbs.pass the prev page path as prop and handle in pageHeader */}

            <PageHeader
              currentPage={
                type === 'edit'
                  ? 'Edit Volunteer'
                  : type === 'view'
                  ? 'View Volunteer'
                  : ''
              }
              prevPage={'volunteers'}
              path={'volunteers'}
            />
            <Box className={classes.mainContent}>
              {/*  PERSONAL INFORMATION*/}
              <Box className={classes.HeadingAndElementBox}>
                <Typography className="heading">
                  Personal Information
                </Typography>

                {/* name and email address */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="fullNameField">Name</FormLabel>
                    <TextField
                      id="fullNameField"
                      placeholder="Enter Your Full Name"
                      name="name"
                      disabled={true}
                      value={data.user.name}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="emailField">Email Address</FormLabel>
                    <TextField
                      type="email"
                      id="emailField"
                      placeholder="Enter Your Email Address"
                      name="email"
                      disabled={true}
                      value={data.user.email}
                    />
                  </FormControl>
                </Box>

                {/*phone number */}

                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="phoneNumberField">
                      Phone Number
                    </FormLabel>
                    <TextField
                      id="phoneNumberField"
                      placeholder="Enter Your Phone Number"
                      name="phone"
                      disabled={true}
                      value={data.user.phoneNumber}
                    />
                  </FormControl>
                </Box>
                {/* date picker-DOB and Gender */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl}>
                    <FormLabel>Date of Birth</FormLabel>
                    <LocalizationProvider
                      dateAdapter={AdapterDayjs}
                      className={classes.datepicker}
                    >
                      <DatePicker
                        value={dayjs(data.user.dob)}
                        name="dob"
                        disabled={true}
                      />
                    </LocalizationProvider>
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                    <Select
                      id="genderSelectBox"
                      value={data.user.gender}
                      name="gender"
                      disabled={true}
                      IconComponent={ExpandMoreOutlinedIcon}
                      className={classes.selectBox}
                      MenuProps={{
                        classes: {
                          paper: classes.selectDropdownMenu,
                        },
                      }}
                    >
                      <MenuItem value="male">Male</MenuItem>
                      <MenuItem value="female">Female</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                {/* role and year of joining */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl} required>
                    <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
                    <Select
                      id="roleSelectBox"
                      value={role}
                      // isAdmin: role === 'admin' ? 'true' : 'false'
                      onChange={(e) => setRole(e.target.value)}
                      name="role"
                      disabled={isView ? true : !isView && !isAdmin}
                      IconComponent={ExpandMoreOutlinedIcon}
                      className={classes.selectBox}
                      MenuProps={{
                        classes: {
                          paper: classes.selectDropdownMenu,
                        },
                      }}
                    >
                      <MenuItem value="volunteer">Volunteer</MenuItem>
                      <MenuItem value="admin">Admin</MenuItem>
                    </Select>
                  </FormControl>

                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="joiningYear">
                      Year Of Joining TLC
                    </FormLabel>
                    <TextField
                      id="joiningYear"
                      name="joiningYear"
                      disabled={true}
                      value={data.user.yearOfJoining}
                    />
                  </FormControl>
                </Box>
              </Box>
              {/* ADDRESS INFORMATION */}
              <Box className={classes.HeadingAndElementBox}>
                <Typography className="heading">Address Information</Typography>

                {/* location */}
                <FormControl className={classes.formControl}>
                  <FormLabel htmlFor="locationField">Address</FormLabel>
                  <TextField
                    id="locationField"
                    placeholder="Enter Your Address"
                    name="address"
                    disabled={true}
                    value={data.user.location}
                  />
                </FormControl>
                {/* postal code */}
                <FormControl className={classes.formControl}>
                  <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
                  <TextField
                    id="postalCodeField"
                    placeholder="Enter Your Postal Code"
                    name="pincode"
                    type="number"
                    disabled={true}
                    value={data.user.pincode}
                  />
                </FormControl>
                {/* city and state */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="citySelectBox">City</FormLabel>

                    <TextField
                      id="citySelectBox"
                      placeholder="Enter Your City"
                      name="city"
                      disabled={true}
                      value={data.user.city}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl}>
                    <FormLabel htmlFor="stateField">State</FormLabel>
                    <TextField
                      id="stateField"
                      placeholder="Enter Your State"
                      name="state"
                      value={data.user.state}
                      disabled={true}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
            {/* volunteer history */}
            <Box className={classes.VolunteerHistory}>
              <Typography className="historyHeading">
                Workshop History
              </Typography>
              <AccordionTable
                columnDefs={workshopColDefVolunteersPage}
                rowData={[...historyLeadRowData, ...historyRowData]}
                headingName={'Workshops'}
                isView={true}
              />
            </Box>
            <Box className={classes.VolunteerHistory}>
              <Typography className="historyHeading">
                Meeting History
              </Typography>
              <AccordionTable
                columnDefs={meetingsColDefVolunteersPage}
                rowData={MeetingHistoryRowData}
                headingName={'Meetings'}
                isView={true}
              />
            </Box>
          </Box>

          {/* action bar  */}
          {user?.isAdmin && (
            <Box className={classes.actionBar}>
              <Button disableTouchRipple className="cancelBtn">
                Cancel
              </Button>
              {isView ? (
                <Button
                  disableTouchRipple
                  className="editBtn"
                  onClick={() => setIsView(false)}
                >
                  Edit
                </Button>
              ) : (
                <Button
                  disableTouchRipple
                  className="saveBtn"
                  onClick={saveVolunteer}
                >
                  {isPendingMutation ? 'Loading...' : 'Save'}
                </Button>
              )}
            </Box>
          )}
        </Box>
      )}
    </>
  );
}

export default VolunteerDetails;
