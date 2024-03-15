import React, { useContext, useState } from 'react';
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
import { deleteWorkshops } from '../../apis/workshops';
import AlertReact from '../Alert/AlertReact';
import { deleteMeetings } from '../../apis/meetings';
import { deleteEnrollments } from '../../apis/enrollments';
import UserContext from '../../store/userContext';

function DeletePopup({
  selectedRows,
  hideDeleteModal,
  hideDeleteModalAndShowSuccess,
  type,
  updateSelectedRows,
}) {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);
  const [alertType, setAlertType] = useState();
  const { user } = useContext(UserContext)

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn:
      type === 'workshops'
        ? deleteWorkshops
        : type === 'meetings'
          ? deleteMeetings
          : type === 'enrollments'
            ? deleteEnrollments
            : deleteVolunteers,
    onSuccess: (data) => {
      if (data.status === 'error') {
        setAlertType({
          type: data.status,
          message: data.message,
        });
      } else {
        hideDeleteModalAndShowSuccess();
        updateSelectedRows([]);
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

  const deleteVolunteersHandler = function () {
    const emailsOfDeleteVolunteers = selectedRows.map(
      (selectedRow) => selectedRow.email
    );
    mutate({ data: emailsOfDeleteVolunteers, key: user?.key });
  };

  const deleteWorkshopsHandler = function () {
    const idsOfDeleteWorkshops = selectedRows.map(
      (selectedRow) => selectedRow.id
    );
    mutate({ data: idsOfDeleteWorkshops, key: user?.key });
  };

  const deleteMeetingsHandler = function () {
    const idsOfDeleteMeetings = selectedRows.map(
      (selectedRow) => selectedRow.id
    );
    mutate({ data: idsOfDeleteMeetings, key: user?.key });
  };

  const deleteEnrollmentsHandler = function () {
    const idsOfDeleteEnrollments = selectedRows.map(
      (selectedRow) => selectedRow.id
    );
    mutate({ data: idsOfDeleteEnrollments, key: user?.key });
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
            <span key={index}>
              {' '}
              '
              {type === 'workshops'
                ? item.types
                : type === 'meetings'
                  ? item.type
                  : type === 'enrollments'
                    ? item.name
                    : item.name}
              ',{' '}
            </span>
          ))}
          ?
        </DialogContentText>
      </DialogContent>
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => {
            hideDeleteModal();
            SetOpen(false);
          }}
        >
          Cancel
        </Button>
        <Button
          className="deleteBtn"
          disableRipple
          onClick={
            type === 'workshops'
              ? deleteWorkshopsHandler
              : type === 'meetings'
                ? deleteMeetingsHandler
                : type === 'enrollments'
                  ? deleteEnrollmentsHandler
                  : deleteVolunteersHandler
          }
        >
          {isPending ? 'Loading...' : 'Delete'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePopup;
