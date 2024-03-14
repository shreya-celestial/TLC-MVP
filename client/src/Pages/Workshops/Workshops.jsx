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
import { useContext, useEffect, useState } from 'react';

import PaginationComp from '../../Components/Table/PaginationComp';

import { useNavigate, useParams } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';

import colDefs from './coldefs/coldefs';
import { workshops } from '../../apis/workshops';
import DeletePopup from '../../Components/DeletePopup/DeletePopup';
import dayjs from 'dayjs';
import { FilterTheme } from './FilterTheme';
import InfoTable from '../../Components/InfoTable/InfoTable';
import UserContext from '../../store/userContext';

const Workshops = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { createSuccess } = useParams();

  const { user } = useContext(UserContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [selectedRows, setSelectedRows] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);

  const {
    removeAlertType,
    hideDeleteModal,
    showVerifyStatus,
    hideDeleteModalAndShowSuccess,
    showDeleteModal,
    alertType,
    setAlertType,
    rowChanged,
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
  const [pastOrUpcoming, setPastOrUpcoming] = useState('upcoming');
  const [debouncedSearch, setDebouncedValue] = useState('');
  const [clickedCountDetails, setClickedCountDetails] = useState();

  const { data, isPending, isError } = useReactQuery(
    [
      currentPage,
      rowsPerPage,
      { search: debouncedSearch, startDate, endDate, pastOrUpcoming },
      rowChanged,
    ],
    workshops
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

  const handleReset = () => {
    setEndDate('');
    setStartDate('');
    setPastOrUpcoming('upcoming');
    setSearchValue('');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, pastOrUpcoming, startDate, endDate]);

  useEffect(() => {
    if (createSuccess === 'success') {
      setAlertType({
        type: 'success',
        message: 'Workshop Created Successfully',
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
        <Typography component="h1">Workshops</Typography>
        <Box className={classes.ActionBtn}>
          {user?.isAdmin && selectedRows.length >= 1 && (
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
              {user?.isAdmin && (
                <Button
                  onClick={() => {
                    navigate(`/workshops/detail/${selectedRows[0].id}/edit`);
                  }}
                  className="editBtn"
                  disableRipple
                >
                  Edit
                </Button>
              )}
              <Button
                onClick={() => {
                  navigate(`/workshops/detail/${selectedRows[0].id}/view`);
                }}
                className="viewBtn"
                disableRipple
              >
                View
              </Button>
            </>
          )}
          {user?.isAdmin && selectedRows.length === 0 && (
            <Button
              onClick={() => {
                navigate(`/workshops/detail/create`);
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
          updateSelectedRows={updateSelectedRows}
          type="workshops"
        />
      )}
      {clickedCountDetails && (
        <InfoTable
          clickedCountDetails={clickedCountDetails}
          hideInfoTable={hideInfoTable}
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
                onClick={handleReset}
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
            data={data?.data?.workshops}
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
export default Workshops;
