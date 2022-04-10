import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';

function UserProfile({ user }) {
  return (
    <div className='channels-right-container'>
      <div
        id='profile'
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: 'center',
          fontWeight: 'bolder',
          fontSize: '40px',
        }}
      >
        {user.login[0]}
      </div>
      <span id='nickname'> {user.login} </span>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

export default connect(mapStateToProps, null)(UserProfile);
