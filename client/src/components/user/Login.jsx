import React from 'react';
import {
  Button,
  TextField,
  Grid,
  Paper,
  Typography,
  Link,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  loginForm: {
    justifyContent: 'center',
    minHeight: '80vh'
  },
  buttonBlock: {
    width: '100%'
  },
  loginBackground: {
    justifyContent: 'center',
    minHeight: '30vh',
    padding: '50px'
  }
}));

const Login = () => {
  const classes = useStyles();

  return (
    <div>
      <Grid container spacing={0} justify='center' direction='row'>
        <Grid item>
          <Grid
            container
            direction='column'
            justify='center'
            spacing={2}
            className={classes.loginForm}
          >
            <Paper
              variant='elevation'
              elevation={2}
              className={classes.loginBackground}
            >
              <Grid item>
                <Typography component='h1' variant='h5'>
                  Sign in
                </Typography>
              </Grid>
              <Grid item>
                <form>
                  <Grid container direction='column' spacing={2}>
                    <Grid item>
                      <TextField
                        id='outlined-first-name-input'
                        name='first-name'
                        label='First Name'
                        type='text'
                        autoComplete='current-first-name'
                        variant='outlined'
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id='outlined-last-name-input'
                        name='last-name'
                        label='Last Name'
                        type='text'
                        autoComplete='current-last-name'
                        variant='outlined'
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id='outlined-email-input'
                        name='email'
                        label='Email'
                        type='text'
                        autoComplete='current-email'
                        variant='outlined'
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id='outlined-password-input'
                        name='password'
                        label='Password'
                        type='password'
                        autoComplete='current-password'
                        variant='outlined'
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <TextField
                        id='outlined-display-name-input'
                        name='display-name'
                        label='Display Name'
                        type='text'
                        autoComplete='current-display-name'
                        variant='outlined'
                        fullWidth
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        variant='contained'
                        color='primary'
                        type='submit'
                        className={classes.buttonBlock}
                      >
                        Submit
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Grid>
              <Grid item>
                <Link href='#' variant='body2'>
                  Forgot Password?
                </Link>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
