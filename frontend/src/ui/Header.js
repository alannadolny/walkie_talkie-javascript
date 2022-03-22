import walkieTalkie from '../walkie-talkie.png';
import { Link } from 'react-router-dom';
import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';
import * as _ from 'lodash';

function Header({ user }) {
  return (
    <header>
      {console.log(user)}
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
              <a href='/'>LOG OUT</a>
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

export default connect(mapStateToProps, null)(Header);
