import {
  Box,
  Button,
  FormControl,
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

const Volunteers = () => {
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
  const [statusDropdown, setStatusDropdown] = useState('all');
  const [roleDropdown, setRoleDropdown] = useState('all');
  const [genderDropdown, setGenderDropdown] = useState('all');

  const handleSubmit = function (e) {
    e.preventDefault();

    const filtersObj = {
      search: searchValue,
      status: statusDropdown,
      role: roleDropdown,
      gender: genderDropdown,
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
        <Typography component="h1">Volunteers</Typography>
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

            {/* Dropdown 1 */}
            {/* <LocalizationProvider
              dateAdapter={AdapterDayjs}
              className={classes.datepicker}
            >
              <DatePicker name="dob" required size="small" />
            </LocalizationProvider> */}
            <FormControl variant="outlined">
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                label="Status"
                variant="outlined"
                value={statusDropdown}
                onChange={(e) => {
                  setStatusDropdown(e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="verified">Verified</MenuItem>
                <MenuItem value="pending">Pending</MenuItem>
              </Select>
            </FormControl>

            {/* Dropdown 2 */}
            <FormControl>
              <InputLabel id="role-label">Role</InputLabel>
              <Select
                label="Role"
                labelId="role-label"
                variant="outlined"
                value={roleDropdown}
                onChange={(e) => {
                  setRoleDropdown(e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="admin">Admin</MenuItem>
                <MenuItem value="volunteer">Volunteer</MenuItem>
              </Select>
            </FormControl>

            {/* Dropdown 3 */}
            <FormControl>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                label="Gender"
                labelId="gender-label"
                variant="outlined"
                value={genderDropdown}
                onChange={(e) => {
                  setGenderDropdown(e.target.value);
                }}
                size="small"
              >
                <MenuItem value="all">All</MenuItem>
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
              </Select>
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
export default Volunteers;
