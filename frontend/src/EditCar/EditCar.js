import './EditCar.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditCar() {
  return (
    <div>
      <Navbar username="Daniel"/>

      <center>
        <br/>
        <Button color="success" variant="contained">Save</Button>
      </center>
    </div>
  );
}

export default EditCar;
