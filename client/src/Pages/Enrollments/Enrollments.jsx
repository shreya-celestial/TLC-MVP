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
import { useContext, useEffect, useState } from 'react';

import { enrollments } from '../../apis/enrollments';
import PaginationComp from '../../Components/Table/PaginationComp';

import InvitePopup from './InvitePopup/InvitePopup';
import DeletePopup from './../../Components/DeletePopup/DeletePopup';
import VerifyPopup from '../Volunteers/VerifyPopup/VerifyPopup';

import { useNavigate, useParams } from 'react-router-dom';
import AlertReact from '../../Components/Alert/AlertReact';
import { useAlerts } from '../../hooks/useAlerts';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';

import colDefs from './coldefs/coldefs';
import InfoTable from '../../Components/InfoTable/InfoTable';
import UserContext from '../../store/userContext';
import { useMutation } from '@tanstack/react-query';
import { getLinkForEnrollInvite } from '../../apis/enrollments';

const Enrollments = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { createSuccess } = useParams();

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
    setAlertType,
    rowChanged,
    selectedUser,
    setShowInviteModal,
    setShowDeleteModal,
    defineAlertType
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
  const [enrolledDropdown, setEnrolledDropdown] = useState('all');
  const [clickedCountDetails, setClickedCountDetails] = useState();

  const { data, isPending, isError } = useReactQuery(
    [
      currentPage,
      rowsPerPage,
      {
        search: debouncedSearch,
        gender: genderDropdown,
        enrolledBy: enrolledDropdown,
      },
      rowChanged,
    ],
    enrollments
  );

  const { mutate, isPending: isPendingMutation } = useMutation({
    mutationFn: getLinkForEnrollInvite,
    onSuccess: (data) => {
      if (data.status === 'error') {
        alert(data.message);
      } else {
        copyToClipboard(data.data.link)
        .then(() => {
          defineAlertType('success', 'Link copied successfully!')
          console.log("Link copied successfully!");
        })
        .catch(err => {
          defineAlertType('error', 'Failed to copy link')
          console.error("Failed to copy text:", err);
        });
      }
    },
    onError: (error) => {
      console.log(error)
      alert(error?.info?.message || 'Something Went Wrong');
    },
  });

  function copyToClipboard(text) {
    if (!navigator.clipboard) {
      throw new Error("Clipboard API not supported!");
    }
    return navigator.clipboard.writeText(text);
  }

  const copyInvitationUrl = function () {
    mutate({ user });
  }

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
    setGenderDropdown('all');
    setEnrolledDropdown('all');
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
  }, [debouncedSearch, genderDropdown]);

  useEffect(() => {
    if (createSuccess === 'success') {
      setAlertType({
        type: 'success',
        message: 'Enrollment Created Successfully',
      });
      const url = window.location.pathname.replace('/success', '');
      window.history.replaceState({}, document.title, url);
    }
  }, [createSuccess, setAlertType]);

  const showDeleteModalFunction = function (data) {
    setShowDeleteModal(true);
  };

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
                  navigate(`/enrollments/details/${selectedRows[0].id}/edit`);
                }}
              >
                Edit
              </Button>
              <Button
                className="viewBtn"
                disableRipple
                onClick={() => {
                  navigate(`/enrollments/details/${selectedRows[0].id}/view`);
                }}
              >
                View
              </Button>
            </>
          )}
          {selectedRows.length === 0 && (
            <Button
              className="createEnrollBtn"
              disableRipple
              onClick={() => {
                navigate(`/enrollments/details/create`);
              }}
            >
              Create Enrollment
            </Button>
          )}
          {selectedRows.length === 0 && (
            <>
            <Button
              className="inviteBtn"
              disableRipple
              onClick={() => {
                copyInvitationUrl();
              }}
            >
              {isPendingMutation ? 'Loading...' : 'Copy Invite URL'}
            </Button>
            </>
          )}
          {selectedRows.length === 0 && (
            <Button
              className="createEnrollBtn"
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
          hideDeleteModalAndShowSuccess={confirmDeleteAndChangePage}
          hideDeleteModal={hideDeleteModal}
          updateSelectedRows={updateSelectedRows}
          type="enrollments"
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
          type="enrollments"
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

              <FormControl className={classes.formControl}>
                <FormLabel id="enrolled-label">Enrolled By</FormLabel>
                <Select
                  label="Enrolled By"
                  labelId="enrolled-label"
                  value={enrolledDropdown}
                  onChange={(e) => {
                    setEnrolledDropdown(e.target.value);
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
                  <MenuItem value="self">Self</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
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
            showDetails={showDetails}
            isError={isError}
            showDeleteModalFunction={showDeleteModalFunction}
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
export default Enrollments;
