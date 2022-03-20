import React, { useEffect, useState } from "react";
import "./login.css";
import { Button, TextField } from "@material-ui/core";
import logo1 from "../logo3.png";
import video from "./video1.mp4";
import { NavLink, useHistory } from "react-router-dom";

export default function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  useEffect(() => {
    if (localStorage.role) {
      // history.push('/')
    }
  }, []);

  const register = async () => {
    const res = await fetch("http://localhost:1000/user/register", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ firstName, lastName, username, password }),
      credentials: "include",
    });
    const data = await res.json();
    console.log(data);
    if (!data.err) {
      localStorage.username = data.username;
      localStorage.firstname = data.firstname;
      localStorage.role = data.role;
      history.push("/login");
    } else {
      alert(data.msg);
    }
  };

  function goToLogin() {
    history.push("/login");
  }
  return (
    <div className="main-div">
      <video autoplay="" muted loop id="myVideo">
        <source src={video} type="video/mp4" />
      </video>
      <div className="login-form">
        <img className="logo-img" src={logo1} alt="no" />
        <h2>Register</h2>
        <form action="">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="User Name"
            variant="outlined"
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
          className='login-button'
            size="large"
            color="primary"
            variant="contained"
            onClick={register}
          >
            Register
          </Button>
          <p className="login-text">
            Already Have an Account?
            <a className="pointer" onClick={goToLogin}>
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
