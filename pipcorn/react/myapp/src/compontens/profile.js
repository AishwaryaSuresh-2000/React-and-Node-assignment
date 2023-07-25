

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './home.css';

const ImageUploadForm = () => {
  
  const [image, setImage] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <input type="file" name="image" id="name" onChange={handleImageChange} />
      <button type="submit" id="image">Upload Image</button>
      <Link to="/logout" className='logout'>logout</Link>

      <Link to="/" className='back'>back</Link>
    </form>
  );
};

export default ImageUploadForm;


