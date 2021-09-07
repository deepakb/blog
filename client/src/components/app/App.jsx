import React from 'react';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import Layout from '../layout/Layout';
import Header from '../header/Header';
import Footer from '../footer/Footer';

const App = () => {
  const [darkMode, setDarkMode] = React.useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light'
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <Layout
        header={<Header darkMode={darkMode} setDarkMode={setDarkMode} />}
        footer={<Footer />}
      />
    </ThemeProvider>
  );
};

export default App;
