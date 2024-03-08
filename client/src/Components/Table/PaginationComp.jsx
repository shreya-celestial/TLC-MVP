import React, { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import LastPageIcon from '@mui/icons-material/LastPage';
import { useStyles } from './PaginationComp.styles';
import { Box, IconButton, MenuItem, Select, Typography } from '@mui/material';

const PaginationComp = ({
  updateCurrentPage,
  totalPages,
  currentPage,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.pagination}>
      <IconButton
        className={classes.pageBtn}
        onClick={() => updateCurrentPage(1)}
        disabled={currentPage === 1}
      >
        <FirstPageIcon />
      </IconButton>
      <IconButton
        className={classes.pageBtn}
        onClick={() => updateCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeftIcon />
      </IconButton>

      <Typography className="pageInfo">
        Page {currentPage} of {totalPages}
      </Typography>

      <IconButton
        className={classes.pageBtn}
        onClick={() => updateCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRightIcon />
      </IconButton>
      <IconButton
        className={classes.pageBtn}
        onClick={() => updateCurrentPage(totalPages)}
        disabled={currentPage === totalPages}
      >
        <LastPageIcon />
      </IconButton>
    </Box>
  );
};

export default PaginationComp;
