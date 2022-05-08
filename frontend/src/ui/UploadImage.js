import React from 'react';
import { useState } from 'react';
import { connect } from 'react-redux';

export const UploadImage = () => {
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
    <div>
      <hr></hr>
      <form onSubmit={handleSubmit}>
        <input type='file' name='file' onChange={handleFileChange}></input>
        <button type='submit'>Set</button>
      </form>
      {status && <h4>{status}</h4>}
    </div>
  );
};

export default UploadImage;
