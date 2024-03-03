import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useStyles } from './PaginationComp.styles';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

const PaginationComp = ({
  updateCurrentPage,
  totalPages,
  updateRowsPerPage,
  currentPage,
}) => {
  const classes = useStyles();

  const [selectedOption, setSelectedOption] = useState('option1');

  const handleChangeRows = (e) => {
    setSelectedOption(Number(e.target.value));
    updateRowsPerPage(Number(e.target.value));
  };

  return (
    <Box>
      <Box className={classes.pagination}>
        <Box>
          <Box className={classes.rowSelect}>
            <Typography>Rows Per Page</Typography>
            <Select
              variant="outlined"
              value={selectedOption}
              onChange={handleChangeRows}
              size="small"
              className={classes.selectBox}
            >
              <MenuItem value="10">10</MenuItem>
              <MenuItem value="15">15</MenuItem>
              <MenuItem value="20">20</MenuItem>
            </Select>
          </Box>
        </Box>
        <>
          <IconButton
            onClick={() => updateCurrentPage(1)}
            disabled={currentPage === 1}
          >
            <FirstPageIcon />
          </IconButton>
          <IconButton
            onClick={() => updateCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </IconButton>
        </>
        Page {currentPage} of {totalPages}
        <>
          <IconButton
            onClick={() => updateCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <ChevronRightIcon />
          </IconButton>
          <IconButton
            onClick={() => updateCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            <LastPageIcon />
          </IconButton>
        </>
      </Box>
    </Box>
  );
};

export default PaginationComp;
