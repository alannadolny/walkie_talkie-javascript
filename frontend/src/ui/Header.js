import walkieTalkie from '../walkie-talkie.png';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header>
      <div id='header-left-container'>
        <Link to='/'>
          {' '}
          <img id='logo' alt='error' src={walkieTalkie} />{' '}
        </Link>
        <h1> Walkie Talkie </h1>
      </div>
      <nav className='nav'>
        <ul>
          <li>
            {' '}
            <Link to='/'> HOME </Link>{' '}
          </li>
          <li>
            {' '}
            <a href=''> ABOUT </a>{' '}
          </li>
          <li>
            {' '}
            <a href=''> CONTACT </a>{' '}
          </li>
          <li>
            {' '}
            <Link to='/form/login'> SIGN IN </Link>{' '}
          </li>
          <li>
            {' '}
            <Link to='/form/register'> REGISTER </Link>{' '}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
