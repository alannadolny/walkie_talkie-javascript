import { getUserFromState } from '../ducks/user/selector';
import { connect } from 'react-redux';
import UploadImage from './UploadImage';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Buffer } from 'buffer';

const instance = axios.create({
  withCredentials: true,
});

function UserProfile({ user }) {
  const [image, setImage] = useState(null);
  const [newImage, setNewImage] = useState(false);

  useEffect(() => {
    user.login &&
      instance
        .get(`http://localhost:5000/images/image/${user.login}`, {
          responseType: 'arraybuffer',
        })
        .then(async (response) => {
          setImage(Buffer.from(response.data, 'binary').toString('base64'));
        })
        .catch();
  }, [newImage]);

  return (
    <div className='channels-right-container'>
      {image === null ? (
        <div id='profile'>
          <div id='profile-image'> {user.login[0]} </div>
          <span id='nickname'>
            {' '}
            <strong> {user.login} </strong>{' '}
          </span>
        </div>
      ) : (
        <div id='profile'>
          <img
            id='profile-image'
            src={`data:image/jpeg;charset=utf-8;base64,${image}`}
            alt=''
          />
          <span id='nickname'>
            {' '}
            <strong> {user.login} </strong>{' '}
          </span>
        </div>
      )}
      <UploadImage setNewImage={setNewImage} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: getUserFromState(state),
  };
};

export default connect(mapStateToProps, null)(UserProfile);
