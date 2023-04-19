import './EditCharger.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

function EditCharger() {
  return (
    <div>
      <Navbar extra username="Daniel"/>
      <center>
        <h1 className='editcharger-h1'>
          Edit Charger
        </h1>
        <TextField
          label="Name"
          id="name"
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

        <TextField
          label="Latitude"
          id="lat"
          sx={{ m: 1, width: '24ch' }}
          variant="standard"
        />
        <TextField
          label="Longitude"
          id="lon"
          sx={{ m: 1, width: '24ch' }}
          variant="standard"
        />
        <br/>
        <TextField
          label="Price"
          id="price"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">lei/kW</InputAdornment>,
          }}
          variant="standard"
        />
        <br/>
        <br/>
        <Button color="success" variant="contained">Save</Button>
      </center>
    </div>
  );
}

export default EditCharger;
