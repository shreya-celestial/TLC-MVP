import React from 'react';
import {
  Autocomplete,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useStyles } from './AutocompletePopup.styles';
const Dummylist = [
  { name: 'Vikas Kumar', email: 'vikas@gmail.com' },
  { name: 'Arpit Seth', email: 'arpitseth1@gmail.com' },
  { name: 'Rahul Kumar', email: 'rahul2003@gmail.com' },
  { name: 'Charu Sharma', email: 'charusharma@gmail.com' },
  { name: 'Chirag Sen', email: 'chiragsen@gmail.com' },
  { name: 'shubham gaur', email: 'shubhamgaur@gmail.com' },
  { name: 'shubham gaur', email: 'shubhamgaur@gmail.com' },
];

function AutocompletePopup({ mode, closeOpenPopup, openPopup }) {
  const classes = useStyles();

  return (
    <Dialog open={openPopup} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Add {mode}</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => closeOpenPopup()}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.DiaogContent}>
        {/* autocomplete  for showing list of volunteers*/}

        <FormControl className={classes.formControl}>
          <FormLabel>Search {mode}</FormLabel>
          <Autocomplete
            options={Dummylist}
            getOptionLabel={(option) => `${option.name} (${option.email})`}
            onChange={(e, value) => console.log(value)}
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
            className={classes.autocomplete}
            multiple
            popupIcon={<ExpandMoreOutlinedIcon />}
            noOptionsText={
              <Typography className={classes.notFound}>
                No Match Found
              </Typography>
            }
          />
        </FormControl>
      </DialogContent>

      {/* action buttons */}
      <DialogActions className={classes.DialogActions}>
        <Button
          className="cancelBtn"
          disableRipple
          onClick={() => closeOpenPopup()}
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

export default AutocompletePopup;
