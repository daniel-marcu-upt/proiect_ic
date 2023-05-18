import logo from '../logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
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

export function saveCredentials(user, pass, role){
    cookies.set('username', user, { path: '/' });
    cookies.set('password', pass, { path: '/' });
    cookies.set('role', role, { path: '/' });
}
export function deleteCredentials(){
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
  var user = cookies.get("username");
  var pass = cookies.get("password");
  var role = cookies.get("role");
  return [user, pass, role];
}
export function checkOwner(){
  var role = cookies.get("role");
  if(role == "owner" && checkAuth())
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
          <PrivateRoute path="/">
            <MyCars />
          </PrivateRoute>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
