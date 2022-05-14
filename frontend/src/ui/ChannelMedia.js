import React, { useEffect, useRef, useState } from 'react';
import Peer from 'peerjs';
import * as _ from 'lodash';
import { getChannelsFromState } from '../ducks/channels/selector';
import { ConnectToVoiceChannel } from '../ducks/channels/operation';
import { connect } from 'react-redux';
import Video from './Video';
import { io } from 'socket.io-client';

const ChannelMedia = ({
  user,
  channel,
  ConnectToVoiceChannel,
  channels,
  setPeerIdVal,
}) => {
  const [peerId, setPeerId] = useState('');
  const [streams, setStreams] = useState([]);
  const videoRef = useRef(null);
  const peerInstance = useRef(null);
  const socket = useRef();

  const [option, setOption] = useState({
    video: true,
    audio: true,
  });

  useEffect(() => {
    socket.current = io(`http://${window.location.hostname}:5000`);

    socket.current.on('leaveChannel', (mess) => {
      window.location.reload(true);
    });

    return () => socket.current.emit('end');
  });

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

      getUserMedia(option, (mediaStream) => {
        videoRef.current.srcObject = mediaStream;
        call.answer(mediaStream);
        call.on('stream', (remoteStream) => {
          setStreams([...streams, remoteStream]);
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
        setStreams([...streams, remoteStream]);
      });
    });
  };

  useEffect(() => {
    if (peerId !== '') {
      ConnectToVoiceChannel(channel.name, peerId);
      setPeerIdVal(peerId);
    }
  }, [peerId]);

  useEffect(() => {
    for (const el of channel.currentIds) {
      if (el === peerId) continue;
      call(el);
    }
  }, [channel]);

  return (
    <div className='channel-details-media'>
      <video ref={videoRef} autoPlay />
      {streams.map((s) => (
        <Video key={s} stream={s} />
      ))}
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
      <div id='xd'></div>
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
