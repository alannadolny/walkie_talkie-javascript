import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import * as _ from 'lodash';
import { getChannelsFromState } from '../ducks/channels/selector';
import { ConnectToVoiceChannel } from '../ducks/channels/operation';
import { connect } from 'react-redux';

const ChannelMedia = ({ user, channel, ConnectToVoiceChannel, channels }) => {
  const [peerId, setPeerId] = useState('');
  const [remotePeerIdValue, setRemotePeerIdValue] = useState('');
  const remoteVideoRef = useRef(null);
  const videoRef = useRef(null);
  const peerInstance = useRef(null);

  useEffect(() => {
    const peer = new Peer();

    peer.on('open', (id) => {
      setPeerId(id);
    });

    peer.on('call', (call) => {
      let getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true }, (mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        call.answer(mediaStream);
        call.on('stream', (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
        });
      });
    });

    peerInstance.current = peer;
  }, []);

  const call = (remotePeerId) => {
    let getUserMedia =
      navigator.getUserMedia ||
      navigator.webkitGetUserMedia ||
      navigator.mozGetUserMedia;

    getUserMedia({ video: true }, (mediaStream) => {
      const call = peerInstance.current.call(remotePeerId, mediaStream);

      videoRef.current.srcObject = mediaStream;

      call.on('stream', (remoteStream) => {
        remoteVideoRef.current.srcObject = remoteStream;
      });
    });
  };

  useEffect(() => {
    if (peerId !== '') ConnectToVoiceChannel(channel.name, peerId);
  }, [peerId]);

  useEffect(() => {
    for (const el of channel.currentIds) {
      if (el === peerId) continue;
      call(el);
    }
  }, [channel]);

  return (
    <div style={{ border: '1px solid black' }}>
      You:
      <video
        ref={videoRef}
        autoPlay
        style={{ width: '300px', height: '300px' }}
      />
      Remote:
      <video
        ref={remoteVideoRef}
        autoPlay
        style={{ width: '300px', height: '300px' }}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    channels: getChannelsFromState(state),
  };
};

const mapDispatchToProps = {
  ConnectToVoiceChannel,
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelMedia);
