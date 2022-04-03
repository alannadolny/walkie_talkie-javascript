import walkieTalkie from '../images/walkie-talkie.png';
import { Link } from 'react-router-dom';
import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Logout } from '../ducks/user/operation';
import DropList from './DropList';

function Header({ user, Logout, visible, setVisible }) {
  return (
    <header>
      <div id='header-left-container'>
        <Link to='/'>
          {' '}
          <img id='logo' alt='error' src={walkieTalkie} />{' '}
        </Link>
        <h1 id='header-text'> Walkie Talkie </h1>
        <h1 id='header-text-after'> WT </h1>
      </div>

      <DropList visible={visible} setVisible={setVisible} />

      <nav className='nav'>
        <ul>
          {!user.login ? (
            <li>
              {' '}
              <Link to='/'> HOME </Link>{' '}
            </li>
          ) : (
            ''
          )}
          <li>
            {' '}
            <Link to='/about'> ABOUT </Link>{' '}
          </li>
          <li>
            {' '}
            <Link to='/contact'> CONTACT </Link>{' '}
          </li>
          {!user.login ? (
            <li>
              {' '}
              <Link to='/form/login'> SIGN IN </Link>
            </li>
          ) : (
            <li>
              {' '}
              <Link to='/' onClick={() => Logout()}>
                LOG OUT
              </Link>{' '}
            </li>
          )}
          {!user.login ? (
            <li>
              {' '}
              <Link to='/form/register'> REGISTER </Link>{' '}
            </li>
          ) : (
            ''
          )}
        </ul>
      </nav>
    </header>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

const mapDispatchToProps = {
  Logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
