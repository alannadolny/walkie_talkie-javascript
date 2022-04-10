import { Link } from 'react-router-dom';

function Warning({ visible }) {
  const style = {
    opacity: '40%',
  };

  return (
    <div className='warning-main' style={visible ? style : {}}>
      <div className='warning-container'>
        <div id='warning-container-header'>
          <h1>
            {' '}
            <b> Error! </b>{' '}
          </h1>
        </div>
        <div id='warning-container-text'>
          <b>
            {' '}
            You have to be logged in <br></br> to view the page content!{' '}
          </b>
        </div>
        <div id='warning-container-login'>
          Do you already have an account? <br></br>
          <b>
            {' '}
            Just <Link to='/form/login'> SIGN IN! </Link>{' '}
          </b>
        </div>
        <div id='warning-container-register'>
          Do you not have an account? <br></br>
          <b> Click button below! </b> <br></br>
          <button type='submit'>
            <Link to='/form/register'> JOIN TO US! </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Warning;
