import Signin_image from './EV-charging.png';
import './Signin.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {checkAuth, saveCredentials, deleteCredentials} from "../App/App";
import React from 'react';


function Signin() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [requestMess, setRequestMess] = useState('');

  const handleRegister = async (e) => {
    setRequestMess('');
    e.preventDefault();
    if(username !== '' && password !== '') {
      try {
        console.log(JSON.stringify({username, password}));
        const response = await fetch("https://127.0.0.1:8002/api/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        if (!response.ok) {
          setRequestMess(data.message);
          throw new Error(data.message);
        }

        console.log("try auth");
        const role = data.isAdmin ? "admin" : "user";
        saveCredentials(data.id, data.username, data.password, role);
        console.log("autho done");
        history.push('/');
        history.go(0);
        // Register successful, redirect to login page or do something else
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="signin">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="signin-header">
        <div className="signin-left">
          <img src={Signin_image} className="signin-image" alt="logo" />
        </div>
        <div className="signin-right">
          <h1 className="signin-h1">
            Sign In
          </h1>
            <TextField
              id="signin-username-input"
              label="Username"
              type="text"
              autoComplete="username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br/><br/><br/>
            <TextField
              id="signin-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className='signin-error-p' >{requestMess}</p>
            <p className="signin-p">
              <br/>
              Don't have an account?
            <a
              className="signin-link"
              href="/signup"
              rel="noopener noreferrer"
            >
              Sign up!
            </a>
            </p>
            <br/>
            <Button color="success" variant="contained" onClick={handleRegister}>Submit</Button>
          <br/><br/>
        </div>
      </header>
    </div>
  );
}

export default Signin;
