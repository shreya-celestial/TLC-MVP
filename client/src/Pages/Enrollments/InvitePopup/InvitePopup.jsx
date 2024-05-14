import React, { useContext, useState } from 'react';
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
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useStyles } from './InvitePopup.styles';
import AlertReact from '../../../Components/Alert/AlertReact';
import { useMutation } from '@tanstack/react-query';
import { validateInvite } from '../../../utils/utils';
import UserContext from '../../../store/userContext';
import { inviteEnrollment } from '../../../apis/enrollments';

function InvitePopup({ hideInviteModal, hideInviteModalAndShowSuccess }) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { user } = useContext(UserContext);
  const { mutate, isPending } = useMutation({
    mutationFn: inviteEnrollment,
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
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const sendInvite = function (e) {
    e.preventDefault();
    const body = {
      mobile: phone.trim(),
      name: fullName.trim(),
      email,
      invitedBy: user?.email
    };
    
    const isValid = validateInvite(body);
    if (isValid.type) return setAlertType(isValid);
    mutate({ data: body, key: user?.key });
  };

  return (
    <>
      <Dialog open={open} className={classes.Dialog}>
        <DialogTitle className={classes.TitleAndClose}>
          <Typography>Invite Enrollment</Typography>
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
            <FormControl className={classes.formControl} required>
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
            <FormControl className={classes.formControl} required>
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
            {/* phone number */}
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="phoneField">Phone</FormLabel>
              <TextField
                type="number"
                id="phoneField"
                placeholder="Enter Phone Number"
                name="phone"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
              />
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
