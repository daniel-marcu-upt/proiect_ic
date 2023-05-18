import Signup_image from './EV-charging.png';
import './Signup.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import {checkAuth, saveCredentials, deleteCredentials} from "../App/App";

function Signup() {
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [userExist, setUserExist] = useState('');

  const handleRegister = async (e) => {
    setUserExist('');
    e.preventDefault();
    if(username !== '' && password !== '' && email !== '') {
      try {
        const response = await fetch("http://127.0.0.1:8002/register", {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({username, email, password, role}),
        });
        if (!response.ok) {
          const errorData = await response.json();
          setUserExist(errorData.message);
          throw new Error(errorData.message);
        }
        saveCredentials(username, password, role);
        history.push('/');
        history.go(0);
        // Register successful, redirect to login page or do something else
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className="signup">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="signup-header">
        <div className="signup-left">
          <img src={Signup_image} className="signup-image" alt="logo" />
        </div>
        <div className="signup-right">
          <h1 className="signup-h1">
            Sign Up
          </h1>
            <TextField
              id="signup-email-input"
              label="Email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br/><br/><br/>
            <TextField
              id="signup-username-input"
              label="Username"
              type="text"
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br/><br/><br/>
            <TextField
              id="signup-password-input"
              label="Password"
              type="password"
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <br/><br/><br/> */}
            {/*<TextField*/}
            {/*  id="signup-password-input"*/}
            {/*  label="Repeat password"*/}
            {/*  type="password"*/}
            {/*  autoComplete="new-password"*/}
            {/*/>*/}
            <br/><br/>
            <FormControlLabel control={
              <Checkbox
              size="medium"
              onChange={(e) => setRole(e.target.checked?"owner":"user")}
              />
            } label="I own charging stations" />

            <p className='signup-error-p' >{userExist}</p>
            
            <p className="signup-p">
              Already have an account?
            <a
              className="signup-link"
              href="/SignIn"
              rel="noopener noreferrer"
            >
              Sign in!
            </a>
            </p>
            <br/>
            <Button
                color="success"
                variant="contained"
                type="submit"
                onClick={handleRegister}
            >Submit</Button>
          <br/><br/>
        </div>
      </header>
    </div>
  );
}

export default Signup;
