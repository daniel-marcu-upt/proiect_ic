import './Chargers.css';
import '../leaflet/leaflet.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import markerIconPng from "../leaflet/images/marker-icon.png"
import { Icon } from 'leaflet'
import {deleteValidStations, getCredentials, getValidStations} from "../App/App";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { MenuItem } from '@mui/material';
import Typography from "@mui/joy/Typography";


function Chargers(props) {
  let history = useHistory();
  const position = [45.7475404089335, 21.22641090881591];
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);
  // const [stationPlugs, setStationPlugs] = useState([]);
  // const [stationPlugsFull, setStationPlugsFull] = useState([]);
  // const [currentPlugValue, setCurrentPlugValue] = useState('');
  const [duration2, setDuration2] = useState(null);
  const [startTime, setStartTime] = useState(null);

  const [carIdd, specificCarStations] = getValidStations();


  useEffect( () => {
    const [userId, user, pass, role] = getCredentials();
    const [carId, specificCarStations] = getValidStations();



    if(specificCarStations !== undefined) {
      setStations(specificCarStations);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://127.0.0.1:8002/api/stations`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
          });
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          setStations(data["hydra:member"]);
        } catch (error) {
          setError(error.message);
        }
      }

      fetchData();
    }
  }, []); // <- add the count variable here

  // const handlePlugListOpen = async (stationId) => {
  //     try {
  //       const response = await fetch(`https://127.0.0.1:8002/api/get-specific-plugs/${carIdd}/${stationId}`, {
  //         method: "GET",
  //         headers: {"Content-Type": "application/json"},
  //       });
  //       const data = await response.json();
  //       if (!response.ok) {
  //         throw new Error(data.message);
  //       }
  //       const plugs = [];
  //       data.forEach((plug, index) => {
  //         plugs.push({ value: `${plug.name}`, label: `${plug.name} (${plug.type})` })
  //       });
  //       setStationPlugs(plugs);
  //       setStationPlugsFull(data);
  //     } catch (error) {
  //       setError(error.message);
  //     }
  // }

  // const handlePlugDropdown = (event) => {
  //   setCurrentPlugValue(event.target.value);
  // }

  const handleSubmitBooking = async (stationId) => {
    // const plugId = findPLugIdAfterName(currentPlugValue);
    const carId = parseInt(carIdd, 10);
    const duration = changeDurationFormat(duration2);
    let bookingId = null;
    try {
      const response = await fetch(`https://127.0.0.1:8002/api/bookings`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({duration, startTime, carId, stationId}),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
        bookingId = data.id;
    } catch (error) {
      setError(error.message);
    }

    try {
      const response = await fetch(`https://127.0.0.1:8002/api/add-booking-to-car/${carId}`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({bookingId}),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      history.push('/');
      history.go(0);
    } catch (error) {
      setError(error.message);
    }
    // history.go(0);
  }

  const changeDurationFormat = (duration) => {
    let hours = duration.split(':')[0];
    let minutes = duration.split(':')[1];
    let durationFormat = `PT${hours}H${minutes}M`;
    return durationFormat;
  }

  const changeDurationFormatInverse = (durationFormat) => {
    const regex = /PT(\d+)H(\d+)M/;
    const match = durationFormat.match(regex);

    if (match && match.length === 3) {
      const hours = match[1];
      const minutes = match[2];
      const duration = `${hours}:${minutes}`;
      return duration;
    }

    // Return the original format if the provided durationFormat is not in the expected format
    return durationFormat;
  };

  // const findPLugIdAfterName = (plugName) => {
  //   let plugId = null;
  //   stationPlugsFull.forEach((plug) => {
  //     if(plug.name === plugName) {
  //       plugId = plug.id;
  //     }
  //   });
  //   return plugId;
  // }

  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='chargers-h1'>
          Chargers
        </h1>
        <MapContainer
          style={{ width: "80%", height: "70vh" }}
          center={position} zoom={14} scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations.map((station) => (
              <Marker
                  key={station.id}
                  position={[station.latitude, station.longitude]}
                  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
              >
                <Popup>
                    <Grid
                        container
                        spacing={2}
                        direction="column"
                        alignItems="center"
                        justifyContent="center"
                        sx={{ minHeight: '10vh' }}
                    >
                      <Grid item >
                        <h2 style={{textAlign: "center"}}>Make a booking to the station {station.name}</h2>
                      </Grid>
                      <Grid item>
                        <TextField
                            type="datetime-local"
                            defaultValue="2023-05-30T00:00"
                            inputProps={{ min: "2023-05-30T00:00", max: "2024-12-31T00:00" }}
                            value={startTime}
                            onChange={(event) => {
                              setStartTime(event.target.value)
                            }}
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                            type="time"
                            defaultValue="00:00"
                            inputProps={{ min: "00:00", max: "23:59" }}
                            value={duration2}
                            onChange={(event) => {
                              setDuration2(event.target.value)
                            }}
                        />
                      </Grid>
                      {/*<Grid item*/}
                      {/*      onBlur={() =>handlePlugListOpen(station.id)}*/}
                      {/*>*/}
                      {/*  <TextField*/}
                      {/*      sx={{width: 150}}*/}
                      {/*      select*/}
                      {/*      label="Select an option"*/}
                      {/*      value={currentPlugValue}*/}
                      {/*      onChange={handlePlugDropdown}*/}
                      {/*      variant="outlined"*/}
                      {/*  >*/}
                      {/*    {stationPlugs.map((plug) => (*/}
                      {/*        <MenuItem key={plug.value} value={plug.value}>*/}
                      {/*          {plug.label}*/}
                      {/*        </MenuItem>*/}
                      {/*    ))}*/}
                      {/*  </TextField>*/}
                      {/*</Grid>*/}
                      <br/>
                      <Grid item>
                        {carIdd ?  <Button type="submit" variant="contained" color="success"
                        marginLeft="10px"
                                onClick={() => {
                                  handleSubmitBooking(station.id)
                                }}
                        >
                          Book
                        </Button> : <Typography level="body3" sx={{ mt: 2.5 }}>Select a car in order to make a booking</Typography>}
                      </Grid>
                    </Grid>
                  <br/>
                </Popup>
              </Marker>
          ))}
          {/*<Marker*/}
          {/*  position={[45.76, 21.22]}*/}
          {/*  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}*/}
          {/*>*/}
          {/*  <Popup>*/}
          {/*    Statie 1*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
          {/*<Marker*/}
          {/*  position={[45.7475, 21.226]}*/}
          {/*  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}*/}
          {/*>*/}
          {/*  <Popup>*/}
          {/*    Statie 2*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
        </MapContainer>
      </center>
    </div>
  );
}

export default Chargers;
