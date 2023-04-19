import logo from '../logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Signup from '../Signup/Signup';
import Signin from '../Signin/Signin';
import MyCars from '../MyCars/MyCars';
import EditCar from '../EditCar/EditCar';
import Chargers from '../Chargers/Chargers';
import MyChargers from '../MyChargers/MyChargers';
import EditCharger from '../EditCharger/EditCharger';

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
          <Route path="/MyCars">
            <MyCars />
          </Route>
          <Route path="/EditCar">
            <EditCar />
          </Route>
          <Route path="/Chargers">
            <Chargers />
          </Route>
          <Route path="/MyChargers">
            <MyChargers />
          </Route>
          <Route path="/EditCharger">
            <EditCharger />
          </Route>
          <Route path="/">
            <MyCars />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
