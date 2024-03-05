import React, { useState } from 'react';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useStyles } from './LeadVolunteerPopup.styles';
const VolunteersList = [
  { name: 'Vikas Kumar', email: 'vikas@gmail.com' },
  { name: 'Arpit Seth', email: 'arpitseth1@gmail.com' },
  { name: 'Rahul Kumar', email: 'rahul2003@gmail.com' },
  { name: 'Charu Sharma', email: 'charusharma@gmail.com' },
  { name: 'Chirag Sen', email: 'chiragsen@gmail.com' },
  { name: 'shubham gaur', email: 'shubhamgaur@gmail.com' },
];

function LeadVolunteerPopup({ openLeadPopup, closeLeadPopup }) {
  const classes = useStyles();

  return (
    <Dialog open={openLeadPopup} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Add Volunteers and Lead Volunteers</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => closeLeadPopup()}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.DiaogContent}>
        {/* autocomplete  for showing list of volunteers*/}

        <FormControl className={classes.formControl}>
          <FormLabel>Search Volunteers & Lead Volunteers</FormLabel>
          <Autocomplete
            options={VolunteersList}
            getOptionLabel={(option) => `${option.name} (${option.email})`}
            onChange={(e, value) => console.log(value)}
            className={classes.autocomplete}
            renderInput={(params) => (
              <TextField
                className={classes.autocompleteTextField}
                placeholder="Search to add"
                {...params}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <InputAdornment position="start">
                        <SearchOutlinedIcon />
                      </InputAdornment>
                      {params.InputProps.startAdornment}
                    </>
                  ),
                }}
              />
            )}
            renderTags={(value, getTagProps) =>
              value.map((option, index) => (
                <Chip label={option.name} {...getTagProps({ index })} />
              ))
            }
            PaperComponent={(props) => (
              <Paper
                {...props}
                className={classes.customAutocompleteDropdown}
              />
            )}
            multiple
            popupIcon={<ExpandMoreOutlinedIcon />}
            noOptionsText={
              <Typography className={classes.notFound}>
                No Match Found
              </Typography>
            }
          />
        </FormControl>

        {/* radio button for selecting role for workshop */}
        <FormControl className={classes.formControl}>
          <FormLabel id="volunteerRadioBtn">Role Type</FormLabel>
          <RadioGroup
            defaultValue="volunteer"
            name="role"
            className={classes.radioGroup}
          >
            <FormControlLabel
              value="volunteer"
              control={<Radio className="radioBtn" disableRipple />}
              label="Volunteer"
              className={classes.formControlLabel}
            />
            <FormControlLabel
              value="leadvolunteer"
              control={<Radio className="radioBtn" disableRipple />}
              label="Lead Volunteer"
              className={classes.formControlLabel}
            />
          </RadioGroup>
        </FormControl>
      </DialogContent>

      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => closeLeadPopup()}
        >
          Cancel
        </Button>

        <Button className="doneBtn" disableRipple>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeadVolunteerPopup;
