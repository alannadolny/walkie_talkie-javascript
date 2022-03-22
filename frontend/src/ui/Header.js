import walkieTalkie from '../walkie-talkie.png';
import { Link } from 'react-router-dom';
import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';
import * as _ from 'lodash';
import { Logout } from '../ducks/user/operation';

function Header({ user, Logout }) {
  return (
    <header>
      <div id='header-left-container'>
        <Link to='/'>
          {' '}
          <img id='logo' alt='error' src={walkieTalkie} />{' '}
        </Link>
        <h1 id="header-text"> Walkie Talkie </h1>
        <h1 id="header-text-after"> WK </h1>
      </div>
      <nav className='nav'>
        <ul>
          <li>
            {' '}
            <Link to='/'> HOME </Link>{' '}
          </li>
          <li>
            {' '}
            <Link to='/'> ABOUT </Link>{' '}
          </li>
          <li>
            {' '}
            <Link to='/'> CONTACT </Link>{' '}
          </li>
          <li>
            {' '}
            {!user.login ? (
              <Link to='/form/login'> SIGN IN </Link>
            ) : (
              <Link to='/' onClick={() => Logout()}>
                LOG OUT
              </Link>
            )}
          </li>
          <li>
            {!user.login ? <Link to='/form/register'> REGISTER </Link> : ''}
          </li>
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
