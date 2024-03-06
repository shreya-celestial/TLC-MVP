import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';

const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '14px !important',
  },
  alert: {
    position: 'fixed',
    top: '80px',
    left: '50%',
    zIndex: '999',
  },
  popupAlert: {
    top: '80px',
    left: '50%',
    zIndex: '999',
  },
}));

const AlertReact = ({ type, message, removeAlertType, componentType }) => {
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
          <Alert
            className={classNames(
              componentType === 'popup' ? classes.popupAlert : classes.alert
            )}
            severity={type}
          >
            {message}
          </Alert>
        </>
      )}
    </>
  );
};

export default AlertReact;
