import React, { useState } from "react";
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
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import { useStyles } from "./VolunteerForm.styles";

function VolunteerForm() {
  const [showPassword, setShowPassword] = useState(false);
  const classes = useStyles();
  const years = [];
  const currentYear = new Date().getFullYear();
  for (let year = "2000"; year <= currentYear; year++) {
    years.push(year);
  }
  return (
    <form className={classes.form}>
      {/*------personal information section------ */}
      <Box className={classes.formHeaderSection}>
        <Box className="formIconAndHeader">
          <PersonOutlineOutlinedIcon />
          <Typography>Personal Information</Typography>
        </Box>
        {/* name and email address */}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="fullNameField">Name</FormLabel>
            <TextField id="fullNameField" placeholder="Enter Your Full Name" />
          </FormControl>
          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="emailField">Email Address</FormLabel>
            <TextField type="email" id="emailField" placeholder="Enter Your Email Address" />
          </FormControl>
        </Box>

        {/*password and  phone number */}

        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="passwordField">Password</FormLabel>
            <TextField
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              id="passwordField"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton disableRipple onClick={() => setShowPassword(!showPassword)}>
                      {showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
            <TextField id="phoneNumberField" placeholder="Enter Your Phone Number" />
          </FormControl>
        </Box>
        {/* date picker-DOB and Gender */}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl}>
            <FormLabel>Date of Birth</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs} className={classes.datepicker}>
              <DatePicker format="DD-MM-YY" />
            </LocalizationProvider>
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
            <Select
              id="genderSelectBox"
              value="male"
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
              value="volunteer"
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
            <FormLabel htmlFor="yearSelectBox">Year Of Joining TLC</FormLabel>
            <Select
              id="yearSelectBox"
              value="2024"
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
      {/*------ address section------ */}
      <Box className={classes.formHeaderSection}>
        <Box className="formIconAndHeader">
          <HomeOutlinedIcon />
          <Typography>Address Information</Typography>
        </Box>
        {/* city */}
        <FormControl className={classes.formControl}>
          <FormLabel htmlFor="citySelectBox">City</FormLabel>
          <Select
            id="citySelectBox"
            value="bangalore"
            IconComponent={ExpandMoreOutlinedIcon}
            className={classes.selectBox}
            MenuProps={{
              classes: {
                paper: classes.selectDropdownMenu,
              },
            }}
          >
            <MenuItem value="bangalore">Bangalore</MenuItem>
            <MenuItem value="mumbai">Mumbai</MenuItem>
            <MenuItem value="haridwar">Haridwar</MenuItem>
            <MenuItem value="pune">Pune</MenuItem>
          </Select>
        </FormControl>
        {/* state and postal code */}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="stateField">State</FormLabel>
            <TextField id="stateField" placeholder="Enter Your State" />
          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="postalCodeField">Postal Code</FormLabel>
            <TextField id="postalCodeField" placeholder="Enter Your Postal Code" />
          </FormControl>
        </Box>
      </Box>
    </form>
  );
}

export default VolunteerForm;
