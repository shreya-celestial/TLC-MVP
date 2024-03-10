import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
  ThemeProvider,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useStyles } from './Workshops.styles';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
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
import { FilterTheme } from './FilterTheme';
import InfoTable from '../../Components/InfoTable/InfoTable';

const Workshops = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState({});

  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const updateCurrentPage = (val) => {
    setCurrentPage(val);
  };

  const updateRowsPerPage = (val) => {
    setRowsPerPage(val);
  };

  const [searchValue, setSearchValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const [pastOrUpcoming, setPastOrUpcoming] = useState('all');



  const { data, isPending, isError, error } = useReactQuery(
    [
      currentPage,
      rowsPerPage,

      {
        search: searchValue,
        startDate,
        endDate,
        pastOrUpcoming,
      },

      rowChanged,
    ],
    workshops
  );

  const updateSelectedRows = function (data) {
    setSelectedRows(data);
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.HeadingAndActionBtn}>
        <Typography component="h1">Workshops</Typography>
        <Box className={classes.ActionBtn}>
          {selectedRows.length >= 1 && (
            <Button
              onClick={() => {
                setShowDeleteModal(true);
              }}
              className="deleteBtn"
              disableRipple
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
                className="editBtn"
                disableRipple
              >
                Edit
              </Button>
              <Button
                onClick={() => {
                  navigate(`/workshopdetail/${selectedRows[0].id}/view`);
                }}
                className="viewBtn"
                disableRipple
              >
                View
              </Button>
            </>
          )}

          {selectedRows.length === 0 && (

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
          <form>
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
              onClick={() => {
                navigate(`/workshopdetail/create`);
              }}
              className="createWorkshopBtn"
              disableRipple
            >
              Create Workshop
            </Button>
          )}
        </Box>
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
      <Box className={classes.headerTablePagination}>
        <Box className={classes.tableHeader}>
          <TextField
            placeholder="Search"
            className={classes.searchbar}
            autoComplete="off"
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
            }}
          />
          <IconButton
            disableRipple
            onClick={(e) => setAnchorEl(e.currentTarget)}
            className={classes.filterIcon}
          >
            <FilterListIcon />
          </IconButton>
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            className={classes.filterRoot}
            onClose={() => setAnchorEl(null)}
          >
            <Box className={classes.filterContent}>
              <Typography>Filters</Typography>
              <FormControl className={classes.formControl}>
                <FormLabel id="pastorupcoming-label">
                  Past Or Upcoming
                </FormLabel>
                <Select
                  labelId="pastorupcoming-label"
                  className={classes.selectBox}
                  IconComponent={ExpandMoreOutlinedIcon}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                  value={pastOrUpcoming}
                  onChange={(e) => {
                    setPastOrUpcoming(e.target.value);
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="past">Past</MenuItem>
                  <MenuItem value="upcoming">Upcoming</MenuItem>
                </Select>
              </FormControl>
              <ThemeProvider theme={FilterTheme}>
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
              </ThemeProvider>
              <Button
                disableRipple
                className={classes.resetFilterBtn}
                onClick={() => {
                  setFilters({});
                  setCurrentPage(1);
                }}
              >
                Reset
              </Button>
            </Box>
          </Menu>
        </Box>
        <Box className={classes.tableContainer}>
          <Table
            colDefs={workshopsColDef}
            key={rowChanged}
            updateSelectedRows={updateSelectedRows}
            data={data?.data?.workshops}
            isPending={isPending}
            showVerifyStatus={showVerifyStatus}
          />
        </Box>
        <PaginationComp
          updateCurrentPage={updateCurrentPage}
          totalPages={data?.data?.total_pages}
          updateRowsPerPage={updateRowsPerPage}
          currentPage={currentPage}
        />
      </Box>
    </Box>
  );
};
export default Workshops;
