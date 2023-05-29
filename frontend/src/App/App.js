import './App.css';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import Cookies from 'universal-cookie';

import Signup from '../Signup/Signup';
import Signin from '../Signin/Signin';
import MyCars from '../MyCars/MyCars';
import EditCar from '../EditCar/EditCar';
import Chargers from '../Chargers/Chargers';
import MyChargers from '../MyChargers/MyChargers';
import EditCharger from '../EditCharger/EditCharger';
import EditBooking from '../EditBooking/EditBooking';

const cookies = new Cookies();

export function saveCredentials(id, user, pass, role){
    cookies.set('id', id, { path: '/' });
    cookies.set('username', user, { path: '/' });
    cookies.set('password', pass, { path: '/' });
    cookies.set('role', role, { path: '/' });
}
export function deleteCredentials(){
    cookies.remove('id');
    cookies.remove('username');
    cookies.remove('password');
    cookies.remove('role');
}
export function checkAuth(){
    var user = cookies.get("username");
    if(user != undefined)
      return true;
    else
      return false;
}
export function getCredentials(){
  var id = cookies.get("id");
  var user = cookies.get("username");
  var pass = cookies.get("password");
  var role = cookies.get("role");
  return [id, user, pass, role];
}
export function checkOwner(){
  var role = cookies.get("role");
  if(role == "admin" && checkAuth())
    return true;
  return false;
}


function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return checkAuth() === true ? (
          children
        ) : (
          <Redirect to="/SignIn" />
        );
      }}
    />
  );
}
function OwnerRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => {
        return checkOwner() === true ? (
          children
        ) : (
          <Redirect to="/" />
        );
      }}
    />
  );
}
function LogoutRoute({ children, ...rest }) {
  deleteCredentials();
  return (
    <Route
      {...rest}
      render={() => {
        return  (
          <Redirect to="/SignIn" />
        );
      }}
    />
  );
}

export function saveValidStations(carId, validStations){
    cookies.set('carId', carId, { path: '/' });
    cookies.set('validStations', validStations, { path: '/' });
}

export function getValidStations(){
    var catId = cookies.get("carId");
    var spStations = cookies.get("validStations");
    return [catId, spStations];
}

export function deleteValidStations(){
    cookies.remove('carId');
    cookies.remove('validStations');
}
export function saveCarData(car){
    cookies.set('car', car, { path: '/' });
}

export function getCarData(){
    return cookies.get("car");
}

export function deleteCarData(){
    cookies.remove('car');
}

export function saveBookingId(bookingId){
    cookies.set('bookingId', bookingId, { path: '/' });
}

export function getBookingId(){
    return cookies.get("bookingId");
}

export function deleteBookingId(){
    cookies.remove('bookingId');
}

export function saveSelectedStationId(bookingId){
    cookies.set('stationId', bookingId, { path: '/' });
}

export function getSelectedStationId(){
    return cookies.get("stationId");
}

export function deleteSelectedStationId(){
    cookies.remove('stationId');
}


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <PrivateRoute path="/MyCars">
            <MyCars />
          </PrivateRoute>
          <PrivateRoute path="/EditCar">
            <EditCar />
          </PrivateRoute>
          <PrivateRoute path="/Chargers">
            <Chargers />
          </PrivateRoute>
          <OwnerRoute path="/MyChargers">
            <MyChargers />
          </OwnerRoute>
          <OwnerRoute path="/EditCharger">
            <EditCharger />
          </OwnerRoute>
          <PrivateRoute path="/EditBooking">
            <EditBooking />
          </PrivateRoute>
          <LogoutRoute path="/logout">
            <Signin />
          </LogoutRoute>
          <PrivateRoute path="/Dashboard">
            <MyCars />
          </PrivateRoute>
          <PrivateRoute path="/">
            <MyCars />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
