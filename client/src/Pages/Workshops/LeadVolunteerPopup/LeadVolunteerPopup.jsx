import React, { useEffect, useState } from 'react';
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
import { useReactQuery } from '../../../hooks/useReactQuery';
import { volunteers } from '../../../apis/volunteers';

function LeadVolunteerPopup({
  openLeadPopup,
  closeLeadPopup,
  closeLeadPopupAndSetRows,
}) {
  const classes = useStyles();

  const [filters, setFilters] = useState({});
  const [debouncedFilters, setDebouncedFilters] = useState();

  const { data, isPending, isError } = useReactQuery(
    [1, 10, { ...debouncedFilters }],
    volunteers
    // {
    //   enabled: debouncedFilters?.search !== undefined,
    // }
  );

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  const [volunteersList, setVolunteersList] = useState([]);
  const [selectedVolunteers, setSelectedVolunteers] = useState([]);
  const [role, setRole] = useState('volunteer');

  useEffect(() => {
    if (data) {
      const filtered = data?.data?.users?.filter((user) => {
        const vols = selectedVolunteers?.filter(
          (vol) => JSON.stringify(vol) === JSON.stringify(user)
        );
        if (vols.length) {
          return false;
        }
        return true;
      });
      setVolunteersList(filtered);
    }
  }, [data]);

  return (
    <Dialog open={openLeadPopup} className={classes.Dialog}>
      <DialogTitle className={classes.TitleAndClose}>
        <Typography>Add Volunteers and Lead Volunteers</Typography>
        <IconButton
          className={classes.CloseIcon}
          disableRipple
          onClick={() => closeLeadPopup(selectedVolunteers)}
        >
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent className={classes.DiaogContent}>
        {/* autocomplete  for showing list of volunteers*/}

        <FormControl className={classes.formControl}>
          <FormLabel>Search Volunteers & Lead Volunteers</FormLabel>
          {isError && (
            <Typography variant="body2" color="error">
              Cannot fetch volunteers
            </Typography>
          )}
          <Autocomplete
            loading={isPending}
            options={volunteersList}
            getOptionLabel={(option) => `${option.name} (${option.email})`}
            onChange={(event, selectedElements) => {
              setSelectedVolunteers((prev) => selectedElements);
            }}
            className={classes.autocomplete}
            renderInput={(params) => (
              <TextField
                className={classes.autocompleteTextField}
                placeholder="Search to add"
                {...params}
                onChange={(e) => setFilters({ search: e.target.value })}
                onBlur={(e) => {
                  setFilters({ search: '' });
                }}
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
              value.map((option, index) => {
                return <Chip label={option.name} {...getTagProps({ index })} />;
              })
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
            onChange={(e) => setRole(e.target.value)}
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

        <Button
          onClick={() => {
            closeLeadPopupAndSetRows(selectedVolunteers, role);
            setRole('volunteer');
          }}
          className="doneBtn"
          disableRipple
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default LeadVolunteerPopup;
