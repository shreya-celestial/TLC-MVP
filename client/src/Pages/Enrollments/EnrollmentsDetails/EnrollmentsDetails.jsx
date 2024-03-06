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
} from '@mui/material';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import PageHeader from '../../../Components/PageHeader/PageHeader';
import { useStyles } from './EnrollmentsDetails.styles';
import AddChildPopup from '../AddChildPopup/AddChildPopup';
import AccordionTable from '../../../Components/AccordionTable/AccordionTable';

import {
  ChildRowData,
  ChildrenColDef,
  enrollPageWorkshopColDEf,
  enrollPageWorkshopRowData,
} from './ChildrenDummyData';
import { DeleteEditButtonCell } from '../../../Components/DeleteEditButtonCell/DeleteEditButtonCell';

const city = ['Bangalore', 'Dehradun', 'Noida', 'Gurgaon'];

function EnrollmentsDetails() {
  const isView = false;
  const classes = useStyles();
  const [openChild, setOpenChild] = useState(false);
  const handleOpenChild = () => {
    setOpenChild(true);
  };
  const handleCloseOpenChild = () => {
    setOpenChild(false);
  };
  const dummyCustomChildColDef = [
    ...ChildrenColDef,
    !isView && {
      field: 'Actions',
      cellRenderer: DeleteEditButtonCell,
    },
  ].filter(Boolean);

  return (
    <Box className={classes.root}>
      <Box className={classes.HeaderMainContent}>
        <PageHeader
          currentPage={'Create Enrollment'}
          prevPage={'Enrollments'}
        />
        <Box className={classes.mainContent}>
          {/*  PERSONAL INFORMATION*/}
          <Box className={classes.HeadingAndElementBox}>
            <Typography className="heading">Personal Information</Typography>

            {/* name */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="fullNameField">Name</FormLabel>
                <TextField
                  id="fullNameField"
                  placeholder="Enter Your Full Name"
                  name="name"
                  disabled={isView}
                />
              </FormControl>
            </Box>

            {/* gender and DOB */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
                <Select
                  id="genderSelectBox"
                  name="gender"
                  value="male"
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  disabled={isView}
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
              <FormControl className={classes.formControl}>
                <FormLabel>Date of Birth</FormLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className={classes.datepicker}
                >
                  <DatePicker name="dob" disabled={isView} />
                </LocalizationProvider>
              </FormControl>
            </Box>
            {/* phone number and email address */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
                <TextField
                  id="phoneNumberField"
                  placeholder="Enter Your Phone Number"
                  name="phone"
                  disabled={isView}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="emailField">Email Address</FormLabel>
                <TextField
                  type="email"
                  id="emailField"
                  placeholder="Enter Your Email Address"
                  name="email"
                  disabled={isView}
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
                disabled={isView}
              />
            </FormControl>
            {/* postal code, city and state */}
            <Box className={classes.formElementBox}>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
                <TextField
                  id="postalCodeField"
                  placeholder="Enter Your Postal Code"
                  name="pincode"
                  type="number"
                  disabled={isView}
                />
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="citySelectBox">City</FormLabel>
                <Select
                  id="citySelectBox"
                  value="Bangalore"
                  name="city"
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  disabled={isView}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  {city.map((city, index) => (
                    <MenuItem key={index} value={city}>
                      {city}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
                <FormLabel htmlFor="stateField">State</FormLabel>
                <TextField
                  id="stateField"
                  placeholder="Enter Your State"
                  name="state"
                  disabled={isView}
                />
              </FormControl>
            </Box>
          </Box>
        </Box>
        <Box className={classes.HeaderAndAccordionBox}>
          <Box className={classes.HeaderAndBtn}>
            <Typography>Childrens Information</Typography>
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
          <AddChildPopup
            openChild={openChild}
            handleCloseOpenChild={handleCloseOpenChild}
          />

          <Box className={classes.AccordionContainer}>
            <AccordionTable
              columnDefs={dummyCustomChildColDef}
              rowData={ChildRowData}
              headingName={'Childrens'}
            />
          </Box>
        </Box>
        <Box className={classes.workshopHistory}>
          <Typography className="historyHeading">Workshop History</Typography>
          <AccordionTable
            columnDefs={enrollPageWorkshopColDEf}
            rowData={enrollPageWorkshopRowData}
            headingName={'workshops'}
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

export default EnrollmentsDetails;
