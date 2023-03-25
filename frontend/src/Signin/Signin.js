import Signin_image from './EV-charging.png';
import './Signin.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signin() {
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
            />
            <br/><br/><br/>
            <TextField
              id="signin-password-input"
              label="Password"
              type="password"
              autoComplete="current-password"
            />
            <p className="signin-p">
              Don't have an account?
            <a
              className="signin-link"
              href=""
              rel="noopener noreferrer"
            >
              Sign up!
            </a>
            </p>
            <br/>
            <Button color="success" variant="contained">Submit</Button>
        </div>
      </header>
    </div>
  );
}

export default Signin;
