import { Alert } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@mui/styles';
import classNames from 'classnames';
const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '14px !important',
  },
  alert: {
    '&.MuiAlert-root': {
      position: 'absolute',
      top: '-100px',
      zIndex: '1600',
      left: '50%',
      transform: 'translateX(-50%)',
      borderRadius: '5px',
      '& .MuiAlert-message': {
        fontSize: '12px',
        color: '#2F2F2F',
      },
      animation: '$alertAnim .5s forwards',
      [theme.breakpoints.down('sm')]: {
        width: '95%',
      },
    },
  },
  popupAlert: {
    '&.MuiAlert-root': {
      zIndex: '1600',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
      '& .MuiAlert-message': {
        fontSize: '12px',
        color: '#2F2F2F',
      },
    },
  },
  '@keyframes alertAnim': {
    '0%': {
      top: '-100px',
    },
    '100%': {
      top: '10px',
      boxShadow: 'rgba(0, 0, 0, 0.16) 0px 1px 4px',
    },
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
