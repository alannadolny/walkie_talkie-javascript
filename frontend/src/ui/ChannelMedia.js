import React, { useEffect, useRef, useState } from 'react';
import Peer from 'simple-peer';
import mqtt from 'mqtt/dist/mqtt';

const ChannelMedia = () => {
  const [otherUsers, setOtherUsers] = useState([]);
  const [user, setUser] = useState(new Peer({ initiator: true }));
  const [videos, setVideos] = useState([]);
  const video = useRef(null);

  // useEffect(() => {
  //   const client = mqtt.connect('mqtt://localhost:8000/mqtt');
  //   client.subscribe(`channel/user/join`, () => {
  //     client.on('message', (_, message) => {
  //       new Peer(JSON.parse(JSON.stringify(message))).signal();
  //       setOtherUsers((prev) => [...prev, message.toString()]);
  //       console.log(JSON.parse(JSON.stringify(message)));
  //     });
  //   });
  //   return () => {
  //     client.end();
  //   };
  // });

  // user.on('signal', (data) => {
  //   otherUsers[otherUsers.length - 1].signal(data);
  //   console.log('i got signal');
  // });

  // user.on('stream', () => {
  //   console.log('i got stream');
  // });

  useEffect(() => {
    //const client = mqtt.connect('mqtt://localhost:8000/mqtt');
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        video.current.srcObject = stream;
        setUser(new Peer({ initiator: true, stream }));
      });
    //client.publish(`channel/user/join`, user.toString());
  }, []);

  return (
    <div style={{ border: '1px solid black' }}>
      <video ref={video} autoPlay style={{ width: '300px', height: '300px' }} />
    </div>
  );
};
export default ChannelMedia;
