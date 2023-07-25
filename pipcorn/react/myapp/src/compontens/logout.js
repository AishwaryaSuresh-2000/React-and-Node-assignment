import React from 'react';
import { useHistory } from 'react-router-dom';

function Logout() {
  const navigate = useHistory();
  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };
  
  const handleLogout = () => {
  
    deleteCookie('access-token');
  

    navigate.push("/"); 
  }

  return (
    <div className='logout-page'>
      <h2>Do you want to logout</h2>
      <button className="loginbutton" onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Logout;
