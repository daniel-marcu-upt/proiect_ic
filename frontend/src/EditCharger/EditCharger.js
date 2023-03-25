import './EditCharger.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function EditCharger() {
  return (
    <div>
      <Navbar extra username="Daniel"/>

      <center>
        <br/>
        <Button color="success" variant="contained">Save</Button>
      </center>
    </div>
  );
}

export default EditCharger;
