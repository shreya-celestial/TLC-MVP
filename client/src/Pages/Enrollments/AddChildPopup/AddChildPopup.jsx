import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './AddChildPopup.styles';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { ChildTheme } from './PopupTheme';
import AlertReact from '../../../Components/Alert/AlertReact';

function AddChildPopup({
  openChild,
  handleCloseOpenChild,
  closePopupAndSetRows,
  childData,
  updateChildAndClosePopup,
}) {
  const classes = useStyles();

  const [name, setName] = useState();
  const [gender, setGender] = useState('male');
  const [dob, setDob] = useState('');

  useEffect(() => {
    if (childData) {
      setName(childData.name);
      setGender(childData.gender);
      setDob(childData.dob);
    }
  }, [childData]);

  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const updateChild = function (data, id) {
    if (!data.name || !data.dob || !data.gender) {
      return setAlertType({
        type: 'error',
        message: 'Please provide all details',
      });
    }
    updateChildAndClosePopup(data, id);
  };

  const createChild = function (data) {
    if (!data.name || !data.dob || !data.gender) {
      return setAlertType({
        type: 'error',
        message: 'Please provide all details',
      });
    }
    closePopupAndSetRows(data);
  };

  return (
    <Dialog open={openChild} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Children Information</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => handleCloseOpenChild()}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      {/* name */}
      <DialogContent className={classes.DiaogContent}>
        {alertType && (
          <AlertReact
            removeAlertType={removeAlertType}
            type={alertType.type}
            message={alertType.message}
            zIndex={999}
            componentType={'popup'}
          />
        )}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="fullNameField">Name</FormLabel>
            <TextField
              id="fullNameField"
              placeholder="Enter Name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
              value={gender}
              onChange={(e) => setGender(e.target.value)}
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
          <ThemeProvider theme={ChildTheme}>
            <FormControl className={classes.formControl}>
              <FormLabel>Date of Birth</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker
                  name="dateofbirth"
                  value={dob ? dayjs(dob) : ''}
                  onChange={(date) =>
                    setDob((new Date(date)).toLocaleDateString())
                  }
                />
              </LocalizationProvider>
            </FormControl>
          </ThemeProvider>
        </Box>
      </DialogContent>
      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => handleCloseOpenChild()}
        >
          Cancel
        </Button>
        <Button
          className="doneBtn"
          disableRipple
          onClick={() => {
            if (childData) {
              updateChild({ name, gender, dob }, childData.id);
            } else {
              createChild({
                name,
                gender,
                dob,
                id: Math.random(),
              });
            }
          }}
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddChildPopup;
