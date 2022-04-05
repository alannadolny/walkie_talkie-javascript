import { Link } from 'react-router-dom';
import walkieTalkie from '../images/walkie-talkie.png';
import HomePageAvatar from '../images/home-page-avatar.png';
import man from '../images/man.png';
import gamepad from '../images/gamepad.png';
import briefcase from '../images/case.png';
import woman from '../images/women.png';

function Main({ visible }) {
  const style = {
    opacity: '40%',
  };

  return (
    <div className='home-page' style={visible ? style : {}}>
      <div id='home-page-animation'></div>

      <img id='home-page-image' alt='error' src={walkieTalkie} />

      <div className='home-page-container'>
        <div id='home-page-container-title'>
          <img alt='error' src={walkieTalkie} />
          <span> Walkie Talkie </span>
        </div>

        <div className='home-page-element'>
          <div id='home-page-profile'>
            <img id='first-profile' alt='error' src={HomePageAvatar} />
          </div>
          <div id='home-page-text'>
            <p>
              Do you like playing games with friends all day long? <br></br>
              Are you looking for the best app to conversation with wide range
              of funcionality? <br></br>
              <b>
                <u>
                  Just check the possibilities of Walkie Talkie. You won`t
                  regret!
                </u>
              </b>
            </p>
          </div>
        </div>

        <div id='home-page-container-icons'>
          <img alt='error' src={man} />
          <img alt='error' src={gamepad} />
          <img id='wt-logo' alt='error' src={walkieTalkie} />
          <img alt='error' src={briefcase} />
          <img alt='error' src={woman} />
        </div>

        <div className='home-page-element'>
          <div id='home-page-text'>
            <p>
              {' '}
              Are you a manager and looking for the conversation app? <br></br>
              Do you need many tools in one place to simply conduct business
              meetings? <br></br>
              <b>
                {' '}
                <u>
                  {' '}
                  <b> Just check the possibiliteis of Walkie Talkie. You won`t
                  regret! </b>{' '}
                </u>{' '}
              </b>{' '}
            </p>
          </div>

          <div id='home-page-profile'>
            <img id='second-profile' alt='error' src={HomePageAvatar} />
          </div>
        </div>

        <div id='home-page-button'>
          <button type='submit'>
            {' '}
            <Link to='/form/register'> JOIN TO US! </Link>{' '}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
