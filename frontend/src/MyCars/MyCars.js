import './MyCars.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/joy/Button';
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
import Card from '@mui/joy/Card';
import Typography from '@mui/joy/Typography';
import IconButton from "@mui/joy/IconButton";
import {AspectRatio} from "@mui/joy";
import Box from "@mui/joy/Box";

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
        {/*<h1 className='mycars-h1'>*/}
        {/*  My Cars*/}
        {/*</h1>*/}
        <br/>
        <Typography level="h1">My Cars</Typography>

        {/*<TableContainer className='mycars-container' component={Paper}>*/}
        {/*  <Table className='mycars-table' sx={{ minWidth: 550 }} aria-label="custom table">*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        <StyledTableCell align="center">Plate</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Plug Type</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Details</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Chargers</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Booking</StyledTableCell>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody>*/}
        {/*      {cars.map((car) => (*/}
        {/*        <StyledTableRow key={car.plate}>*/}
        {/*          <StyledTableCell component="th" scope="car"  align="center">*/}
        {/*            {car.plate}*/}
        {/*          </StyledTableCell>*/}

        {/*          <StyledTableCell align="center">{car.plug}</StyledTableCell>*/}

        {/*          <StyledTableCell align="center">*/}
        {/*            <Button variant="contained" onClick={()=>{handleEdit(car)}}>*/}
        {/*              Details*/}
        {/*            </Button>*/}
        {/*          </StyledTableCell>*/}

        {/*          <StyledTableCell align="center">*/}
        {/*            <Button variant="contained"*/}
        {/*                    onClick={() => {*/}
        {/*                      getSpecificUserPlugs(car.id);*/}
        {/*                    }}*/}
        {/*            >*/}
        {/*              <a className='mycars-a' >View chargers</a>*/}
        {/*            </Button>*/}
        {/*          </StyledTableCell>*/}

        {/*          {car.bookingId === null  ? (*/}
        {/*            <StyledTableCell align="center">No booking available</StyledTableCell>*/}
        {/*          ):(*/}
        {/*            <StyledTableCell align="center">*/}
        {/*              <Button variant="contained"*/}
        {/*              onClick={() =>{*/}
        {/*                  saveBookingId(car.bookingId)*/}
        {/*                  getSpecificUserPlugs(car.id);*/}
        {/*              }}*/}
        {/*              >*/}
        {/*                <a className='mycars-a' href={"/EditBooking/"+car.bookingId}>View booking</a>*/}
        {/*              </Button>*/}
        {/*            </StyledTableCell>*/}
        {/*          )}*/}

        {/*        </StyledTableRow>*/}
        {/*      ))}*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
        {/*<br/>*/}
        {/*<Button color="success" variant="contained">*/}
        {/*  <a className='mycars-a' href="/EditCar/">*/}
        {/*    Add car*/}
        {/*  </a>*/}
        {/*</Button>*/}
        <br />
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          {cars.map((item, index) => (
              <Card key={index} variant="outlined" sx={{ width: 320, marginBottom: '1rem' }}>
                <Typography level="h2" fontSize="md" sx={{ mb: 0.5 }}>
                  {item.name}
                </Typography>
                <IconButton
                    aria-label={`bookmark ${item.name}`}
                    variant="plain"
                    color="neutral"
                    size="sm"
                    sx={{ position: 'absolute', top: '0.5rem', right: '0.5rem' }}
                >
                  {/*<BookmarkAdd />*/}
                </IconButton>
                <AspectRatio minHeight="120px" maxHeight="200px" sx={{ my: 2 }}>
                  <img src={item.imgUrl} srcSet={`${item.imgUrl} 2x`} loading="lazy" alt="" />
                </AspectRatio>
                <Box sx={{ display: 'flex' }}>
                  <div>
                    <Typography level="body3">Plate:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      {item.plate}
                    </Typography>
                  </div>
                  <Button
                      variant="solid"
                      size="sm"
                      color="success"
                      aria-label={`Explore ${item.title}`}
                      sx={{ ml: 'auto', fontWeight: 600 }}
                      onClick={()=>{handleEdit(item)}}
                  >
                    Details
                  </Button>
                </Box>
                <br />
                <Box sx={{ display: 'flex' }}>
                  <div>
                    <Typography level="body3">PlugType:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      {item.plug}
                    </Typography>
                  </div>
                  <Button
                      variant="solid"
                      size="sm"
                      color="success"
                      aria-label={`Explore ${item.title}`}
                      sx={{ ml: 'auto', fontWeight: 600 }}
                      onClick={() => {
                        getSpecificUserPlugs(item.id);
                      }}
                  >
                    <a className='mycars-a' >view chargers</a>
                  </Button>
                </Box>
                <br />
                <Box>
                  {item.bookingId !== null  ? (
                  <Button
                      variant="solid"
                      size="sm"
                      color="success"
                      aria-label={`Explore ${item.title}`}
                      sx={{ ml: 'auto', fontWeight: 600, height: 46 }}
                      onClick={() =>{
                        saveBookingId(item.bookingId)
                        getSpecificUserPlugs(item.id);
                      }}
                  >
                    <a className='mycars-a' href={"/EditBooking/"+item.bookingId}>view bookings</a>
                  </Button>) : (
                  <Typography level="body3" sx={{ mt: 2.5 }}>No booking available</Typography>
                  )}
                </Box>
              </Card>
          ))}
        </div>
        <br />
        <Button variant="solid"
                size="sm"
                color="success"
                aria-label={`Add car`}
                sx={{ ml: 'auto', fontWeight: 600, height: 46 }}>
          <a className='mycars-a' href="/EditCar/">
            Add car
          </a>
        </Button>
        <br/><br/>
      </center>
    </div>
  );
}

export default MyCars;
