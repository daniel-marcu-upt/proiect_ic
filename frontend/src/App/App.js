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

export function saveCredentials(user, pass){
    cookies.set('username', user, { path: '/' });
    cookies.set('password', pass, { path: '/' });
}
export function deleteCredentials(){
    cookies.remove('username');
    cookies.remove('password');
}
export function checkAuth(){
    var user = cookies.get("username");
    // if(user != undefined)
      return true;
    // else
    //   return false;
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
          <PrivateRoute path="/MyChargers">
            <MyChargers />
          </PrivateRoute>
          <PrivateRoute path="/EditCharger">
            <EditCharger />
          </PrivateRoute>
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
