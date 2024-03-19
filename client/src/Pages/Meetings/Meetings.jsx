import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Menu,
  TextField,
  ThemeProvider,
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

import { useNavigate, useParams } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';
import FilterListIcon from '@mui/icons-material/FilterList';

import colDefs from './coldefs/coldefs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { FilterTheme } from '../Workshops/FilterTheme';
import InfoTable from '../../Components/InfoTable/InfoTable';

const Meetings = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { createSuccess } = useParams();

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
    setShowDeleteModal,
    setAlertType,
  } = useAlerts();

  const updateCurrentPage = (val) => {
    setCurrentPage(val);
  };

  const updateRowsPerPage = (val) => {
    setRowsPerPage(val);
  };

  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedValue] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clickedCountDetails, setClickedCountDetails] = useState();

  const { data, isPending, isError } = useReactQuery(
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
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [searchValue]);

  const confirmDeleteAndChangePage = function () {
    hideDeleteModalAndShowSuccess();
    setCurrentPage(1);
  };

  const updateSelectedRows = function (data) {
    setSelectedRows(data);
  };

  const handleReset = () => {
    setEndDate('');
    setStartDate('');
  };

  const showDetails = function (params) {
    if (params.value > 0)
      setClickedCountDetails({
        id: params.data.id,
        field: params.colDef.field,
      });
  };

  const hideInfoTable = function () {
    setClickedCountDetails(null);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, startDate, endDate]);

  useEffect(() => {
    if (createSuccess === 'success') {
      setAlertType({
        type: 'success',
        message: 'Meeting Created Successfully',
      });
      const url = window.location.pathname.replace('/success', '');
      window.history.replaceState({}, document.title, url);
    }
  }, [createSuccess]);

  return (
    <Box className={classes.root}>
      {alertType && (
        <AlertReact
          removeAlertType={removeAlertType}
          type={alertType.type}
          message={alertType.message}
        />
      )}
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
                  navigate(`/meetings/details/${selectedRows[0].id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                className="viewBtn"
                disableRipple
                onClick={() => {
                  navigate(`/meetings/details/${selectedRows[0].id}/view`);
                }}
              >
                View
              </Button>
            </>
          )}
          {selectedRows.length === 0 && (
            <Button
              className="createMeetingBtn"
              disableRipple
              onClick={() => {
                navigate(`/meetings/details/create`);
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
          hideDeleteModalAndShowSuccess={confirmDeleteAndChangePage}
          hideDeleteModal={hideDeleteModal}
          updateSelectedRows={updateSelectedRows}
        />
      )}
      {alertType && (
        <AlertReact
          removeAlertType={removeAlertType}
          type={alertType.type}
          message={alertType.message}
        />
      )}
      {clickedCountDetails && (
        <InfoTable
          clickedCountDetails={clickedCountDetails}
          hideInfoTable={hideInfoTable}
          type="meetings"
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
              <ThemeProvider theme={FilterTheme}>
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
              </ThemeProvider>

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
            showDetails={showDetails}
            isError={isError}
          />
        </Box>
        <PaginationComp
          updateCurrentPage={updateCurrentPage}
          totalPages={data?.data?.total_pages}
          updateRowsPerPage={updateRowsPerPage}
          currentPage={currentPage}
          isPending={isPending}
        />
      </Box>
    </Box>
  );
};
export default Meetings;
