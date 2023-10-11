import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { useDispatch } from 'react-redux';
import { login } from '../redux/userSlice';
import { getItem, setRole, setToken, setemail } from './LocalStorage';
import bcrypt from 'bcryptjs';
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [formErrors, setFormErrors] = useState({
    email: '',
    password: '',
  });

  const validate = (e) => {
    e.preventDefault();
    const errors = {};

    if (email.length === 0) {
      errors.email = 'Email is required';
    }

    if (password.length === 0) {
      errors.password = 'Password is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    } else {
      setFormErrors({
        email: '',
        password: '',
      });

      const userCredentials = {
        email: email,
        password: password
      };
      axios.post("http://localhost:8080/auth/login",userCredentials
      ).then(response=>{
        const token=response.data.token;
        if (token) {
          setToken(token)
          setemail(userCredentials.email);
          const userType=response.data.role;
          setRole(userType)
              if(userType=="STUDENT"){
                nav("/user-dashboard");
              }
              else if(userType==="INSTRUCTOR"){
                nav('/ins-dashboard')
              }
              else if(userType=="ADMIN"){
                nav('/admin-dashboard')
              }
              else {
                alert("Invalid user role");
              }
            } else {
              alert("Invalid token. Please try again.");
            }
      }).catch(error=>{
        alert(error.response.data)
     
      })
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setFormErrors({ ...formErrors, email: '' });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setFormErrors({ ...formErrors, password: '' });
  };

  return (
    <body id="body">
      <div class="login">
        <div class="outer-container">
          <div class="content-container">
            <br />
            <br />
            <br />
            <br />
            <img alt="logo" src="https://repository-images.githubusercontent.com/556076311/5baa47be-f8f3-4925-b674-837ee2863d5a" />
            <h2>WELCOME BACK &#x2764; </h2>
            <form>
              <div>
                <input
                  onChange={handleEmailChange}
                  value={email}
                  type="email"
                  placeholder="Email"
                />
                {formErrors.email && <p className="error">{formErrors.email}</p>}
              </div>
              <div>
                <input
                  onChange={handlePasswordChange}
                  value={password}
                  type="password"
                  placeholder="Password"
                />
                {formErrors.password && <p className="error">{formErrors.password}</p>}
              </div>
              <button onClick={validate} type="submit">Login</button>
            </form>

            <h3> New To our platform ? Register as</h3><Link id="register" to="/instructor-signup">Instructor ! </Link>
          </div>
          <div class="image-container"></div>
        </div>
      </div>
    </body>
  );
}

export default Login;
