import './Chargers.css';
import '../leaflet/leaflet.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import markerIconPng from "../leaflet/images/marker-icon.png"
import { Icon } from 'leaflet'
import {deleteValidStations, getCredentials, getValidStations} from "../App/App";
import {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";


function Chargers(props) {
  let history = useHistory();
  const position = [45.7475404089335, 21.22641090881591];
  const [stations, setStations] = useState([]);
  const [error, setError] = useState(null);

  useEffect( () => {
    const [userId, user, pass, role] = getCredentials();
    const specificCarStations = getValidStations();


    if(specificCarStations !== undefined) {
      setStations(specificCarStations);
    } else {
      const fetchData = async () => {
        try {
          const response = await fetch(`https://127.0.0.1:8002/api/stations`, {
            method: "GET",
            headers: {"Content-Type": "application/json"},
          });
          console.log("useEffect2");
          const data = await response.json();
          if (!response.ok) {
            throw new Error(data.message);
          }
          setStations(data["hydra:member"]);
        } catch (error) {
          setError(error.message);
        }
      }

      fetchData();
    }
  }, []); // <- add the count variable here

  return (
    <div>
      <Navbar/>
      <center>
        <h1 className='chargers-h1'>
          Chargers
        </h1>
        <MapContainer
          style={{ width: "80%", height: "70vh" }}
          center={position} zoom={14} scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {stations.map((station) => (
              console.log("stationsdw", stations),
              <Marker
                  key={station.id}
                  position={[station.latitude, station.longitude]}
                  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
              >
                <Popup>
                    {station.name}
                </Popup>
              </Marker>
          ))}
          {/*<Marker*/}
          {/*  position={[45.76, 21.22]}*/}
          {/*  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}*/}
          {/*>*/}
          {/*  <Popup>*/}
          {/*    Statie 1*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
          {/*<Marker*/}
          {/*  position={[45.7475, 21.226]}*/}
          {/*  icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}*/}
          {/*>*/}
          {/*  <Popup>*/}
          {/*    Statie 2*/}
          {/*  </Popup>*/}
          {/*</Marker>*/}
        </MapContainer>
      </center>
    </div>
  );
}

export default Chargers;
