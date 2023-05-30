import './EditCar.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {useHistory} from "react-router-dom";
import {useEffect, useState} from "react";
import {deleteCarData, getCarData, getCredentials} from "../App/App";

function EditCar() {
  

  let history = useHistory();
  //const [username, setUsername] = useState("");
  let [plate, setPlate] = useState("");
  let [plugType, setPlugType] = useState("");
  let [carId, setCarId] = useState("");
  let [carName, setCarName] = useState("");
  let [carImgUrl, setCarImgUrl] = useState("");
  let [init, setInit] = useState(0);

  const handleRequest = async (e) => {
    e.preventDefault();
    let [user_id, username, pass, role] = getCredentials();
    console.log(JSON.stringify({username, plate, plugType}));
    if(plate != ""){
      const response = await fetch("https://127.0.0.1:8002/api/post-car", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id, plate, plugType, carName, carImgUrl}),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    }
    console.log("request done");
    history.push('/');
    history.go(0);
    // request successful, redirect to home page or do something else
      
  };
  const handleEdit = async (e) => {
    e.preventDefault();
    let [user_id, username, pass, role] = getCredentials();
    console.log(JSON.stringify({user_id, carId, plate, plugType}));
    if(plate != ""){
      const response = await fetch("https://127.0.0.1:8002/api/edit-car", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({user_id, carId, plate, plugType, carName, carImgUrl}),
      });
      console.log(response);
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData.message);
      }
    }
    console.log("request done");
    deleteCarData();
    history.push('/');
    history.go(0);
    // request successful, redirect to home page or do something else
      
  };

  const handleDelete = async(e) =>{

    e.preventDefault();
    let [user_id, username, pass, role] = getCredentials();
    console.log(JSON.stringify({user_id, carId}));
    const response = await fetch("https://127.0.0.1:8002/api/delete-car", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({user_id, carId}),
    });
    console.log(response);
    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData.message);
    }
    const j = await response.json();
    console.log(j);
    console.log("request done");
    
    deleteCarData();
    history.push('/');
    history.go(0);
    // request successful, redirect to home page or do something else
  };

  let [fct, setFct] = useState(0);
  const func = [handleRequest, handleEdit];

  if(init == 0){
    setInit(1);
    let car = getCarData();
    console.log(car);

    if(car != undefined){
      setFct(1);
      setPlate(car.plate);
      setPlugType(car.plug);
      setCarId(car.id);
      setCarName(car.name);
      setCarImgUrl(car.imgUrl);
  }
}


  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='editcar-h1'>
          Edit Car
        </h1>
        <br/>
        <TextField
            id="name"
            label="Name"
            type="text"
            sx={{ m: 1, width: '50ch' }}
            variant="standard"
            required
            value={carName}
            onChange={(e)=> setCarName(e.target.value)}
        />
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
        <TextField
            id="imgUrl"
            label="Image URL"
            type="text"
            sx={{ m: 1, width: '50ch' }}
            variant="standard"
            required
            value={carImgUrl}
            onChange={(e)=> setCarImgUrl(e.target.value)}
        />
        <br/>
        <br />
        <Button color="success" variant="contained" onClick={func[fct]}>Save</Button>
        
        <br/>
        <br />
        <Button color="error" variant="contained" onClick={handleDelete}>Delete car</Button>
      </center>
    </div>
  );
}

export default EditCar;
