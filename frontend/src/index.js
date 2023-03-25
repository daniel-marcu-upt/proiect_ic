import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import Signup from './Signup/Signup';
import Signin from './Signin/Signin';
import MyCars from './MyCars/MyCars';
import EditCar from './EditCar/EditCar';
import Chargers from './Chargers/Chargers';
import MyChargers from './MyChargers/MyChargers';
import EditCharger from './EditCharger/EditCharger';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MyCars />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
