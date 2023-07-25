
import { useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from "axios";
import './home.css'

function SubmitForm() {
  const navigate = useHistory();
  const [name, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleNameChange = (e) => {
    setUsername(e.target.value)
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    setEmailError(false);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
    setPasswordError(false);
  }

  const handleSubmit = event => {
    event.preventDefault();

    const validEmail = new RegExp(
      '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$'
      // '^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]$'
    );

    const validPassword = new RegExp('^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$');

    const email = event.target.email.value;
    const password = event.target.password.value;


    const isEmailValid = validEmail.test(email);
    const isPasswordValid = validPassword.test(password);


    if (!isEmailValid) {
      setEmailError(true);
    }


    if (!isPasswordValid) {
      setPasswordError(true);
    }

    if (isEmailValid && isPasswordValid) {
      console.log(name, email, password);

      try {
        axios.post('http://localhost:3000/register', { name, email, password })
          .then(res => {
            console.log(res);
            if (res.data === "exist") {
              alert("User already exists");

            } else if (res.data === "notexist") {
              alert("Registration successful");
              navigate.push("/login")
            }

          })
          .catch(error => {
            console.error(error);
            alert("An error occurred during registration.");
          });
      } catch (error) {
        console.error(error);
        alert("An error occurred during registration.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <h2>Submit  Page</h2>
      <label className='label'>
        Person Name:
      </label>
      <input type="text" name="name" value={name} placeholder="Enter Name.." className="register-input" onChange={handleNameChange} />

      <label className='label'>
        Enter email
      </label>
      <input type="text" name="email" placeholder="Enter Email.." className="register-input" value={email} onChange={handleEmailChange} />
      {emailError && <span style={{ color: "red" }}>Invalid email format</span>}

      <label className='label'>
        Enter Password
      </label>
      <input type="password" name="password" placeholder="Enter Password.." className="register-input" value={password} onChange={handlePasswordChange} />
      {passwordError && <span style={{ color: "red" }}>Password must be at least 6 characters long and contain letters and numbers</span>}
      <button className="registerbutton" retype="submit">Submit</button>
    </form>
  );
}

export default SubmitForm;

