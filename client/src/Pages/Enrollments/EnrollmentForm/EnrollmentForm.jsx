import React, { useEffect, useState } from 'react';
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
import { useStyles } from './EnrollmentsForm.styles';
import AddChildPopup from '../AddChildPopup/AddChildPopup';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { getLocationData } from '../../../apis/global';
import { validateEnrollment } from '../../../utils/utils';
import dayjs from 'dayjs';
import AlertReact from '../../../Components/Alert/AlertReact';
import { useMutation } from '@tanstack/react-query';
import { createEnrollment } from '../../../apis/enrollments';
import logo from '../../../assets/Icons/tlcLogo.png';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';

function EnrollmentsDetails() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('for');
  const name = queryParams.get('name');
  const phone = queryParams.get('phone');
  const classes = useStyles();

  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState(new Date('1 jan 2000'));
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState('');

  const [childrenRowData, setChildrenRowData] = useState([]);

  const [cityFocus, setCityFocus] = useState(false);

  useEffect(() => {
    if (cityFocus) {
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
      }, 300);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [pincode]);

  useEffect(() => {
    if (cities) {
      const data = cities.find((pincodeCity) => pincodeCity.city === city);
      setState(data.state);
    }
  }, [city]);

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: createEnrollment,
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
      let msg;
      if (error?.info?.message.includes('Uniqueness violation')) {
        msg = 'Enrollment already exists';
      }
      setAlertType({
        type: 'error',
        message: msg || error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const [openChild, setOpenChild] = useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };

  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const [alertKey, setAlertKey] = useState(true);

  const handleCloseOpenChild = () => {
    setOpenChild(false);
  };

  const closePopupAndSetRows = (data) => {
    setOpenChild(false);
    if (data) {
      setChildrenRowData((prev) => {
        return [...prev, data];
      });
    }
  };

  const mutateEnrollmentHandler = function (e) {
    e.preventDefault();
    setAlertKey((prev) => !prev);

    let token = queryParams.get('ticket');
    token = token?.replaceAll(' ', '+');

    let body = {
      name: name?.trim(),
      email,
      token,
      mobile_number: phone?.trim(),
      dob: moment(dob).format('MM/DD/YYYY'),
      gender,
      address: address?.trim(),
      city: city?.trim(),
      state: state?.trim(),
      pincode,
      children: childrenRowData.map((cr) => {
        return {
          name: cr.name,
          gender: cr.gender,
          dob: moment(cr.dob).format('MM/DD/YYYY'),
        };
      }),
    };

    const isValid = validateEnrollment(body);
    if (isValid.type) return setAlertType(isValid);

    const validChild = childrenRowData?.filter((cr) => {
      if (moment(cr.dob).format('MM/DD/YYYY') === 'Invalid date') {
        setAlertType({
          type: 'error',
          message: 'Please provide valid date of birth of your children',
        });
        return false;
      }
      return true;
    });

    if (validChild.length !== childrenRowData?.length) {
      return;
    }

    mutate({ body });

  };

  const handleDeleteRow = function ({ email, row, id }) {
    if (row === 'Children') {
      const updatedRow = childrenRowData.filter((c) => c.id !== id);
      setChildrenRowData(updatedRow);
    }
  };

  const updateChild = function (data, id) {
    setChildrenRowData((prev) => {
      const newData = prev.map((p) => {
        if (p.id === id)
          return { name: data.name, gender: data.gender, dob: data.dob, id };
        return p;
      });
      return newData;
    });
  };

  return (
    <>
      <Box className={classes.root}>
        {alertType && (
          <AlertReact
            removeAlertType={removeAlertType}
            type={alertType.type}
            message={alertType.message}
            alertKey={alertKey}
          />
        )}
        <Box className={classes.mainWrapper}>
          <img className={classes.logo} src={logo} alt="The Last Center Logo" />
          <Typography className={classes.header}>Enrol Yourself</Typography>
          <Box className={classes.createEnrollmentWrapper}>
            <form className={classes.form}>
              <Box>
                <Box className={classes.formHeaderSection}>
                  {/*  PERSONAL INFORMATION*/}
                  <Box className={classes.HeadingAndElementBox}>
                    <Box className="formIconAndHeader">
                      <PersonOutlineOutlinedIcon />
                      <Typography>Personal Information</Typography>
                    </Box>

                    {/* name */}
                    <Box className={classes.formElementBox}>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="fullNameField">Name</FormLabel>
                        <Typography
                          variant={'body2'}
                          className={classes.borderClass}
                        >
                          {name}
                        </Typography>
                      </FormControl>
                    </Box>

                    {/* phone number and email address */}
                    <Box className={classes.formElementBox}>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="phoneNumberField">
                          Phone Number
                        </FormLabel>
                        <Typography
                          variant={'body2'}
                          className={classes.borderClass}
                        >
                          {phone}
                        </Typography>
                      </FormControl>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="emailField">
                          Email Address
                        </FormLabel>
                        <Typography
                          variant={'body2'}
                          className={classes.borderClass}
                        >
                          {email}
                        </Typography>
                      </FormControl>
                    </Box>

                    {/* gender and DOB */}
                    <Box className={classes.formElementBox}>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                        <Select
                          id="genderSelectBox"
                          name="gender"
                          IconComponent={ExpandMoreOutlinedIcon}
                          className={classes.selectBox}
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
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
                      <FormControl className={classes.formControl} required>
                        <FormLabel>Date of Birth</FormLabel>
                        <LocalizationProvider
                          dateAdapter={AdapterDayjs}
                          className={classes.datepicker}
                        >
                          <DatePicker
                            defaultValue={dayjs(new Date('10 jan 2001'))}
                            name="dob"
                            disableFuture={true}
                            value={dayjs(dob)}
                            onChange={(date) => setDob(new Date(date))}
                            format="DD/MM/YYYY"
                          />
                        </LocalizationProvider>
                      </FormControl>
                    </Box>
                  </Box>
                  {/* ADDRESS INFORMATION */}
                  <Box className={classes.HeadingAndElementBox}>
                    <Box className="formIconAndHeader">
                      <HomeOutlinedIcon />
                      <Typography>Address Information</Typography>
                    </Box>

                    {/* location */}
                    <FormControl className={classes.formControl} required>
                      <FormLabel htmlFor="locationField">Address</FormLabel>
                      <TextField
                        id="locationField"
                        placeholder="Enter Your Address"
                        name="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>
                    {/* postal code, city and state */}
                    <Box className={classes.formElementBox}>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="postalCodeField">
                          Postal Code
                        </FormLabel>
                        <TextField
                          id="postalCodeField"
                          placeholder="Enter Your Postal Code"
                          name="pincode"
                          type="number"
                          value={pincode}
                          onChange={(e) => setPincode(e.target.value)}
                          onFocus={(e) => setCityFocus(true)}
                        />
                      </FormControl>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="citySelectBox">City</FormLabel>
                        {!cities && (
                          <TextField
                            id="citySelectBox"
                            placeholder="Enter Your City"
                            name="city"
                            value={city}
                            onChange={(e) => {
                              setCity(e.target.value);
                            }}
                            onFocus={(e) => setCityFocus(true)}
                            required
                          />
                        )}
                        {cities && (
                          <Select
                            id="citySelectBox"
                            name="city"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            onFocus={(e) => setCityFocus(true)}
                            IconComponent={ExpandMoreOutlinedIcon}
                            className={classes.selectBox}
                            MenuProps={{
                              classes: {
                                paper: classes.selectDropdownMenu,
                              },
                            }}
                          >
                            {cities.map((city, index) => (
                              <MenuItem value={city?.city} key={city?.city}>
                                {city?.city}
                              </MenuItem>
                            ))}
                          </Select>
                        )}
                      </FormControl>
                      <FormControl className={classes.formControl} required>
                        <FormLabel htmlFor="stateField">State</FormLabel>
                        <TextField
                          id="stateField"
                          placeholder="Enter Your State"
                          name="state"
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        />
                      </FormControl>
                    </Box>
                  </Box>
                </Box>
                <Box className={classes.HeaderAndAccordionBox}>
                  <Box className={classes.HeaderAndBtn}>
                    <Typography>Children Information</Typography>
                    <Button
                      className={classes.addBtn}
                      disableRipple
                      onClick={handleOpenChild}
                    >
                      Add
                    </Button>
                  </Box>
                  {openChild && (
                    <AddChildPopup
                      openChild={openChild}
                      handleCloseOpenChild={handleCloseOpenChild}
                      closePopupAndSetRows={closePopupAndSetRows}
                    />
                  )}

                  <Box className={classes.AccordionContainer}>
                    <AccordionTable
                      rowData={childrenRowData}
                      headingName={'Children'}
                      handleDeleteRow={handleDeleteRow}
                      isView={false}
                      updateChild={updateChild}
                    />
                  </Box>
                </Box>
              </Box>
              <Box className={classes.signUpBtn_loginLink}>
                <Button
                  disableRipple
                  className={classes.signUpBtn}
                  type="submit"
                  onClick={mutateEnrollmentHandler}
                >
                  {isPendingMutation ? 'loading...' : 'Enrol Yourself'}
                </Button>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default EnrollmentsDetails;
