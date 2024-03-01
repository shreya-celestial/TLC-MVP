import { Box, Typography } from '@mui/material';
import { useStyles } from './SmallCard.styles';
import BackHandOutlinedIcon from '@mui/icons-material/BackHandOutlined';
import classNames from 'classnames';

const SmallCard = ({ data }) => {
  const classes = useStyles();

  return (
    <Box className={classes.smallCard}>
      <Box className={classes.iconContainer}>
        <BackHandOutlinedIcon
          className={classNames(classes.handIcon, classes[data.type])}
        />
      </Box>
      <Box className={classes.flex}>
        <Typography className={classNames(classes.count, classes[data.type])}>
          {data.count}
        </Typography>
        <Typography>{data.title}</Typography>
      </Box>
    </Box>
  );
};

export default SmallCard;
