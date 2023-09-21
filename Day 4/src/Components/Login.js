import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Login.css'
function Login() {
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const nav=useNavigate();
  const validate=(e)=>{
    e.preventDefault();
    if(email.length===0||password.length===0){
      alert("Kindly Enter All Details");
    }
    else{
        nav('/')
    }
  }
  return (
    <div class="student-reg">
    <div class="outer-container">
    <div class="content-container">
    <br/>
    <br/>
    <br/>
    <br/>
      <img alt="logo" src="https://repository-images.githubusercontent.com/556076311/5baa47be-f8f3-4925-b674-837ee2863d5a"/>
      <h2>WELCOME BACK !</h2>
      <form >
      <div>
      <input onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="Email"/>
        </div>
        <div>
          <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password"/>
        </div>
        <button onClick={validate} type="submit">Login</button>
      </form>
     
      <h3>New To Our Platform ? Register as<br/> <br/><Link id="register" to="/student-signup">Student ! </Link>  OR <Link id="register" to="/instructor-signup">Instructor ! </Link></h3>
    </div>
    <div class="image-container"></div>
  </div></div>
  )
}

export default Login