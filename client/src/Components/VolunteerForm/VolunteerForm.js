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
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './VolunteerForm.styles';
import { getLocationData } from '../../apis/global';

import { getCookie } from '../../utils/utils';


function VolunteerForm({ submit, isRole = false, isPending }) {

  const currentYear = new Date().getFullYear();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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


  const email = getCookie('email')?.replace('%40', '@');


  useEffect(() => {
    if (cities) {
      const data = cities.find((pincodeCity) => pincodeCity.city === city);
      setState(data.state);
    }
  }, [city]);

  return (
    <form className={classes.form} onSubmit={submit}>
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
            <TextField
              id="fullNameField"
              placeholder="Enter Your Full Name"
              required
              name="name"
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

              className={email ? classes.disabled : false}

            />
          </FormControl>
        </Box>

        {/*password and  confirm password */}

        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="passwordField">Password</FormLabel>
            <TextField
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter Your Password"
              id="passwordField"
              name="password"
              required
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

          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="confirmPasswordField">
              Confirm Password
            </FormLabel>
            <TextField
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Enter Your Confirm Password"
              id="confirmPasswordField"
              name="confirmPassword"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      disableRipple
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
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
        {/* phone number and  date picker-DOB */}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl}>

            <FormLabel htmlFor="phoneNumberField">Phone Number</FormLabel>
            <TextField
              id="phoneNumberField"
              placeholder="Enter Your Phone Number"
              required
              name="phone"
            />

          </FormControl>
          <FormControl className={classes.formControl}>
            <FormLabel>Date of Birth</FormLabel>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className={classes.datepicker}
            >
              <DatePicker name="dob" required />
            </LocalizationProvider>
          </FormControl>
        </Box>

        {/* role and year of joining */}
        <Box className={classes.formElementBox}>
          {isRole && (
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
              <Select
                id="roleSelectBox"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                name="role"
                required
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
          )}

          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="yearSelectBox">Year Of Joining TLC</FormLabel>
            <Select
              id="yearSelectBox"
              name="yearOfJoining"
              value={yearOfJoining}
              onChange={(e) => setYearOfJoining(e.target.value)}
              required
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

          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="genderSelectBox">Gender</FormLabel>
            <Select
              id="genderSelectBox"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              name="gender"
              required
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
      </Box>
      {/*------ address section------ */}
      <Box className={classes.formHeaderSection}>
        <Box className="formIconAndHeader">
          <HomeOutlinedIcon />
          <Typography>Address Information</Typography>
        </Box>
        {/* location */}
        <FormControl className={classes.formControl}>
          <FormLabel htmlFor="locationField">Address</FormLabel>
          <TextField
            id="locationField"
            placeholder="Enter Your Address"
            name="address"
            required
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
            value={pincode}
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
              value={state}
              onChange={(e) => {
                setState(e.target.value);
              }}
              required
            />
          </FormControl>
        </Box>
      </Box>
      <Box className={classes.signUpBtn_loginLink}>
        <Button disableRipple className={classes.signUpBtn} type="submit">
          {isPending ? 'loading...' : 'Sign up'}
        </Button>
      </Box>
    </form>
  );
}

export default VolunteerForm;
