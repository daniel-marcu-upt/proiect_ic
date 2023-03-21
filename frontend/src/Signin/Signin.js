import Signin_image from './EV-charging.jpg';
import './Signin.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signin() {
  return (
    <div className="Signin">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="header">
        <div className="left">
          <img src={Signin_image} className="image" alt="logo" />
        </div>
        <div className="right">
          <h1>
            Sign In
          </h1>
            <TextField
              id="username-input"
              label="Username"
              type="text"
              autoComplete="username"
            />
            <br/><br/><br/>
            <TextField
              id="password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <p>
              Don't have an account?
            <a
              className="Signin-link"
              href=""
              rel="noopener noreferrer"
            >
              Sign up!
            </a>
            </p>
            <br/>
            <Button variant="contained">Submit</Button>
        </div>
      </header>
    </div>
  );
}

export default Signin;
