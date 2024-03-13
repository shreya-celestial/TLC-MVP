import { Box, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './PageHeader.styles';
import { useNavigate } from 'react-router-dom';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

function PageHeader({ currentPage, prevPage, path }) {
  const navigate = useNavigate();
  const classes = useStyles();
  const handleNavigate = () => {
    navigate(`/${path}`);
  };
  return (
    <Box className={classes.root}>
      <Typography className="pageHeading">{currentPage}</Typography>
      <Box className={classes.breadCrumbs}>
        <Typography className="navigationLink" onClick={handleNavigate}>
          {prevPage}
        </Typography>

        <KeyboardArrowRightOutlinedIcon />
        <Typography className="currentPage">{currentPage}</Typography>
      </Box>
    </Box>
  );
}

export default PageHeader;
