import {
  AppBar,
  Container,
  makeStyles,
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
    <AppBar position='static' color='default'>
      <Container maxWidth='md' className={classes.footer}>
        <Toolbar>
          <Typography variant='body1' color='inherit'>
            © 2021 placeholderblog.com
          </Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Footer;
