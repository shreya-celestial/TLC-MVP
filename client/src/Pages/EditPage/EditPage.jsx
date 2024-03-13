import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './EditPage.styles';
import dayjs from 'dayjs';

function EditPage() {
  const data = {
    name: '',
    email: 'user1@gmail.com',
    phonenumber:null,
    password: 'User1@2001',
    gender: 'male',
    role: 'Volunteer',
    joinYear: 2024,
    address: 'House 399 4th main 4th cross',
    postalcode: 560047,
    city: 'bangalore',
    state: 'karnataka',
    dob: '03-13-2024',
  };
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = '2012'; year <= currentYear; year++) {
    years.push(year);
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.HeaderMainContent}>
        <Typography className="editProfileHeading">Edit Profile</Typography>
        <Box className={classes.mainContent}>
          {/*  PERSONAL INFORMATION*/}
          <Box className={classes.HeadingAndElementBox}>
            <Typography className="heading">Personal Information</Typography>

            {/* name and email address */}
            <Box className={classes.formElementBox}>
              <FormControl
                className={`${classes.formControl} ${
                  !data.name && 'emptyField'
                }`}
                required
              >
                <FormLabel htmlFor="fullNameField">Name</FormLabel>
                <TextField
                  id="fullNameField"
                  placeholder="Enter Your Full Name"
                  name="name"
                  value={data.name}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="emailField">Email Address</FormLabel>
                <Typography className={classes.preFilled} variant="body2">
                  {data.email}
                </Typography>
              </FormControl>
            </Box>

            {/*phone number and password */}

            <Box className={classes.formElementBox}>
              <FormControl
                className={`${classes.formControl} ${
                  !data.phonenumber && 'emptyField'
                }`}
                required
              >
                <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
                <TextField
                  id="phoneNumberField"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  required
                  value={data.phonenumber}
                />
              </FormControl>
              <FormControl
                className={`${classes.formControl} ${
                  !data.password && 'emptyField'
                }`}
                required
              >
                <FormLabel htmlFor="passwordField">Password</FormLabel>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  id="passwordField"
                  name="password"
                  required
                  value={data.password}
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
            </Box>
            {/* date picker-DOB and Gender */}
            <Box className={classes.formElementBox}>
              <FormControl
                className={`${classes.formControl} ${
                  !data.dob && 'emptyField'
                }`}
                required
              >
                <FormLabel>Date of Birth</FormLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className={classes.datepicker}
                >
                  <DatePicker name="dob"  value={dayjs(data.dob)} />
                </LocalizationProvider>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                <Select
                  id="genderSelectBox"
                  name="gender"
                  value={data.gender}
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
                <Typography className={classes.preFilled} variant="body2">
                  {data.role}
                </Typography>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="yearSelectBox">
                  Year Of Joining TLC
                </FormLabel>
                <Select
                  id="yearSelectBox"
                  name="yearOfJoining"
                  value={data.joinYear}
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
            <FormControl
              className={`${classes.formControl} ${
                !data.address && 'emptyField'
              }`}
              required
            >
              <FormLabel htmlFor="locationField">Address</FormLabel>
              <TextField
                id="locationField"
                placeholder="Enter Your Address"
                name="address"
                required
                value={data.address}
              />
            </FormControl>
            {/* postal code */}
            <FormControl
              className={`${classes.formControl} ${
                !data.postalcode && 'emptyField'
              }`}
              required
            >
              <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
              <TextField
                id="postalCodeField"
                placeholder="Enter Your Postal Code"
                name="pincode"
                type="number"
                required
                value={data.postalcode}
              />
            </FormControl>
            {/* city and state */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="citySelectBox">City</FormLabel>

                <Select
                  id="citySelectBox"
                  name="city"
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  value={data.city}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  <MenuItem value="bangalore">Bangalore</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="stateField">State</FormLabel>
                <TextField
                  id="stateField"
                  placeholder="Enter Your State"
                  name="state"
                  value={data.state}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* action bar  */}

      <Box className={classes.actionBar}>
        <Button disableTouchRipple className="cancelBtn">
          Cancel
        </Button>

        <Button disableRipple className="saveBtn">
          Save
        </Button>
      </Box>
    </Box>
  );
}

export default EditPage;
