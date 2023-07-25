
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import './home.css';
import { Link } from 'react-router-dom';


function Login() {
  const navigate = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleLogout = () => {
    setLoggedIn(false);
    navigate.push("/logout");
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email && password !== '') {

      console.log(email, password);
      try {
        axios.post('/login', { email, password })

          .then(res => {
            const token = res.data.token;


            if (res.data === "exist") {

              alert("Login successful");
              navigate.push("/")


            } else {
              alert("Invalid credentials");
            }
          });

      } catch (e) {
        console.log(e);
      }
    }
  }

  return (
    <>
      {loggedIn ? (
        <div>
          <h2>Welcome, {email}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className='form'>
          <h2>Login Page</h2>
          <input type="text" name="email" placeholder="Enter Email.." className="login-input" onChange={handleEmailChange} />
          <input type="password" name="password" placeholder="Enter Password.." className="login-input" onChange={handlePasswordChange} />
          <button type="submit" className='loginbutton'>Login</button>
          <Link to="/register" className='lists' >Register</Link>
          <Link to="/" className="back">Back</Link>
        </form>
      )}
    </>
  );
}

export default Login;
