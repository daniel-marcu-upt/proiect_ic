import Signup_image from './EV-charging.png';
import './Signup.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

function Signup() {
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
            />
            <br/><br/><br/>
            <TextField
              id="signup-username-input"
              label="Username"
              type="text"
              autoComplete="username"
            />
            <br/><br/><br/>
            <TextField
              id="signup-password-input"
              label="Password"
              type="password"
              autoComplete="new-password"
            />
            <br/><br/><br/>
            <TextField
              id="signup-password-input"
              label="Repeat password"
              type="password"
              autoComplete="new-password"
            />
            <br/><br/>
            <FormControlLabel control={<Checkbox size="medium"/>} label="I own charging stations" />
            <p className="signup-p">
              Already have an account?
            <a
              className="signup-link"
              href=""
              rel="noopener noreferrer"
            >
              Sign in!
            </a>
            </p>
            <br/>
            <Button color="success" variant="contained">Submit</Button>
        </div>
      </header>
    </div>
  );
}

export default Signup;
