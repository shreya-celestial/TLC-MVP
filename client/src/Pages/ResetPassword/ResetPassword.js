import React, { useState } from "react";
import { useStyles } from "./ResetPassword.styles";
import { Box, Button, FormControl, FormLabel, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMatch, setIsMatch] = useState(false);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src="images/tlc_logo.png" alt="The Last Center Logo" />
        <Typography className={classes.header}>Reset Your Password</Typography>

        <form className={classes.form}>
          <Box className={classes.FormElementInBox}>
            <FormControl required className={classes.formControl}>
              <FormLabel htmlFor="newpasswordField">New Password</FormLabel>
              <TextField
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                id="newpasswordField"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton disableRipple onClick={() => setShowNewPassword(!showNewPassword)}>
                        {showNewPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <FormLabel htmlFor="confirmPasswordField">Password</FormLabel>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                id="confirmPasswordField"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton disableRipple onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                        {showConfirmPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            {!isMatch && <Typography className="passwordNotMatch">Password do not match</Typography>}
          </Box>

          <Button type="submit" disableRipple className={classes.resetBtn}>
            Reset Password
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ResetPassword;
