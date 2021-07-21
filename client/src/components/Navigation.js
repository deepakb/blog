import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className='menu'>
      <li className='menu-item'>
        <Link to='/'>Home</Link>
      </li>
      <li className='menu-item'>
        <Link to='/blog'>Blog</Link>
      </li>
      <li className='menu-item'>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
};

export default Navigation;
