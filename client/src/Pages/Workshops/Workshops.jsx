import {
  Box,
  Button,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';

import { useStyles } from './Workshops.styles';

import Table from '../../Components/Table/Table';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useState } from 'react';

import PaginationComp from '../../Components/Table/PaginationComp';

import { useNavigate } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';

import { workshopsColDef } from './coldefs/coldefs';
import { workshops } from '../../apis/workshops';
import DeletePopup from '../../Components/DeletePopup/DeletePopup';
import dayjs from 'dayjs';

const Workshops = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);

  const {
    removeAlertType,
    hideInviteModal,
    hideDeleteModal,
    hideVerifyStatus,
    showVerifyStatus,
    hideInviteModalAndShowSuccess,
    hideDeleteModalAndShowSuccess,
    hideVerifyModalAndShowSuccess,
    showInviteModal,
    showDeleteModal,
    showVerifyStatusModal,
    alertType,
    rowChanged,
    selectedUser,
    setShowInviteModal,
    setShowDeleteModal,
  } = useAlerts();

  const { data, isPending, isError, error } = useReactQuery(
    [currentPage, rowsPerPage, filters, rowChanged],
    workshops
  );

  const updateCurrentPage = (val) => {
    setCurrentPage(val);
  };

  const updateRowsPerPage = (val) => {
    setRowsPerPage(val);
  };

  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [pastOrUpcoming, setPastOrUpcoming] = useState('upcoming');

  console.log(startDate, pastOrUpcoming);

  const handleSubmit = function (e) {
    e.preventDefault();

    const filtersObj = {
      search: searchValue,
      startDate,
      endDate,
      pastOrUpcoming,
    };

    for (const key in filtersObj) {
      if (filtersObj[key] === 'all' || filtersObj[key] === '') {
        delete filtersObj[key];
      }
    }

    setFilters(filtersObj);
    setCurrentPage(1);
  };

  const updateSelectedRows = function (data) {
    setSelectedRows(data);
  };

  return (
    <Box className={classes.tableContainer}>
      <Box>
        <Typography component="h1">Workshops</Typography>
        <Button
          onClick={() => {
            navigate(`/workshopdetail/create`);
          }}
        >
          Create Workshop
        </Button>
        <Box>
          {selectedRows.length >= 1 && (
            <Button
              onClick={() => {
                setShowDeleteModal(true);
              }}
            >
              Delete
            </Button>
          )}
          {selectedRows.length === 1 && (
            <>
              <Button
                onClick={() => {
                  navigate(`/workshopdetail/${selectedRows[0].id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  navigate(`/workshopdetail/${selectedRows[0].id}/view`);
                }}
              >
                View
              </Button>
            </>
          )}
        </Box>
        {alertType && (
          <AlertReact
            removeAlertType={removeAlertType}
            type={alertType.type}
            message={alertType.message}
          />
        )}
        {showDeleteModal && (
          <DeletePopup
            selectedRows={selectedRows}
            hideDeleteModalAndShowSuccess={hideDeleteModalAndShowSuccess}
            hideDeleteModal={hideDeleteModal}
            type="workshops"
          />
        )}
        <Box>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Search"
              variant="outlined"
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
              size="small"
            />
            {/* Dropdown 3 */}
            <FormControl>
              <InputLabel id="pastorupcoming-label">
                Past Or Upcoming
              </InputLabel>
              <Select
                label="pastorupcoming"
                labelId="pastorupcoming-label"
                variant="outlined"
                value={pastOrUpcoming}
                onChange={(e) => {
                  setPastOrUpcoming(e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="past">Past</MenuItem>
                <MenuItem value="upcoming">Upcoming</MenuItem>
              </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
              <FormLabel>Start Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker
                  disabled={pastOrUpcoming !== 'all' ? true : false}
                  name="startDate"
                  value={dayjs(startDate)}
                  onChange={(date) => setStartDate(new Date(date))}
                />
              </LocalizationProvider>
            </FormControl>
            {/* end date */}
            <FormControl className={classes.formControl}>
              <FormLabel>End Date</FormLabel>
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                className={classes.datepicker}
              >
                <DatePicker
                  disabled={pastOrUpcoming !== 'all' ? true : false}
                  name="endtDate"
                  value={dayjs(endDate)}
                  onChange={(date) => setEndDate(new Date(date))}
                />
              </LocalizationProvider>
            </FormControl>

            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => {
                setFilters({});
                setCurrentPage(1);
              }}
            >
              Reset
            </Button>
          </form>
        </Box>
      </Box>
      <Table
        colDefs={workshopsColDef}
        key={rowChanged}
        updateSelectedRows={updateSelectedRows}
        data={data?.data?.workshops}
        isPending={isPending}
        showVerifyStatus={showVerifyStatus}
      />
      <PaginationComp
        updateCurrentPage={updateCurrentPage}
        totalPages={data?.data?.total_pages}
        updateRowsPerPage={updateRowsPerPage}
        currentPage={currentPage}
      />
    </Box>
  );
};
export default Workshops;
