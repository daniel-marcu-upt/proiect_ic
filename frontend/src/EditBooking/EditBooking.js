import './EditBooking.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import { DateTimePicker,LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'

function EditBooking() {
  return (
    <div>
      <Navbar extra username="Daniel"/>
      <center>
        <h1 className='editbooking-h1'>
          Edit Booking
        </h1>
        <TextField
          label="Charger"
          id="name"
          sx={{ m: 1, width: '50ch' }}
          variant="standard"
          defaultValue="Incarcator kaufland"
          disabled
        />
        <br/>
        <br/>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateTimePicker label="Booking time" defaultValue={dayjs()}/>
        </LocalizationProvider>
        &emsp;&emsp;
        <TextField
          label="Time"
          id="time"
          sx={{ m: 1, width: '20ch' }}
          InputProps={{
            endAdornment: <InputAdornment position="end">hours</InputAdornment>,
          }}
          variant="standard"
        />
        <br/>
        <br/>
        <Button color="success" variant="contained">Save</Button>
        <br/>
        <br/>
        <Button color="error" variant="contained">Delete booking</Button>
      </center>
    </div>
  );
}

export default EditBooking;
