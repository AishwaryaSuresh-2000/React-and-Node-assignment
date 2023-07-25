
import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Account= () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('image', image);

    try {
      // Send the form data to the backend server
      const response = await axios.post('http://localhost:3000/account/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image URL:', response.data.imageUrl);
      // You can handle the response, e.g., display a success message or redirect the user
    } catch (error) {
      console.error('Error uploading image:', error.message);
      // Handle the error, e.g., display an error message
    }
  };

  return (
    <div>
      <h2>Account Page</h2>
      <form onSubmit={handleSubmit} className='form'>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="image">Upload Image:</label>
          <input type="file" id="image" accept="image/*" onChange={handleImageChange} />
        </div>
        <button type="submit">Submit</button>
        <Link to="/logout"  className='logout'>logout</Link>
      
      <Link to="/" className='back'>back</Link>
      </form>
   
    
     
    </div>
  );
};

export default Account;
