import Navigation from './Navigation';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <main>
      <div className='left'>
        <Navigation />
      </div>
      <div className='right'>
        <div className='header'>
          <div className='header-bar'>
            <Header />
          </div>
          <div className='container'>{children}</div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
