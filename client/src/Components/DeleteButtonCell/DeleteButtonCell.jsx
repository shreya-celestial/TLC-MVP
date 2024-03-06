import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { IconButton } from '@mui/material';
import { useStyles } from './DeleteButtonCell.styles';
export const DeleteButtonCell = (param) => {
  const classes = useStyles();

  const handleDelete = () => {
    alert(param.data.name);
  };

  return (
    <IconButton
      className={classes.DeletBtn}
      disableRipple
      onClick={handleDelete}
    >
      <DeleteForeverIcon />
    </IconButton>
  );
};
