import React, { useState } from 'react';
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
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './InvitePopup.styles';

function InvitePopup() {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);

  return (
    <Dialog open={open} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Invite Volunteer</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => SetOpen(false)}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DiaogContent}>
        {/* name */}
        <Box className={classes.formElementBox}>
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="fullNameField">Name</FormLabel>
            <TextField
              id="fullNameField"
              placeholder="Enter Name"
              name="name"
            />
          </FormControl>
        </Box>
        <Box className={classes.formElementBox}>
        {/* email address */}
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="emailField">Email</FormLabel>
            <TextField
              type="email"
              id="emailField"
              placeholder="Enter Email Address"
              name="email"
            />
          </FormControl>
          {/* role */}
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
            <Select
              id="roleSelectBox"
              name="role"
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
        </Box>
      </DialogContent>
      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => SetOpen(false)}
        >
          Cancel
        </Button>
        <Button className="inviteBtn" disableRipple>
          Send Invitation
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default InvitePopup;
