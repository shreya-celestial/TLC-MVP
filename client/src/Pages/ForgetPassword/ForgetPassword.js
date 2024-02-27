import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Link, TextField, Typography } from "@mui/material";
import { useStyles } from "./ForgetPassword.styles";

function ForgetPassword() {
  const classes = useStyles();
  const [isFound, setIsFound] = useState(false);
  return (
    <Box className={classes.root}>
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src="images/tlc_logo.png" alt="The Last Center Logo" />
        <Typography className={classes.header}>Forgot Password</Typography>

        <form className={classes.form}>
          <Box className={classes.FormElementInBox}>
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="emailField">Email Address</FormLabel>
              <TextField type="email" id="emailField" placeholder="Enter Your Email Address" />
            </FormControl>
            {!isFound && <Typography className="emailNotFound">We cannot find your email</Typography>}
          </Box>

          <Box className={classes.FormElementInBox}>
            <Button type="submit" disableRipple className={classes.verifyBtn}>
              Verify
            </Button>
            <Link href="#" className="backToLogin">
              Back to Login
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ForgetPassword;
