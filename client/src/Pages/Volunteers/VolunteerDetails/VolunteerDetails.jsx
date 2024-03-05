import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { getLocationData } from '../../../apis/global';
import { useStyles } from './VolunteerDetails.styles';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import {
  meetingColDef,
  meetingRowData,
  workShopColDef,
  workShopRowData,
} from './DummyHistoryData';
const dummyData = {
  name: 'john doe',
  email: 'user1@gmail.com',
  phone: 9745648312,
  dob: '02-02-2024',
  gender: 'male',
  role: 'volunteer',
  joining: '2024',
  address: 'House 399, 4th main, viveknagar',
  postal: 560047,
  city: 'Bangalore',
  state: 'Karnataka',
};

function VolunteerDetails() {
  const isView = true;
  const isAdmin = true;
  const isValidUser = false; //for password field only show to valid user while edit profile

  const currentYear = new Date().getFullYear();
  const [showPassword, setShowPassword] = useState(false);
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [yearOfJoining, setYearOfJoining] = useState(currentYear);
  const [gender, setGender] = useState('male');
  const [role, setRole] = useState('volunteer');

  const classes = useStyles();
  const years = [];
  for (let year = '2012'; year <= currentYear; year++) {
    years.push(year);
  }

  useEffect(() => {
    let timer;
    timer = setTimeout(async () => {
      if (pincode) {
        const data = await getLocationData(pincode);
        if (data?.results[pincode]?.length) {
          setCity(data?.results[pincode][0].city);
          setCities(data?.results[pincode]);
        }
      } else {
        setCities(null);
        setCity(null);
        setState('');
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pincode]);

  useEffect(() => {
    if (cities) {
      const data = cities.find((pincodeCity) => pincodeCity.city === city);
      setState(data.state);
    }
  }, [city]);
  return (
    <Box className={classes.root}>
      <Box className={classes.HeaderMainContent}>
        {/* page header with breadcrumbs.pass the prev page path as prop and handle in pageHeader */}
        <PageHeader currentPage={'View Volunteer'} prevPage={'volunteers'} />
        <Box className={classes.mainContent}>
          {/*  PERSONAL INFORMATION*/}
          <Box className={classes.HeadingAndElementBox}>
            <Typography className="heading">Personal Information</Typography>

            {/* name and email address */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="fullNameField">Name</FormLabel>
                <TextField
                  id="fullNameField"
                  placeholder="Enter Your Full Name"
                  required
                  name="name"
                  disabled={true}
                  value={dummyData.name}
                />
              </FormControl>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="emailField">Email Address</FormLabel>
                <TextField
                  type="email"
                  id="emailField"
                  placeholder="Enter Your Email Address"
                  required
                  name="email"
                  disabled={true}
                  value={dummyData.email}
                />
              </FormControl>
            </Box>

            {/*password and  phone number */}

            <Box className={classes.formElementBox}>
              {isValidUser && (
                <FormControl className={classes.formControl} required>
                  <FormLabel htmlFor="passwordField">Password</FormLabel>
                  <TextField
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter Your Password"
                    id="passwordField"
                    name="password"
                    required
                    disabled={true}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            disableRipple
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? (
                              <VisibilityOutlinedIcon />
                            ) : (
                              <VisibilityOffOutlinedIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </FormControl>
              )}
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
                <TextField
                  id="phoneNumberField"
                  placeholder="Enter Your Phone Number"
                  required
                  name="phone"
                  disabled={true}
                  value={dummyData.phone}
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
                  <DatePicker name="dob" required disabled={true} />
                </LocalizationProvider>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                <Select
                  id="genderSelectBox"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  name="gender"
                  required
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
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
                <Select
                  id="roleSelectBox"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  name="role"
                  required
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
                <FormLabel htmlFor="yearSelectBox">
                  Year Of Joining TLC
                </FormLabel>
                <Select
                  id="yearSelectBox"
                  name="yearOfJoining"
                  value={yearOfJoining}
                  onChange={(e) => setYearOfJoining(e.target.value)}
                  required
                  disabled={true}
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  {years.map((item, index) => (
                    <MenuItem key={index} value={item}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
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
                required
                disabled={true}
                value={dummyData.address}
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
                required
                disabled={true}
                value={dummyData.postal}
                onChange={(e) => setPincode(e.target.value)}
              />
            </FormControl>
            {/* city and state */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="citySelectBox">City</FormLabel>
                {!cities && (
                  <TextField
                    id="citySelectBox"
                    placeholder="Enter Your City"
                    name="city"
                    required
                    disabled={true}
                    value={dummyData.city}
                  />
                )}
                {cities && (
                  <Select
                    id="citySelectBox"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    name="city"
                    required
                    disabled={true}
                    IconComponent={ExpandMoreOutlinedIcon}
                    className={classes.selectBox}
                    MenuProps={{
                      classes: {
                        paper: classes.selectDropdownMenu,
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem value={city?.city} key={city?.city}>
                        {city?.city}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="stateField">State</FormLabel>
                <TextField
                  id="stateField"
                  placeholder="Enter Your State"
                  name="state"
                  value={dummyData.state}
                  disabled={true}
                  onChange={(e) => {
                    setState(e.target.value);
                  }}
                  required
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        {/* volunteer history */}
        <Box className={classes.VolunteerHistory}>
          <Typography className="historyHeading">Workshop History</Typography>
          <AccordionTable
            columnDefs={workShopColDef}
            rowData={workShopRowData}
            headingName={'workshops'}
          />
        </Box>
        <Box className={classes.VolunteerHistory}>
          <Typography className="historyHeading">Meeting History</Typography>
          <AccordionTable
            columnDefs={meetingColDef}
            rowData={meetingRowData}
            headingName={'Meetings'}
          />
        </Box>
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

export default VolunteerDetails;
