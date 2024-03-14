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
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import { useStyles } from './VerifyPopup.styles';
import { useMutation } from '@tanstack/react-query';
import { deleteVolunteers, verifyVolunteer } from '../../../apis/volunteers';
import AlertReact from '../../../Components/Alert/AlertReact';

function VerifyPopup({
  hideVerifyStatus,
  selectedUser,
  hideVerifyModalAndShowSuccess,
  hideVerifyModalAndShowDelete,
}) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);
  const [role, setRole] = useState('volunteer');
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate: verifyMutation, isPending } = useMutation({
    mutationFn: verifyVolunteer,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        hideVerifyModalAndShowSuccess();
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const { mutate: deleteMutation, isPending: isPendingDelete } = useMutation({
    mutationFn: deleteVolunteers,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        hideVerifyModalAndShowDelete();
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const verifyUser = function () {
    verifyMutation({
      isAdmin: role === 'admin' ? 'true' : 'false',
      email: selectedUser,
    });
  };

  const deleteUser = function () {
    deleteMutation([selectedUser]);
  };

  return (
    <Dialog open={open} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Verify Status</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => {
            SetOpen(false);
            hideVerifyStatus();
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
        <Box className={classes.formElementBox}>
          {/* role */}
          <FormControl className={classes.formControl} required>
            <FormLabel htmlFor="roleSelectBox">Select Role</FormLabel>
            <Select
              id="roleSelectBox"
              name="role"
              value={role}
              IconComponent={ExpandMoreOutlinedIcon}
              className={classes.selectBox}
              MenuProps={{
                classes: {
                  paper: classes.selectDropdownMenu,
                },
              }}
              onChange={(e) => setRole(e.target.value)}
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
            SetOpen(false);
            hideVerifyStatus();
          }}
        >
          Cancel
        </Button>
        <Button className="rejectBtn" disableRipple onClick={deleteUser}>
          {isPendingDelete ? 'Loading...' : 'Reject'}
        </Button>
        <Button className="verifyBtn" disableRipple onClick={verifyUser}>
          {isPending ? 'Loading...' : 'Verify'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VerifyPopup;
