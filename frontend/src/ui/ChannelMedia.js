import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import mqtt from 'mqtt/dist/mqtt';
import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';

const ChannelMedia = ({ user }) => {
  // navigator.mediaDevices
  //   .getUserMedia({ video: true, audio: true })
  //   .then((stream) => {
  //     video.current.srcObject = stream;
  //   });

  return (
    <div style={{ border: '1px solid black' }}>
      {/* <video ref={video} autoPlay style={{ width: '300px', height: '300px' }} /> */}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

export default connect(mapStateToProps, null)(ChannelMedia);
