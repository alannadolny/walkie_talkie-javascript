import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

export const UploadImage = ({ setNewImage }) => {
  const [image, setImage] = useState({ preview: '', data: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('file', image.data);
    const response = await fetch('http://localhost:5000/images/image', {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });
    if (response) {
      setStatus(response.statusText);
      setNewImage((prev) => !prev);
    }
  };

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImage(img);
  };

  return (
    <div className='upload-container'>
      {status && <span id='image-status'> <strong> {status} </strong> </span>}
      <form onSubmit={handleSubmit}>
        <input id='upload-image' type='file' name='file' onChange={handleFileChange}></input>
        <button id='set-image' type='submit'> Set </button>
      </form>
    </div>
  );
};

export default UploadImage;
