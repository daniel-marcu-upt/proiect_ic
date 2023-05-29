import './MyCars.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {
  deleteCarData,
  deleteValidStations,
  getCredentials,
  getValidStations, saveBookingId, saveCarData,
  saveCredentials,
  saveValidStations
} from "../App/App";
import {useHistory} from "react-router-dom";
import {useState, useEffect} from "react";

function createData(plate, plug, booking) {
  return { plate, plug, booking };
}

const cars = [
  createData("TM13DSA", "PLUG 1", ""),
  createData("TM34ASD", "PLUG 2", ""),
  createData("TM43SDA", "PLUG 1", "1234"),
];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: '#efefef',
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function MyCars() {
  let history = useHistory();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {
    deleteCarData();
    const [userId, user, pass, role] = getCredentials();
    const fetchData = async () => {
    try {
      const response = await fetch(`https://127.0.0.1:8002/api/get-cars/${userId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      console.log("useEffect2");
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message);
      }
      setCars(data);
    } catch (error) {
      setError(error.message);
    }
  }

  fetchData();
  }, []); // <- add the count variable here

  const getSpecificUserPlugs = async (carId) =>  {
    try {
      const response = await fetch(`https://127.0.0.1:8002/api/get-specific-car-stations/${carId}`, {
        method: "GET",
        headers: {"Content-Type": "application/json"},
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        throw new Error(data.message);
      }
      saveValidStations(carId, data);
      history.push(`/Chargers/${carId}`);
      history.go(0);

    } catch (error) {
      setError(error.message);
    }
  }
  const handleEdit = async(car) => {
    saveCarData(car);
    history.push(`/EditCar/${car.id}`);
    history.go(0);
  };


  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='mycars-h1'>
          My Cars
        </h1>
        <TableContainer className='mycars-container' component={Paper}>
          <Table className='mycars-table' sx={{ minWidth: 550 }} aria-label="custom table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Plate</StyledTableCell>
                <StyledTableCell align="center">Plug Type</StyledTableCell>
                <StyledTableCell align="center">Details</StyledTableCell>
                <StyledTableCell align="center">Chargers</StyledTableCell>
                <StyledTableCell align="center">Booking</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cars.map((car) => (
                <StyledTableRow key={car.plate}>
                  <StyledTableCell component="th" scope="car"  align="center">
                    {car.plate}
                  </StyledTableCell>

                  <StyledTableCell align="center">{car.plug}</StyledTableCell>

                  <StyledTableCell align="center">
                    <Button variant="contained" onClick={()=>{handleEdit(car)}}>
                      Details
                    </Button>
                  </StyledTableCell>

                  <StyledTableCell align="center">
                    <Button variant="contained"
                            onClick={() => {
                              getSpecificUserPlugs(car.id);
                            }}
                    >
                      <a className='mycars-a' >View chargers</a>
                    </Button>
                  </StyledTableCell>
                  
                  {car.bookingId === null  ? (
                    <StyledTableCell align="center">No booking available</StyledTableCell>
                  ):(
                    <StyledTableCell align="center">
                      <Button variant="contained"
                      onClick={() =>{
                          saveBookingId(car.bookingId)
                          getSpecificUserPlugs(car.id);
                      }}
                      >
                        <a className='mycars-a' href={"/EditBooking/"+car.bookingId}>View booking</a>
                      </Button>
                    </StyledTableCell>
                  )}

                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/>
        <Button color="success" variant="contained">
          <a className='mycars-a' href="/EditCar/">
            Add car
          </a>
        </Button>
      </center>
    </div>
  );
}

export default MyCars;
