import React, { useState,useEffect } from 'react'
import "./login.css";
import { Button, TextField } from '@material-ui/core';
import logo1 from'../logo3.png';
import video from './video1.mp4'
import { NavLink, useHistory } from 'react-router-dom'

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()

  useEffect(()=>{
      if (localStorage.role) {
          history.push('/')
      }
  },[])
  
  const login = async () => {
      
      const res = await fetch("http://localhost:1000/user/login", {
          method: "post",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ username, password }),
          credentials: "include"
      })
      const data = await res.json()
      console.log(data)
      if (!data.err) {
          localStorage.username = data.username
          localStorage.role = data.role
          history.push("/home")
      } else {
          alert(data.msg)
      }
  }

  function goToRegister() {
    history.push("/register")
  }

  return (
    <div className="main-div">
  <video autoplay="" muted loop id="myVideo">
    <source src={video} type="video/mp4"/>
  </video>
      <div className="login-form">
        <img className="logo-img" src={logo1} alt="no" />
        <h2>Login</h2>
        <form action="">
          <TextField id="outlined-basic2" label="User Name" variant="outlined" type="text" onChange={e => setUsername(e.target.value)} />
          <TextField id="outlined-basic" label="Password" variant="outlined" type="password" onChange={e => setPassword(e.target.value)} />
          <Button className='login-button' size="large" color="primary" variant="contained" onClick={login} >Login</Button>
          <p  className="login-text">New user? <a className="pointer" onClick= {goToRegister}>Sign up to create your account</a></p>
        </form>
      </div>
    </div>
  );
}
