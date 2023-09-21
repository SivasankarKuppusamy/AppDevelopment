import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
import { login } from '../redux/userSlice';
import { useDispatch } from 'react-redux';
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav=useNavigate();
  const userType="student";
  const dispatch=useDispatch();
  const validate=(e)=>{
    e.preventDefault();
    if(email.length===0||password.length===0){
      alert("Kindly Enter All Details");
    }
    else{
      dispatch(login({email,userType}));
      if(userType==="admin"){
        nav("/admin-dashboard")
      }
      else{
        nav("/user-dashboard")
      }
    }
  }
  return (
    <body id="body">
    <div class="login"> 
    <div class="outer-container">
    <div class="content-container">
    <br/>
    <br/>
    <br/>
    <br/>
      <img alt="logo" src="https://repository-images.githubusercontent.com/556076311/5baa47be-f8f3-4925-b674-837ee2863d5a"/>
      <h2>WELCOME BACK  &#x2764; </h2>
      <form>
      <div>
      <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>
        </div>
        <div>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/>
        </div>
        <button onClick={validate} type="submit">Login</button>
      </form>
     
      <h3> New To our platform ? Register as</h3><h3><Link id="register" to="/student-signup">Student&nbsp;&nbsp;</Link><h4>OR&nbsp;&nbsp; </h4><Link id="register" to="/instructor-signup">Instructor ! </Link></h3>
    </div>
    <div class="image-container"></div>
  </div></div>
  </body>
  )
}

export default Login