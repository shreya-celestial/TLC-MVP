import React from "react";
import { useStyles } from "./Signup.styles";
import { Box, Button, Link, Typography } from "@mui/material";
import VolunteerForm from "../../Components/VolunteerForm/VolunteerForm";

function Signup() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src="images/tlc_logo.png" alt="The Last Center Logo" />
        <Typography className={classes.header}>Create an account</Typography>
        <Box className={classes.signupWrapper}>
          <VolunteerForm />
          <Box className={classes.signUpBtn_loginLink}>
            <Button disableRipple className={classes.signUpBtn}>
              Sign up
            </Button>
            <Typography className={classes.loginLink}>
              Already have an account?
              <Link href="#" className="login">
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
