import './EditCar.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {getCredentials} from "../App/App";

function EditCar() {
  let history = useHistory();
  //const [username, setUsername] = useState("");
  const [plate, setPlate] = useState("");
  const [plugType, setPlugType] = useState("");

  const handleRequest = async (e) => {
    e.preventDefault();
    const [username, password] = getCredentials();
    console.log(JSON.stringify({username, plate, plugType}));
    const response = await fetch("http://127.0.0.1:8002/post-car", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({username, plate, plugType}),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    }
    console.log("request done");
    history.push('/');
    history.go(0);
    // request successful, redirect to home page or do something else
      
  };


  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='editcar-h1'>
          Edit Car
        </h1>
        
        <TextField
          id="plate"
          label="Plate"
          type="text"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
          required
          value={plate}
          onChange={(e) => setPlate(e.target.value)}
        />
        <br/>
        <TextField
          id="plug"
          label="Plug type"
          type="text"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
          required
          value={plugType}
          onChange={(e)=> setPlugType(e.target.value)}
        />
        <br/>
        <br />
        <Button color="success" variant="contained" onClick={handleRequest}>Save</Button>
        
        <br/>
        <br />
        <Button color="error" variant="contained">Delete car</Button>
      </center>
    </div>
  );
}

export default EditCar;
