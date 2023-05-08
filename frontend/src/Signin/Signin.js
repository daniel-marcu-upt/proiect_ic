import Signin_image from './EV-charging.png';
import './Signin.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {checkAuth, saveCredentials, deleteCredentials} from "../App/App";

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
        const response = await fetch("http://127.0.0.1:8002/login", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, password}),
        });
        console.log(response);
        if (!response.ok) {
          const errorData = await response.json();
          setRequestMess(errorData.message);
          console.log(errorData.message);
          throw new Error(errorData.message);
        }
        console.log("try auth");
        saveCredentials(username, password);
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
