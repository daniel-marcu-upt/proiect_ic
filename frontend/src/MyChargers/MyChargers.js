import './MyChargers.css';
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
import {useEffect, useState} from "react";
import {deleteSelectedStationId, getCredentials, saveBookingId, saveSelectedStationId} from "../App/App";
import Card from "@mui/joy/Card";
import Typography from "@mui/joy/Typography";
import IconButton from "@mui/joy/IconButton";
import {AspectRatio} from "@mui/joy";
import Box from "@mui/joy/Box";


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

const data = [
  { bookingId: null, title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  { title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  { title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  { title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  { title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  { title: 'Tesla Model S', imageSrc: 'https://www.autocritica.ro/wp-content/uploads/2021/06/Tesla-Model-S-PLAID-web.jpeg', price: '$2,900', details: 'Details', viewChargers: 'View chargers', viewBooking: 'View booking' },
  // Add more data objects for each card you want to display
];

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
        <br/> <br/>
        <Typography level="h1">My Chargers</Typography>
        <br/> <br/>
        {/*<TableContainer className='mychargers-container' component={Paper}>*/}
        {/*  <Table className='mychargers-table' sx={{ minWidth: 550 }} aria-label="custom table">*/}
        {/*    <TableHead>*/}
        {/*      <TableRow>*/}
        {/*        <StyledTableCell align="center">Name</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Plug Type</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Location</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Price</StyledTableCell>*/}
        {/*        <StyledTableCell align="center">Details</StyledTableCell>*/}
        {/*      </TableRow>*/}
        {/*    </TableHead>*/}
        {/*    <TableBody>*/}
        {/*      {stations.map((station) => (*/}
        {/*        <StyledTableRow key={station.name}>*/}
        {/*          <StyledTableCell component="th" scope="row"  align="center">*/}
        {/*            {station.name}*/}
        {/*          </StyledTableCell>*/}
        {/*          <StyledTableCell align="center">{station.plug}</StyledTableCell>*/}
        {/*          <StyledTableCell align="center">{station.location}</StyledTableCell>*/}
        {/*          <StyledTableCell align="center">{station.price} RON/kW</StyledTableCell>*/}
        {/*          <StyledTableCell align="center">*/}
        {/*            <Button variant="contained"*/}
        {/*            onClick={() => {*/}
        {/*              saveSelectedStationId(station.id)*/}
        {/*            }}*/}
        {/*            >*/}
        {/*              <a className='mychargers-a' href={"/EditCharger/" + station.name}>Details</a>*/}
        {/*            </Button>*/}
        {/*          </StyledTableCell>*/}
        {/*        </StyledTableRow>*/}
        {/*      ))}*/}
        {/*    </TableBody>*/}
        {/*  </Table>*/}
        {/*</TableContainer>*/}
        {/*<br/><br/>*/}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', maxWidth: '1200px', margin: '0 auto' }}>
          {stations.map((item, index) => (
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
                    <Typography level="body3">Location:</Typography>
                    <Typography fontSize="lg" fontWeight="lg">
                      {item.location}
                    </Typography>
                  </div>
                  <div>
                    <Typography level="body3" sx={{ ml: '130px'}}>Price:</Typography>
                    <Typography fontSize="lg" fontWeight="lg" sx={{ ml: '130px'}}>
                      {item.price} Lei/kW
                    </Typography>
                    </div>
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
                      sx={{ ml: 'auto', fontWeight: 600, width: 130 }}
                      onClick={() => {
                        saveSelectedStationId(item.id)
                      }}
                  >
                    <a className='mychargers-a' href={"/EditCharger/" + item.name}>Details</a>
                  </Button>
                </Box>
              </Card>
          ))}
        </div>
        <br/>
        <Button variant="solid"
                size="sm"
                color="success"
                aria-label={`Add charger`}
                sx={{fontWeight: 600, width: 130, height: 46 }}
                onClick={() => {
                  deleteSelectedStationId()
                }}
        >
          <br/><br/>
          <a className='mychargers-a' href="/EditCharger/">New charger</a>
          <br/><br/>
        </Button>
      </center>
    </div>
  );
}

export default MyChargers;
