import Header from '../Header';

const Layout = ({ children }) => {
  return (
    <div class='app'>
      <div className='header'>
        <Header />
      </div>
      <div className='container'>{children}</div>
    </div>
  );
};

export default Layout;
