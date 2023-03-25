import './MyCars.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function MyCars() {
  return (
    <div>
      <Navbar username="Daniel"/>
      <center>
        <h1 className='mycars-h1'>
          My Cars
        </h1>
        <br/>
        <Button color="success" variant="contained">Add car</Button>
      </center>
    </div>
  );
}

export default MyCars;
