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


function createData(name, plug, location, price, details) {
  return { name, plug, location, price, details };
}

const rows = [
  createData("Incarcator kaufland", "PLUG 1", "45.76, 21.22", 1.2, "/Editcharger/1"),
  createData("Incarcator poli", "PLUG 2", "45.7475, 21.226", 1.1, "/EditCharger/2"),
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
  return (
    <div>
      <Navbar extra username="Daniel"/>
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
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row"  align="center">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.plug}</StyledTableCell>
                  <StyledTableCell align="center">{row.location}</StyledTableCell>
                  <StyledTableCell align="center">{row.price} RON/kW</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained">
                      <a className='mychargers-a' href={row.details}>Details</a>
                    </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/>
        <Button color="success" variant="contained">Add charger</Button>
      </center>
    </div>
  );
}

export default MyChargers;
