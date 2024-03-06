import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { Box, IconButton } from '@mui/material';
import { useStyles } from './DeleteEditButtonCell.styles';
import { useState } from 'react';
import AddChildPopup from '../../Pages/Enrollments/AddChildPopup/AddChildPopup';
export const DeleteEditButtonCell = (param) => {
  const classes = useStyles();
  const [childData, setChildData] = useState('');
  const [openChild, setOpenChild] = useState(false);
  const handleCloseOpenChild = () => {
    setOpenChild(false);
  };

  const handleEditChild = () => {
    setChildData({
      name: param.data.name,
      gender: param.data.gender,
      dob: param.data.dateOfBirth,
    });
    setOpenChild(true);
  };

  const handleDelete = () => {
    alert(param.data.name);
  };

  return (
    <Box className={classes.BtnWrapper}>
      <IconButton
        className={`${classes.childActionBtn} childEditIcon`}
        disableRipple
        onClick={handleEditChild}
      >
        <EditIcon />
      </IconButton>
      <IconButton
        className={`${classes.childActionBtn} childDeleteIcon`}
        disableRipple
        onClick={handleDelete}
      >
        <DeleteForeverIcon />
      </IconButton>

      <AddChildPopup
        openChild={openChild}
        handleCloseOpenChild={handleCloseOpenChild}
        childData={childData}
      />
    </Box>
  );
};
