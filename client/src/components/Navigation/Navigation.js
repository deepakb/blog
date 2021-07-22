import { Link } from 'react-router-dom';
import { ImHome, ImUser } from 'react-icons/im';
import { FaBlog } from 'react-icons/fa';

const Navigation = () => {
  return (
    <ul className='menu'>
      <li className='menu-item'>
        <Link to='/'>
          <div className='menu-item-content'>
            <span>
              <ImHome />
            </span>
            <span>Home</span>
          </div>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to='/blog'>
          <div className='menu-item-content'>
            <span>
              <FaBlog />
            </span>
            <span>Blog</span>
          </div>
        </Link>
      </li>
      <li className='menu-item'>
        <Link to='/login'>
          <div className='menu-item-content'>
            <span>
              <ImUser />
            </span>
            <span>Login</span>
          </div>
        </Link>
      </li>
    </ul>
  );
};

export default Navigation;
