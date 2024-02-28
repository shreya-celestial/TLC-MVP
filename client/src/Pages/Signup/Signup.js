import React from "react";
import { useStyles } from "./Signup.styles";
import { Link } from 'react-router-dom'
import { Box, Typography } from "@mui/material";
import VolunteerForm from "../../Components/VolunteerForm/VolunteerForm";
import { signup } from "../../apis/user";

function Signup() {
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!e.target.elements.dob.value) {
      alert('Please enter your Date of birth')
    }
    const body = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      name: e.target.elements.name.value,
      dob: e.target.elements.dob.value,
      gender: e.target.elements.gender.value,
      phoneNumber: e.target.elements.phone.value,
      yearOfJoining: +(e.target.elements.yearOfJoining.value),
      location: e.target.elements.address.value,
      city: e.target.elements.city.value,
      state: e.target.elements.state.value,
      pincode: +(e.target.elements.pincode.value)
    }
    const data = await signup(body);
    if (data?.status === 'success') {
      alert('Please check your email for verification');
      return
    }
    alert(data?.message)
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src="images/tlc_logo.png" alt="The Last Center Logo" />
        <Typography className={classes.header}>Create an account</Typography>
        <Box className={classes.signupWrapper}>
          <VolunteerForm submit={handleSubmit} />
          <Box className={classes.signUpBtn_loginLink}>
            <Typography className={classes.loginLink}>
              Already have an account?
              <Link to={'/'} className="login">
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
