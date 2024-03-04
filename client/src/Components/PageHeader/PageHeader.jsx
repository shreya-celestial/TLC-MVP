import { Box, Icon, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './PageHeader.styles';
import { Link } from 'react-router-dom';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';

function PageHeader({ currentPage , prevPage}) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Typography className="pageHeading">{currentPage}</Typography>
      <Box className={classes.breadCrumbs}>
        <Link className="navigationLink">{prevPage}</Link>

        <KeyboardArrowRightOutlinedIcon />
        <Typography className="currentPage">{currentPage}</Typography>
      </Box>
    </Box>
  );
}

export default PageHeader;
