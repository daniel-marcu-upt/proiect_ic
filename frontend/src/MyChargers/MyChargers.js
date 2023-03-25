import './MyChargers.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function MyChargers() {
  return (
    <div>
      <Navbar extra username="Daniel"/>
      <center>
        <h1 className='mychargers-h1'>
          My Chargers
        </h1>
        <br/>
        <Button color="success" variant="contained">Add charger</Button>
      </center>
    </div>
  );
}

export default MyChargers;
