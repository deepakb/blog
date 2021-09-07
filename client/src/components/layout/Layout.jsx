import { makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import Login from '../user/Login';

const useStyles = makeStyles(theme => ({
  login: {
    justifyContent: 'center',
    minHeight: '80vh',
    maxHeight: '80vh'
  }
}));

const Layout = ({ header, footer }) => {
  const classes = useStyles();

  return (
    <>
      <Paper square={true}>{header}</Paper>
      <Paper square={true} className={classes.login}>
        <Login />
      </Paper>
      <Paper square={true}>{footer}</Paper>
    </>
  );
};

export default Layout;
