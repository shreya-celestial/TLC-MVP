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
import { useStyles } from './Volunteers.styles';
import Table from '../../Components/Table/Table';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useContext, useEffect, useState } from 'react';

import { volunteers } from '../../apis/volunteers';
import PaginationComp from '../../Components/Table/PaginationComp';

import InvitePopup from './InvitePopup/InvitePopup';
import DeletePopup from './../../Components/DeletePopup/DeletePopup';
import VerifyPopup from './VerifyPopup/VerifyPopup';

import { useNavigate } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import colDefs from './coldefs/coldefs';
import UserContext from '../../store/userContext';

const Volunteers = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { user } = useContext(UserContext);

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

  const { data, isPending, isError } = useReactQuery(
    [
      currentPage,
      rowsPerPage,
      {
        search: debouncedSearch,
        status: statusDropdown,
        role: roleDropdown,
        gender: genderDropdown,
      },
      rowChanged,
    ],
    volunteers
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
  const handleReset = function () {
    setRoleDropdown('all');
    setGenderDropdown('all');
    setStatusDropdown('all');
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusDropdown, roleDropdown, genderDropdown]);

  // const updateSort = function (data) {
  //   setSort(data);
  // };

  return (
    <Box className={classes.root}>
      <Box className={classes.HeadingAndActionBtn}>
        <Typography component="h1">Volunteers</Typography>

        <Box className={classes.ActionBtn}>
          {user?.isAdmin && selectedRows.length >= 1 && (
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
              {user?.isAdmin && (
                <Button
                  className="editBtn"
                  disableRipple
                  onClick={() => {
                    navigate(
                      `/volunteers/detail/${selectedRows[0].email}/edit`
                    );
                  }}
                >
                  Edit
                </Button>
              )}
              <Button
                className="viewBtn"
                disableRipple
                onClick={() => {
                  navigate(`/volunteers/detail/${selectedRows[0].email}/view`);
                }}
              >
                View
              </Button>
            </>
          )}
          {user?.isAdmin && selectedRows.length === 0 && (
            <Button
              className="inviteBtn"
              disableRipple
              onClick={() => {
                setShowInviteModal(true);
              }}
            >
              Invite
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
          selectedRows={selectedRows}
          hideDeleteModalAndShowSuccess={hideDeleteModalAndShowSuccess}
          updateSelectedRows={updateSelectedRows}
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
                <FormLabel id="status">Status</FormLabel>
                <Select
                  labelId="status"
                  value={statusDropdown}
                  onChange={(e) => {
                    setStatusDropdown(e.target.value);
                  }}
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="verified">Verified</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel id="role-label">Role</FormLabel>
                <Select
                  labelId="role-label"
                  value={roleDropdown}
                  onChange={(e) => {
                    setRoleDropdown(e.target.value);
                  }}
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="volunteer">Volunteer</MenuItem>
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <FormLabel id="gender-label">Gender</FormLabel>
                <Select
                  label="Gender"
                  labelId="gender-label"
                  value={genderDropdown}
                  onChange={(e) => {
                    setGenderDropdown(e.target.value);
                  }}
                  IconComponent={ExpandMoreOutlinedIcon}
                  className={classes.selectBox}
                  MenuProps={{
                    classes: {
                      paper: classes.selectDropdownMenu,
                    },
                  }}
                >
                  <MenuItem value="all">All</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
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
            data={data?.data?.users}
            isPending={isPending}
            isError={isError}
            showVerifyStatus={showVerifyStatus}
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
export default Volunteers;
