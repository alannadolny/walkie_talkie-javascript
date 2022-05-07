import React from 'react';
import walkieTalkie from '../images/walkie-talkie.png';

const LoadingPage = () => {
  return(
    <div className='loading-page-main'> 
      <div id='loading-page-container'>
        <img src={walkieTalkie} alt='error'/>
        <h1 data-text='Loading...'> <strong> Loading... </strong> </h1>
      </div>
    </div>
  );
};

export default LoadingPage;
