import './EditCar.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditCar() {
  return (
    <div>
      <Navbar username="Daniel" />
      <center>
        <h1 className='editcar-h1'>
          Edit Car
        </h1>
        
        <TextField
          label="Plate"
          id="plate"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
        />
        <br/>
        <TextField
          label="Plug type"
          id="plug"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
        />
        <br/>
        <br />
        <Button color="success" variant="contained">Save</Button>
        
        <br/>
        <br />
        <Button color="error" variant="contained">Delete car</Button>
      </center>
    </div>
  );
}

export default EditCar;
