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
import AlertReact from '../../../Components/Alert/AlertReact';
import { inviteVolunteer } from '../../../apis/volunteers';
import { useMutation } from '@tanstack/react-query';
import { validateInvite } from '../../../utils/utils';

function InvitePopup({ hideInviteModal, hideInviteModalAndShowSuccess }) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);

  const [roleDropdown, setRoleDropdown] = useState('volunteer');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: inviteVolunteer,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        hideInviteModalAndShowSuccess();
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

  const sendInvite = function (e) {
    e.preventDefault();
    const body = {
      isAdmin: roleDropdown === 'admin' ? 'true' : 'false',
      name: fullName,
      email,
    };

    const isValid = validateInvite(body);
    if (isValid.type) return setAlertType(isValid);

    mutate(body);
  };

  return (
    <>
      <Dialog open={open} className={classes.Dialog}>
        <DialogTitle className={classes.TitleAndClose}>
          <Typography>Invite Volunteer</Typography>
          <IconButton
            className={classes.CloseIcon}
            disableRipple
            onClick={() => {
              SetOpen(false);
              hideInviteModal();
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
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
          {/* name */}
          <Box className={classes.formElementBox}>
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="fullNameField">Name</FormLabel>
              <TextField
                id="fullNameField"
                placeholder="Enter Name"
                name="name"
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                }}
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
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>
            {/* role */}
            <FormControl className={classes.formControl}>
              <FormLabel htmlFor="roleSelectBox">Role</FormLabel>
              <Select
                id="roleSelectBox"
                name="role"
                IconComponent={ExpandMoreOutlinedIcon}
                className={classes.selectBox}
                MenuProps={{
                  classes: {
                    paper: classes.selectDropdownMenu,
                  },
                }}
                value={roleDropdown}
                onChange={(e) => {
                  setRoleDropdown(e.target.value);
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
            onClick={() => {
              hideInviteModal();
              SetOpen(false);
            }}
          >
            Cancel
          </Button>
          <Button className="inviteBtn" disableRipple onClick={sendInvite}>
            {isPending ? 'Loading...' : 'Send Invitation'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default InvitePopup;
