import Signup_image from './EV-charging.jpg';
import './Signup.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function Signup() {
  return (
    <div className="Signup">
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <header className="header">
        <div className="left">
          <img src={Signup_image} className="image" alt="logo" />
        </div>
        <div className="right">
          <h1>
            Sign Up
          </h1>
            <TextField
              id="email-input"
              label="Email"
              type="email"
              autoComplete="email"
            />
            <br/><br/><br/>
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
              autoComplete="new-password"
            />
            <br/><br/><br/>
            <TextField
              id="password-input"
              label="Repeat password"
              type="password"
              autoComplete="new-password"
            />
            <p>
              Already have an account?
            <a
              className="Signin-link"
              href=""
              rel="noopener noreferrer"
            >
              Sign in!
            </a>
            </p>
            <br/>
            <Button variant="contained">Submit</Button>
        </div>
      </header>
    </div>
  );
}

export default Signup;
