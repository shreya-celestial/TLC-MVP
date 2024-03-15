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
import PageHeader from '../../../Components/PageHeader/PageHeader';
import { useStyles } from './EnrollmentsDetails.styles';
import AddChildPopup from '../AddChildPopup/AddChildPopup';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';
import { useParams, useNavigate } from 'react-router-dom';

import { enrollPageWorkshopColDEf } from '../coldefs/coldefs';
import { getLocationData } from '../../../apis/global';
import { useReactQuery } from '../../../hooks/useReactQuery';
import { getEnrollment } from '../../../apis/enrollments';
import {
  fetchRowDataEnrollment,
  validateEnrollment,
} from '../../../utils/utils';
import dayjs from 'dayjs';
import AlertReact from '../../../Components/Alert/AlertReact';
import { useMutation } from '@tanstack/react-query';
import { createEnrollment, updateEnrollment } from '../../../apis/enrollments';
import UserContext from '../../../store/userContext';

const city = ['Bangalore', 'Dehradun', 'Noida', 'Gurgaon'];

function EnrollmentsDetails() {
  const { type, id } = useParams();
  const nav = useNavigate();
  const classes = useStyles();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [cities, setCities] = useState(null);
  const [city, setCity] = useState(null);
  const [state, setState] = useState('');

  const [childrenRowData, setChildrenRowData] = useState([]);
  const [workshopsRowData, setWorkshopRowData] = useState([]);

  const [isView, setIsView] = useState(type === 'view' ? true : false);
  const [viewType, setViewType] = useState(type);

  useEffect(() => {
    if (viewType !== 'view') {
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
    }
  }, [pincode]);

  useEffect(() => {
    if (cities && viewType !== 'view') {
      const data = cities.find((pincodeCity) => pincodeCity.city === city);
      setState(data.state);
    }
  }, [city]);

  const { data, isPending, isError } = useReactQuery([id], getEnrollment, {
    enabled: viewType !== 'create',
  });

  const enrollment = data?.data;

  useEffect(() => {
    setName(enrollment?.name || '');
    setGender(enrollment?.gender || 'male');
    setDob(enrollment?.dob || '');
    setPhone(enrollment?.mobile_number || '');
    setEmail(enrollment?.email || '');
    setAddress(enrollment?.address || '');
    setPincode(enrollment?.pincode || '');
    setCity(enrollment?.city || '');
    setState(enrollment?.state || '');

    if (viewType !== 'create') {
      const { fetchWorkshops } = fetchRowDataEnrollment(enrollment);
      setWorkshopRowData(fetchWorkshops || []);
      setChildrenRowData(enrollment?.children || []);
    }
  }, [enrollment, viewType, isView]);

  const { user } = useContext(UserContext)
  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: type === 'create' ? createEnrollment : updateEnrollment,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        if (viewType === 'create') nav('/enrollments/success');
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

  useEffect(() => {
    if (viewType !== 'create' && viewType !== 'edit' && viewType !== 'view') {
      nav('/enrollments');
    }
    if (viewType === 'view') {
      setIsView(true);
    }
  }, [viewType]);

  if (viewType !== 'create' && viewType !== 'edit' && viewType !== 'view') {
    return;
  }

  const editHandler = function () {
    setIsView(false);
    setViewType('edit');
  };

  const mutateEnrollmentHandler = function (type) {
    setAlertKey((prev) => !prev);

    const body = {
      name,
      email,
      mobile_number: phone,
      dob: new Date(dob).toLocaleDateString(),
      gender,
      address,
      city,
      state,
      pincode,
      children: childrenRowData.map((cr) => {
        return {
          name: cr.name,
          gender: cr.gender,
          dob: cr.dob,
        };
      }),
    };

    const isValid = validateEnrollment(body);
    if (isValid.type) return setAlertType(isValid);

    mutate({ body, id, key: user?.key });
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
              message={alertType.message}
              alertKey={alertKey}
            />
          )}
          <Box className={classes.HeaderMainContent}>
            <PageHeader
              currentPage={
                viewType === 'view'
                  ? 'View Enrollment'
                  : viewType === 'edit'
                    ? 'Edit Enrollment'
                    : 'Create Enrollment'
              }
              prevPage={'Enrollments'}
              path={'enrollments'}
            />
            <Box className={classes.mainContent}>
              {/*  PERSONAL INFORMATION*/}
              <Box className={classes.HeadingAndElementBox}>
                <Typography className="heading">
                  Personal Information
                </Typography>

                {/* name */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl} required>
                    <FormLabel htmlFor="fullNameField">Name</FormLabel>
                    <TextField
                      id="fullNameField"
                      placeholder="Enter Your Full Name"
                      name="name"
                      disabled={isView}
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
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
                      disabled={isView}
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
                        name="dob"
                        disabled={isView}
                        disableFuture={true}
                        value={dayjs(dob)}
                        onChange={(date) => setDob(new Date(date))}
                      />
                    </LocalizationProvider>
                  </FormControl>
                </Box>
                {/* phone number and email address */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl} required>
                    <FormLabel htmlFor="phoneNumberField">
                      Phone Number
                    </FormLabel>
                    <TextField
                      id="phoneNumberField"
                      placeholder="Enter Your Phone Number"
                      name="phone"
                      disabled={isView}
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </FormControl>
                  <FormControl className={classes.formControl} required>
                    <FormLabel htmlFor="emailField">Email Address</FormLabel>
                    <TextField
                      type="email"
                      id="emailField"
                      placeholder="Enter Your Email Address"
                      name="email"
                      disabled={isView}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                    disabled={isView}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </FormControl>
                {/* postal code, city and state */}
                <Box className={classes.formElementBox}>
                  <FormControl className={classes.formControl} required>
                    <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
                    <TextField
                      id="postalCodeField"
                      placeholder="Enter Your Postal Code"
                      name="pincode"
                      type="number"
                      value={pincode}
                      onChange={(e) => setPincode(e.target.value)}
                      disabled={isView}
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
                        disabled={isView}
                        required
                      />
                    )}
                    {cities && (
                      <Select
                        id="citySelectBox"
                        name="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        IconComponent={ExpandMoreOutlinedIcon}
                        className={classes.selectBox}
                        disabled={isView}
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
                      disabled={isView}
                    />
                  </FormControl>
                </Box>
              </Box>
            </Box>
            <Box className={classes.HeaderAndAccordionBox}>
              <Box className={classes.HeaderAndBtn}>
                <Typography>Children Information</Typography>
                {!isView && (
                  <Button
                    className={classes.addBtn}
                    disableRipple
                    onClick={handleOpenChild}
                  >
                    Add
                  </Button>
                )}
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
                  isView={isView}
                  updateChild={updateChild}
                />
              </Box>
            </Box>
            <Box className={classes.workshopHistory}>
              <Typography className="historyHeading">
                Workshop History
              </Typography>
              <AccordionTable
                columnDefs={enrollPageWorkshopColDEf}
                rowData={workshopsRowData}
                headingName={'workshops'}
              />
            </Box>
          </Box>

          {/* action bar  */}
          <Box className={classes.actionBar}>
            <Button
              disableTouchRipple
              className="cancelBtn"
              onClick={() => nav('/enrollments')}
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
                onClick={() => mutateEnrollmentHandler('edit')}
              >
                {isPendingMutation ? 'Loading...' : 'Save'}
              </Button>
            ) : (
              <Button
                disableTouchRipple
                className="saveBtn"
                onClick={() => mutateEnrollmentHandler('create')}
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

export default EnrollmentsDetails;
