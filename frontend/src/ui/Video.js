import { useRef, useEffect } from 'react';

const Video = ({ stream }) => {
  const localVideo = useRef(null);

  useEffect(() => {
    if (localVideo.current) localVideo.current.srcObject = stream;
  }, [stream, localVideo]);

  return <video ref={localVideo} autoPlay />;
};

export default Video;
