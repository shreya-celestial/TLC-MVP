import { Box, Typography } from '@mui/material';
import { useStyles } from './SmallCard.styles';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import classNames from 'classnames';

const SmallCard = ({ data }) => {
  const classes = useStyles();

  console.log(classes[data.type]);

  return (
    <Box className={classes.smallCard}>
      <Box className={classes.iconContainer}>
        <BackHandOutlinedIcon
          className={classNames(classes.handIcon, classes[data.type])}
        />
      </Box>
      <Box className={classes.flex}>
        <Typography>{data.count}</Typography>
        <Typography>{data.title}</Typography>
      </Box>
    </Box>
  );
};

export default SmallCard;
