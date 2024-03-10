import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { useStyles } from './Meetings.styles';
import Table from '../../Components/Table/Table';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useEffect, useState } from 'react';

import { meetings } from '../../apis/meetings';
import PaginationComp from '../../Components/Table/PaginationComp';

import InvitePopup from '../Volunteers/InvitePopup/InvitePopup';
import DeletePopup from './../../Components/DeletePopup/DeletePopup';
import VerifyPopup from '../Volunteers/VerifyPopup/VerifyPopup';

import { useNavigate } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import colDefs from './coldefs/coldefs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';

const Meetings = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [anchorEl, setAnchorEl] = useState(null);

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

  const updateCurrentPage = (val) => {
    setCurrentPage(val);
  };

  const updateRowsPerPage = (val) => {
    setRowsPerPage(val);
  };

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedValue] = useState('');
  const [statusDropdown, setStatusDropdown] = useState('all');
  const [roleDropdown, setRoleDropdown] = useState('all');
  const [genderDropdown, setGenderDropdown] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, isPending, isError, error } = useReactQuery(
    [
      currentPage,
      rowsPerPage,
      {
        search: debouncedSearch,
        startDate,
        endDate,
      },
      rowChanged,
    ],
    meetings
  );

  useEffect(() => {
    let timer;
    timer = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const updateSelectedRows = function (data) {
    setSelectedRows(data);
  };

  const handleReset = () => {
    setEndDate('');
    setStartDate('');
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.HeadingAndActionBtn}>
        <Typography component="h1">Meetings</Typography>

        <Box className={classes.ActionBtn}>
          {selectedRows.length >= 1 && (
            <Button
              className="deleteBtn"
              disableRipple
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
                className="editBtn"
                disableRipple
                onClick={() => {
                  navigate(`/meetingdetails/${selectedRows[0].id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                className="viewBtn"
                disableRipple
                onClick={() => {
                  navigate(`/meetingdetails/${selectedRows[0].id}/view`);
                }}
              >
                View
              </Button>
            </>
          )}
          {selectedRows.length === 0 && (
            <Button
              className="inviteBtn"
              disableRipple
              onClick={() => {
                navigate(`/meetingdetails/create`);
              }}
            >
              Create Meeting
            </Button>
          )}
        </Box>
      </Box>
      {showInviteModal && (
        <InvitePopup
          hideInviteModalAndShowSuccess={hideInviteModalAndShowSuccess}
          hideInviteModal={hideInviteModal}
        />
      )}
      {showVerifyStatusModal && (
        <VerifyPopup
          selectedUser={selectedUser}
          hideVerifyStatus={hideVerifyStatus}
          hideVerifyModalAndShowSuccess={hideVerifyModalAndShowSuccess}
        />
      )}
      {showDeleteModal && (
        <DeletePopup
          type="meetings"
          selectedRows={selectedRows}
          hideDeleteModalAndShowSuccess={hideDeleteModalAndShowSuccess}
          hideDeleteModal={hideDeleteModal}
        />
      )}
      {alertType && (
        <AlertReact
          removeAlertType={removeAlertType}
          type={alertType.type}
          message={alertType.message}
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
          {/* Filter modal */}
          <Menu
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            className={classes.filterRoot}
            onClose={() => setAnchorEl(null)}
          >
            <Box className={classes.filterContent}>
              <Typography>Filters</Typography>
              <FormControl className={classes.formControl}>
                <FormLabel>Start Date</FormLabel>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  className={classes.datepicker}
                >
                  <DatePicker
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
                    name="endtDate"
                    value={dayjs(endDate)}
                    onChange={(date) => setEndDate(new Date(date))}
                  />
                </LocalizationProvider>
              </FormControl>

              <Button
                onClick={handleReset}
                disableRipple
                className={classes.resetFilterBtn}
              >
                Reset
              </Button>
            </Box>
          </Menu>
        </Box>
        <Box className={classes.tableContainer}>
          <Table
            colDefs={colDefs}
            key={rowChanged}
            updateSelectedRows={updateSelectedRows}
            data={data?.data?.meetings}
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
export default Meetings;
