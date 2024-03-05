import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '14px !important',
  },
  alert: {
    position: 'fixed',
    top: '80px',
    zIndex: '999',
  },
}));

const AlertReact = ({ type, message, removeAlertType }) => {
  const [isVisible, setIsVisible] = useState(true);
  const classes = useStyles();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (removeAlertType) removeAlertType();
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {isVisible && (
        <>
          <Alert className={classes.alert} severity={type}>
            {message}
          </Alert>
        </>
      )}
    </>
  );
};

export default AlertReact;
