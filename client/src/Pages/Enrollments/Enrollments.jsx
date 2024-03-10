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
import { useStyles } from './Enrollments.styles';
import Table from '../../Components/Table/Table';
import { useReactQuery } from '../../hooks/useReactQuery';
import { useEffect, useState } from 'react';

import { enrollments } from '../../apis/enrollments';
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

const Enrollments = () => {
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
  const [genderDropdown, setGenderDropdown] = useState('all');

  const { data, isPending, isError, error } = useReactQuery(
    [
      currentPage,
      rowsPerPage,
      {
        search: debouncedSearch,
        gender: genderDropdown,
      },
      rowChanged,
    ],
    enrollments
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
    setGenderDropdown('all');
  };

  console.log(selectedRows);

  return (
    <Box className={classes.root}>
      <Box className={classes.HeadingAndActionBtn}>
        <Typography component="h1">Enrollments</Typography>
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
              Create Enrollment
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
            data={data?.data?.enrollments}
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
export default Enrollments;
