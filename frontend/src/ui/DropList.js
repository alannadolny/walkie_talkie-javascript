import { Link } from 'react-router-dom';
import * as _ from 'lodash';
import { Logout } from '../ducks/user/operation';
import { useState } from 'react';
import list from '../images/list.png';
import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';

function DropList({ user, Logout, visible, setVisible }) {
  function ShowList() {
    if (visible) {
      setVisible(false);
    } else {
      setVisible(true);
    }
  }

  return (
    <div id='header-center-container'>
      <img id='list' alt='error' onClick={() => ShowList()} src={list} />
      {visible ? (
        <div id='droplist-container'>
          <nav className='droplist'>
            <div id='droplist-element'>
              <Link to='/' onClick={() => setVisible(false)}>
                {' '}
                HOME{' '}
              </Link>
            </div>

            <div id='droplist-element'>
              <Link to='/' onClick={() => setVisible(false)}>
                {' '}
                ABOUT{' '}
              </Link>
            </div>

            <div id='droplist-element'>
              <Link to='/' onClick={() => setVisible(false)}>
                {' '}
                CONTACT{' '}
              </Link>
            </div>

            {!user.login ? (
              <div id='droplist-element'>
                <Link to='/form/login' onClick={() => setVisible(false)}>
                  {' '}
                  SIGN IN{' '}
                </Link>
              </div>
            ) : (
              <div id='droplist-element'>
                {' '}
                <Link
                  to='/'
                  onClick={() => {
                    Logout();
                    setVisible(false);
                  }}
                >
                  LOG OUT
                </Link>{' '}
              </div>
            )}
            {!user.login ? (
              <div id='droplist-element'>
                <Link to='/form/register' onClick={() => setVisible(false)}>
                  {' '}
                  REGISTER{' '}
                </Link>{' '}
              </div>
            ) : (
              ''
            )}
          </nav>
        </div>
      ) : (
        ''
      )}
    </div>
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
export default connect(mapStateToProps, mapDispatchToProps)(DropList);
