import React, { useState } from 'react';
import { useStyles } from './DeletePopup.styles';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { ReactComponent as DeleteIcon } from '../.././assets/Icons/DeleteIcon.svg';
import { useMutation } from '@tanstack/react-query';
import { deleteVolunteers } from '../../apis/volunteers';
import AlertReact from '../Alert/AlertReact';

function DeletePopup({
  selectedRows,
  hideDeleteModal,
  hideDeleteModalAndShowSuccess,
}) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);
  const [alertType, setAlertType] = useState();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: deleteVolunteers,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        console.log('not hiding delete and not showing succss');
        hideDeleteModalAndShowSuccess();
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

  const deleteVolunteer = function () {
    const emailsOfDeleteVolunteers = selectedRows.map(
      (selectedRow) => selectedRow.email
    );
    mutate(emailsOfDeleteVolunteers);
  };

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  return (
    <Dialog open={open} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Confirm Delete</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => {
            SetOpen(false);
            hideDeleteModal();
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
        <DeleteIcon />
        <DialogContentText className="DialogText">
          Are you sure you want to delete
          {selectedRows.map((item, index) => (
            <span key={index}> '{item.name}', </span>
          ))}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => SetOpen(false)}
        >
          Cancel
        </Button>
        <Button className="deleteBtn" disableRipple onClick={deleteVolunteer}>
          {isPending ? 'Loading...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePopup;
