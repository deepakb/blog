import {
  AppBar,
  Container,
  makeStyles,
  Paper,
  Toolbar,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  footer: {
    display: 'flex',
    justifyContent: 'center'
  }
}));

const Footer = () => {
  const classes = useStyles();

  return (
    <Paper>
      <AppBar position='static' color='default'>
        <Container maxWidth='md' className={classes.footer}>
          <Toolbar>
            <Typography variant='body1' color='inherit'>
              © 2021 placeholderblog.com
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
    </Paper>
  );
};

export default Footer;
