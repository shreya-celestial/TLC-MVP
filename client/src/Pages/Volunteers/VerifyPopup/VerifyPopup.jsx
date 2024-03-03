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

function VerifyPopup() {
  const classes = useStyles();
  const [open, SetOpen] = useState(true);

  return (
    <Dialog open={open} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Verify Status</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => SetOpen(false)}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent className={classes.DiaogContent}>
        <Box className={classes.formElementBox}>
          {/* role */}
          <FormControl className={classes.formControl}>
            <FormLabel htmlFor="roleSelectBox">Select Role</FormLabel>
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
        <Button className="rejectBtn" disableRipple>
          Reject
        </Button>
        <Button className="verifyBtn" disableRipple>
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default VerifyPopup;
