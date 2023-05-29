import './EditBooking.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DateTimePicker,LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import Grid from "@mui/material/Grid";
import {MenuItem} from "@mui/material";
import {useState, useEffect} from "react";
import {getBookingId, getCredentials, getValidStations} from "../App/App";
import {useHistory} from "react-router-dom";

function EditBooking() {
    const options = [
        { value: 'option1', label: 'Option 1' },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
    ];

    let history = useHistory();
    const [error, setError] = useState(null);
    // const [stationPlugs, setStationPlugs] = useState([]);
    // const [stationPlugsFull, setStationPlugsFull] = useState([]);
    // const [currentPlugValue, setCurrentPlugValue] = useState('');
    const [duration2, setDuration2] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [stationId, setStationId] = useState(null);

    const [carIdd, specificCarStations] = getValidStations();
    const bookingId = getBookingId();

    const changeDurationFormatInverse = (durationFormat) => {
        const regex = /P(?:\d+Y)?(?:\d+M)?(?:\d+DT)?(?:(\d+)H)?(?:(\d+)M)?(?:\d+S)?/;
        const match = durationFormat.match(regex);

        if (match) {
            const hours = match[1] ? match[1].padStart(2, '0') : '00';
            const minutes = match[2] ? match[2].padStart(2, '0') : '00';
            const duration = `${hours}:${minutes}`;
            return duration;
        }

        // Return the original format if the provided durationFormat is not in the expected format
        return durationFormat;
    };

    useEffect( () => {

            const fetchData = async () => {
                try {
                    const response = await fetch(`https://127.0.0.1:8002/api/get-station-after-booking/${bookingId}`, {
                        method: "GET",
                        headers: {"Content-Type": "application/json"},
                    });
                    const data = await response.json();
                    if (!response.ok) {
                        throw new Error(data.message);
                    }
                    setStationId(data.id);
                    fetchDataBooking();
                } catch (error) {
                    setError(error.message);
                }
            }

        // const handlePlugListOpen = async (stationId) => {
        //     try {
        //         const response = await fetch(`https://127.0.0.1:8002/api/get-specific-plugs/${carIdd}/${stationId}`, {
        //             method: "GET",
        //             headers: {"Content-Type": "application/json"},
        //         });
        //         const data = await response.json();
        //         if (!response.ok) {
        //             throw new Error(data.message);
        //         }
        //         const plugs = [];
        //         data.forEach((plug, index) => {
        //             plugs.push({ value: `${plug.name}`, label: `${plug.name} (${plug.type})` })
        //         });
        //         setStationPlugs(plugs);
        //         setStationPlugsFull(data);
        //         fetchDataBooking(data);
        //     } catch (error) {
        //         setError(error.message);
        //     }
        // }

        const fetchDataBooking = async () => {
            try {
                const response = await fetch(`https://127.0.0.1:8002/api/bookings/${bookingId}`, {
                    method: "GET",
                    headers: {"Content-Type": "application/json"},
                });
                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.message);
                }
                setStartTime(data.startTime.substring(0, 16));
                setDuration2(changeDurationFormatInverse(data.duration));
                // setCurrentPlugValue(findPlugNameAfterId(listOfPLugs, data.plugId));

            } catch (error) {
                setError(error.message);
            }
        }

        fetchData();
    }, []); // <- add the count variable here

    const findPlugNameAfterId = (listOfPLugs, plugId) => {
        let plugName = null;
        listOfPLugs.forEach((plug) => {
            if(plug.id === plugId) {
                plugName = plug.name;
            }
        });
        return plugName;
    }

    // const handlePlugDropdown = (event) => {
    //     setCurrentPlugValue(event.target.value);
    // }

    // const findPLugIdAfterName = (plugName) => {
    //     let plugId = null;
    //     stationPlugsFull.forEach((plug) => {
    //         if(plug.name === plugName) {
    //             plugId = plug.id;
    //         }
    //     });
    //     return plugId;
    // }

    const changeDurationFormat = (duration) => {
        let hours = duration.split(':')[0];
        let minutes = duration.split(':')[1];
        let durationFormat = `PT${hours}H${minutes}M`;
        return durationFormat;
    }

    const handleModifyBooking = async () => {
        const carId = parseInt(carIdd, 10);
        // const plugId = findPLugIdAfterName(currentPlugValue);
        const duration = changeDurationFormat(duration2);
        try {
            const response = await fetch(`https://127.0.0.1:8002/api/bookings/${bookingId}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({duration, startTime, carId, stationId}),
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

    const handleDeleteBooking = async () => {
        try {
            const response = await fetch(`https://127.0.0.1:8002/api/bookings/${bookingId}`, {
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
    }

    const deleteCarBookingId = async (listOfPLugs) => {
        try {
            const response = await fetch(`https://127.0.0.1:8002/api/delete_car_booking/${carIdd}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
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
    }



  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='editbooking-h1'>
          Edit Booking
        </h1>
          <Grid
              container
              spacing={2}
              direction="column"
              alignItems="center"
              justifyContent="center"
              sx={{ minHeight: '10vh' }}
          >
              <Grid item >
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
              {/*      // onBlur={() =>handlePlugListOpen(station.id)}*/}
              {/*>*/}
              {/*    <TextField*/}
              {/*        sx={{width: 150}}*/}
              {/*        select*/}
              {/*        label="Select an option"*/}
              {/*        value={currentPlugValue}*/}
              {/*        onChange={handlePlugDropdown}*/}
              {/*        variant="outlined"*/}
              {/*    >*/}
              {/*        {stationPlugs.map((plug) => (*/}
              {/*            <MenuItem*/}
              {/*                key={plug.value}*/}
              {/*                value={plug.value}*/}
              {/*            >*/}
              {/*                {plug.label}*/}
              {/*            </MenuItem>*/}
              {/*        ))}*/}
              {/*    </TextField>*/}
              {/*</Grid>*/}
          </Grid>
        <br/>
        <br/>
        <Button color="success" variant="contained"
            onClick={() => {
                handleModifyBooking()
            }}
        >Save</Button>
        <br/>
        <br/>
        <Button color="error" variant="contained"
                onClick={() => {
                    handleDeleteBooking()
                    deleteCarBookingId()
                }}
        >Delete booking</Button>
      </center>
    </div>
  );
}

export default EditBooking;
