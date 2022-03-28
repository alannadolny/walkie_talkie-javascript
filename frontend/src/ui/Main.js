import { Link } from 'react-router-dom';
import walkieTalkie from '../walkie-talkie.png';
import HomePageAvatar from '../home-page-avatar.png';

function Main({visible}) {
  const style = {
    opacity: '40%',
  };

  return <div className="home-page" style={visible ? style : {}}>

    <div id="home-page-animation"> </div>

    <img id="home-page-image" alt='error' src={walkieTalkie}/>

    <div className="dialogue-container">

      <div className="dialogue-element">
        <div id="dialogue-profile">
          <img id="first-profile" alt='error' src={HomePageAvatar}/>
        </div>
        <div id="dialogue-text">
          <p> Do you like playing games with friends all day long? <br></br>
              Are you looking for the best app to conversation with wide range of funcionality? <br></br>
              <b> <u> Just check the possibilities of Walkie Talkie. You won`t regret! </u> </b> </p>
        </div>
      </div>

      <div className="dialogue-element">
        <div id="dialogue-text">
          <p> Are you a manager and looking for the conversation app? <br></br>
              Do you need many tools in one place to simply conduct business meetings? <br></br>
             <b> <u> Just check the possibiliteis of Walkie Talkie. You won`t regret! </u> </b> </p>
        </div>

        <div id="dialogue-profile">
          <img id="second-profile" alt='error' src={HomePageAvatar}/>
        </div>
      </div>

      <div id="dialogue-button">
        <button type="submit"> <Link to="/form/register"> JOIN TO US! </Link> </button>
      </div>

    </div>
  </div>;
}

export default Main;
