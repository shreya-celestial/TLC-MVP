import React, { useContext, useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Button,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './EditPage.styles';
import dayjs from 'dayjs';
import UserContext from '../../store/userContext';
import { useMutation } from '@tanstack/react-query';
import { updateProfile } from '../../apis/user';
import { useNavigate } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import profileValidator from '../../utils/profileValidator';
import moment from 'moment';

function EditPage() {
  const { user, setUser } = useContext(UserContext);
  const nav = useNavigate();
  const [alertType, setAlertType] = useState();
  const { mutate, isPending } = useMutation({
    mutationFn: updateProfile,
    onSuccess: (reqData) => {
      if (reqData?.status === 'success') {
        setUser((prev) => ({
          ...prev,
          name: data?.name,
          dob: data?.dob,
          city: data?.city,
          state: data?.state,
          location: data?.address,
          gender: data?.gender,
          phoneNumber: data?.phonenumber,
          pincode: +data?.postalcode,
          yearOfJoining: +data?.joinYear,
        }));
        nav(-1);
        return;
      }
      setAlertType({
        type: reqData.status,
        message: reqData.message,
      });
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error,
      });
    },
  });

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const userData = {
    name: user?.name,
    email: user?.email,
    phonenumber: user?.phoneNumber,
    gender: user?.gender,
    role: user?.isAdmin ? 'Admin' : 'Volunteer',
    joinYear: user?.yearOfJoining,
    address: user?.location,
    postalcode: user?.pincode,
    city: user?.city,
    state: user?.state,
    dob: user?.dob,
  };

  const [data, setData] = useState(userData);
  const classes = useStyles();
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = '2012'; year <= currentYear; year++) {
    years.push(year);
  }

  const handleSubmit = () => {
    const mail = user?.email;
    const body = {
      name: data?.name.trim(),
      dob: moment(data?.dob).format('MM/DD/YYYY'),
      city: data?.city,
      state: data?.state,
      location: data?.address,
      gender: data?.gender,
      phoneNumber: data?.phonenumber,
      pincode: +data?.postalcode,
      yearOfJoining: +data?.joinYear,
    };

    const check = profileValidator(body);
    if (check?.type === 'error') {
      return setAlertType({
        type: 'error',
        message: check?.message,
      });
    }
    mutate({ mail, body, user });
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
        <Typography className="editProfileHeading">Edit Profile</Typography>
        <Box className={classes.mainContent}>
          {/*  PERSONAL INFORMATION*/}
          <Box className={classes.HeadingAndElementBox}>
            <Typography className="heading">Personal Information</Typography>

            {/* name*/}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="fullNameField">Name</FormLabel>
                <TextField
                  id="fullNameField"
                  placeholder="Enter Your Full Name"
                  required
                  name="name"
                  value={data.name}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, name: e.target.value }))
                  }
                />
              </FormControl>
            </Box>

            {/*email and phone number*/}

            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="emailField">Email Address</FormLabel>
                <Typography className={classes.preFilled} variant="body2">
                  {data.email}
                </Typography>
              </FormControl>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
                <TextField
                  id="phoneNumberField"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  required
                  value={data.phonenumber}
                  onChange={(e) =>
                    setData((prev) => ({
                      ...prev,
                      phonenumber: e.target.value,
                    }))
                  }
                />
              </FormControl>
            </Box>
            {/* date picker-DOB and Gender */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl} required>
                <FormLabel>Date of Birth</FormLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className={classes.datepicker}
                >
                  <DatePicker
                    required
                    name="dob"
                    disableFuture={true}
                    value={dayjs(data.dob)}
                    onChange={(date) =>
                      setData((prev) => ({
                        ...prev,
                        dob: new Date(date),
                      }))
                    }
                  />
                </LocalizationProvider>
              </FormControl>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                <Select
                  id="genderSelectBox"
                  name="gender"
                  required
                  value={data.gender}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, gender: e.target.value }))
                  }
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
                  required
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, joinYear: e.target.value }))
                  }
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
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="locationField">Address</FormLabel>
              <TextField
                id="locationField"
                placeholder="Enter Your Address"
                name="address"
                required
                value={data.address}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, address: e.target.value }))
                }
              />
            </FormControl>
            {/* postal code */}
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
              <TextField
                id="postalCodeField"
                placeholder="Enter Your Postal Code"
                name="pincode"
                type="number"
                required
                value={data.postalcode}
                onChange={(e) =>
                  setData((prev) => ({ ...prev, postalcode: e.target.value }))
                }
              />
            </FormControl>
            {/* city and state */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="cityField">City</FormLabel>
                <TextField
                  id="cityField"
                  placeholder="Enter Your City"
                  name="city"
                  required
                  value={data.city}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, city: e.target.value }))
                  }
                />
              </FormControl>
              <FormControl className={classes.formControl} required>
                <FormLabel htmlFor="stateField">State</FormLabel>
                <TextField
                  id="stateField"
                  placeholder="Enter Your State"
                  name="state"
                  required
                  value={data.state}
                  onChange={(e) =>
                    setData((prev) => ({ ...prev, state: e.target.value }))
                  }
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* action bar  */}

      <Box className={classes.actionBar}>
        <Button
          disableTouchRipple
          className="cancelBtn"
          onClick={() => nav(-1)}
        >
          Cancel
        </Button>

        <Button disableRipple className="saveBtn" onClick={handleSubmit}>
          {isPending ? 'Saving...' : 'Save'}
        </Button>
      </Box>
    </Box>
  );
}

export default EditPage;
