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

function DeletePopup() {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);
  const data = [
    'Aman Gupta',
    'Aprit seth',
    'Richa Joshi',
    'xyx',
    'pqr',
    'pqr',
    'pqr',
  ];
  return (
    <Dialog open={open} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Confirm Delete</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => SetOpen(false)}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DiaogContent}>
        <DeleteIcon />
        <DialogContentText className="DialogText">
          Are you sure you want to delete
          {data.map((item, index) => (
            <span key={index}> '{item}', </span>
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
        <Button className="deleteBtn" disableRipple>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeletePopup;
