import { Link } from 'react-router-dom';
import alancio from '../images/alancioo_image.png';
import pawko from '../images/pawkooo_image.jpg';

function About({visible}) {

  const style = {
    opacity: '40%',
  };

  return (
    <div className='about-main' style={visible ? style : {}}>
      <div id='author-container'>
        <img id='author-image' src={alancio}/>
        <span id='author-nickname'> <strong> Alanciooo </strong> </span>
      </div>
      <div id='about-main-container'>
        <div id='about-main-container-title'> <h1> About Us! </h1> </div>
        <div> 
          Welcome to Walkie Talkie, your number one of all real-time communicators.
          We're dedicated to providing you with the very best online communicator,
          with an emphasis on a stable connection, great audio and voice quality,
          and fast and always responding servers. Founded in 2022 by two students.
          Walkie Talkie has come a long way from its beginnings in Gdańsk. When they
          first started out, their passion for providing online communication drove
          them to start their own business. We hope you enjoy our products as much
          as we enjoy offering them to you. If you have any questions or comments,
          please don't hesitate to <Link id='about-link' to='/contact'> contact us. </Link>
        </div>
        <div id='about-main-container-end'> <strong> Sincerely, Walkie Talkie Team! </strong> </div>
      </div>
      <div id='author-container'>
        <img id='author-image' src={pawko}/>
        <span id='author-nickname'> <strong> Pawkooo13 </strong> </span>
      </div>
    </div>
  );
}

export default About;
