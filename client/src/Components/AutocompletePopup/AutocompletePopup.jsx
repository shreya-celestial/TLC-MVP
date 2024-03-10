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
import { useReactQuery } from '../../hooks/useReactQuery';
import { enrollments as participants } from '../../apis/enrollments';
import { meetings } from '../../apis/meetings';
import { volunteers } from '../../apis/volunteers';

function AutocompletePopup({
  mode,
  closeOpenPopup,
  openPopup,
  closePopupAndSetRows,
}) {
  const classes = useStyles();

  const [filters, setFilters] = useState({});
  const [debouncedFilters, setDebouncedFilters] = useState();
  const [participantsOptions, setParticipantsOptions] = useState([]);
  const [meetingsOptions, setMeetingsOptions] = useState([]);
  const [volunteersOptions, setVolunteersOptions] = useState([]);

  const [selectedMeetings, setSelectedMeetings] = useState();
  const [selectedParticipants, setSelectedParticipants] = useState();
  const [selectedVolunteers, setSelectedVolunteers] = useState();

  const fetchFn =
    mode === 'Meetings'
      ? meetings
      : mode === 'Volunteers'
      ? volunteers
      : participants;

  const { data, isPending, isError, error } = useReactQuery(
    [1, 10, { ...debouncedFilters }, mode],
    fetchFn,
    {
      enabled: debouncedFilters?.search !== undefined,
    }
  );

  console.log(data);

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [filters]);

  useEffect(() => {
    if (data) {
      const dataType =
        mode === 'Meetings'
          ? data?.data?.meetings
          : mode === 'Volunteers'
          ? data?.data?.users
          : data?.data?.enrollments;

      const options =
        mode === 'Meetings'
          ? meetingsOptions
          : mode === 'Volunteers'
          ? participantsOptions
          : participantsOptions;

      const filtered = dataType?.filter((participant) => {
        const vols = options?.filter(
          (vol) => JSON.stringify(vol) === JSON.stringify(participant)
        );
        if (vols.length) {
          return false;
        }
        return true;
      });

      if (mode === 'Meetings') {
        setMeetingsOptions(filtered);
      }
      if (mode === 'Participants') {
        setParticipantsOptions(filtered);
      }
      if (mode === 'Volunteers') {
        setVolunteersOptions(filtered);
      }
    }
  }, [data]);

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
            options={
              mode === 'Meetings'
                ? meetingsOptions
                : mode === 'Volunteers'
                ? volunteersOptions
                : participantsOptions
            }
            getOptionLabel={(option) =>
              mode === 'Meetings'
                ? `${option.type} (${option.venue})`
                : mode === 'Volunteers'
                ? `${option.name} (${option.email})`
                : `${option.name} (${option.email})`
            }
            onChange={(event, selectedElements) => {
              if (mode === 'Meetings')
                setSelectedMeetings((prev) => selectedElements);
              if (mode === 'Volunteers')
                setSelectedVolunteers((prev) => selectedElements);
              if (mode === 'Participants')
                setSelectedParticipants((prev) => selectedElements);
            }}
            renderInput={(params) => (
              <TextField
                className={classes.autocompleteTextField}
                placeholder="Search to add"
                onChange={(e) => setFilters({ search: e.target.value })}
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
                <Chip
                  label={mode === 'Meetings' ? option.type : option.name}
                  {...getTagProps({ index })}
                />
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

        <Button
          className="doneBtn"
          disableRipple
          onClick={() =>
            closePopupAndSetRows(
              mode === 'Meetings'
                ? selectedMeetings
                : mode === 'Volunteers'
                ? selectedVolunteers
                : selectedParticipants,
              mode
            )
          }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AutocompletePopup;
