import './MyChargers.css';
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
import {useEffect, useState} from "react";
import {deleteSelectedStationId, getCredentials, saveSelectedStationId} from "../App/App";


function createData(name, plug, location, price) {
  return { name, plug, location, price };
}

const rows = [
  createData("Incarcator kaufland", "PLUG 1", "45.76, 21.22", 1.2),
  createData("Incarcator poli", "PLUG 2", "45.7475, 21.226", 1.1),
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

function MyChargers() {
  const [userId, user, pass, role] = getCredentials();
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://127.0.0.1:8002/api/get-user-stations/${userId}`, {
          method: "GET",
          headers: {"Content-Type": "application/json"},
        });
        console.log("useEffect2");
        const data = await response.json();
        if (!response.ok) {
          console.log(data.message);
          throw new Error(data.message);
        }
        console.log("stations", data);
        setStations(data);
      } catch (error) {
        setError(error.message);
      }
    }

    fetchData();
  }, []); // <- add the count variable here



  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='mychargers-h1'>
          My Chargers
        </h1>
        <TableContainer className='mychargers-container' component={Paper}>
          <Table className='mychargers-table' sx={{ minWidth: 550 }} aria-label="custom table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Name</StyledTableCell>
                <StyledTableCell align="center">Plug Type</StyledTableCell>
                <StyledTableCell align="center">Location</StyledTableCell>
                <StyledTableCell align="center">Price</StyledTableCell>
                <StyledTableCell align="center">Details</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stations.map((station) => (
                <StyledTableRow key={station.name}>
                  <StyledTableCell component="th" scope="row"  align="center">
                    {station.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{station.plug}</StyledTableCell>
                  <StyledTableCell align="center">{station.location}</StyledTableCell>
                  <StyledTableCell align="center">{station.price} RON/kW</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained"
                    onClick={() => {
                      saveSelectedStationId(station.id)
                    }}
                    >
                      <a className='mychargers-a' href={"/EditCharger/" + station.name}>Details</a>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/>
        <Button color="success" variant="contained"
                onClick={() => {
                  deleteSelectedStationId()
                }}
        >
          <a className='mychargers-a' href="/EditCharger/">New charger</a>
        </Button>
      </center>
    </div>
  );
}

export default MyChargers;
