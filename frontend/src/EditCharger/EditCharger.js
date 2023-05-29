import './EditCharger.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import {getCredentials, getSelectedStationId} from "../App/App";
import {useState, useEffect} from "react";
import {useHistory} from "react-router-dom";

function EditCharger() {

  let history = useHistory();
  const selectedStationId = getSelectedStationId();
  const [userId2, user, pass, role] = getCredentials();
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [plugType, setPlugType] = useState('');
  const [latitude2, setLatitude] = useState('');
  const [longitude2, setLongitude] = useState('');
  const [location, setLocation] = useState('');
  const [price2, setPrice2] = useState('');

  useEffect( () => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://127.0.0.1:8002/api/stations/${selectedStationId}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log("data", data);
        setName(data.name);
        setPlugType(data.plugType);
        setLongitude(data.longitude);
        setLatitude(data.latitude);
        setLocation(data.location);
        setPrice2(data.price);

      } catch (error) {
        setError(error.message);
      }
    }

    if (selectedStationId !== undefined){
      fetchData();
    }
  }, []); // <- add the count variable here

  const handleSaveCharger = async () => {
    const price = parseInt(price2, 10);
    const userId = parseInt(userId2, 10);
    const latitude = parseFloat(latitude2, 10);
    const longitude = parseFloat(longitude2, 10);
    console.log("price", selectedStationId);


    if(selectedStationId === undefined) {
      try {
        const response = await fetch(`https://127.0.0.1:8002/api/stations`, {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name, plugType, latitude, longitude, price, userId}),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log("data", data);

      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        const response = await fetch(`https://127.0.0.1:8002/api/stations/${selectedStationId}`, {
          method: "PUT",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({name, plugType, latitude, longitude, price, userId}),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }
        console.log("data", data);

      } catch (error) {
        setError(error.message);
      }
    }
    history.push('/Mychargers');
    history.go(0);
  }

  const handleDeleteCharger = async () => {
    if (selectedStationId !== undefined) {
      try {
        const response = await fetch(`https://127.0.0.1:8002/api/stations/${selectedStationId}`, {
          method: "DELETE",
          headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message);
        }

      } catch (error) {
        setError(error.message);
      }
      history.push('/Mychargers');
      history.go(0);
    }
  }


  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='editcharger-h1'>
          Edit Charger
        </h1>
        <TextField
          label="Name"
          value={name}
          onChange={(event) => {
            setName(event.target.value)
          }}
          id="name"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
        />
        <br/>
        <TextField
          label="Plug type"
          value={plugType}
          onChange={(event) => {
            setPlugType(event.target.value)
          }}
          id="plug"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
        />
        <br/>

        <TextField
          label="Latitude"
          value={latitude2}
          onChange={(event) => {
            setLatitude(event.target.value)
          }}
          id="lat"
          sx={{ m: 1, width: '24ch' }}
          variant="standard"
        />
        <TextField
          label="Longitude"
          value={longitude2}
          onChange={(event) => {
            setLongitude(event.target.value)
          }}
          id="lon"
          sx={{ m: 1, width: '24ch' }}
          variant="standard"
        />
        <br/>
        <TextField
          label="Price"
          value={price2}
          onChange={(event) => {
            setPrice2(event.target.value)
          }}
          id="price"
          sx={{ m: 1, width: '50ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">lei/kW</InputAdornment>,
          }}
          variant="standard"
        />
        <br/>
        <br/>
        <Button color="success" variant="contained"
                onClick={() => {
                  handleSaveCharger()
                }}
        >Save</Button>
        <br/>
        <br />
        <Button color="error" variant="contained"
                onClick={() => {
                  handleDeleteCharger()
                }}
        >Delete charger</Button>
      </center>
    </div>
  );
}

export default EditCharger;
