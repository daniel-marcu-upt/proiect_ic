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

function createData(plate, plug, details/*, booking*/) {
  return { plate, plug, details/*, booking*/ };
}

const rows = [
  createData("TM13DSA", "PLUG 1", "/EditCar/1", "/delete1"),
  createData("TM34ASD", "PLUG 2", "/EditCar/2", "/delete2"),
  createData("TM43SDA", "PLUG 1", "/EditCar/3", "/delete3"),
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
  return (
    <div>
      <Navbar username="Daniel"/>
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
                {/* <StyledTableCell align="center">Booking</StyledTableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.plate}>
                  <StyledTableCell component="th" scope="row"  align="center">
                    {row.plate}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.plug}</StyledTableCell>
                  <StyledTableCell align="center">
                    <Button variant="contained">
                      <a className='mycars-a' href={row.details}>Details</a>
                    </Button>
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">
                    <Button color="success" variant="contained">
                      <a className='mycars-a' href={row.booking}>Booking</a>
                    </Button>
                  </StyledTableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <br/><br/>
        <Button color="success" variant="contained">Add car</Button>
      </center>
    </div>
  );
}

export default MyCars;
