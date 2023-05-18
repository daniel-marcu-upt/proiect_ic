import './Chargers.css';
import '../leaflet/leaflet.css';
import * as React from 'react';
import Navbar from '../Navbar/Navbar';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet'
import markerIconPng from "../leaflet/images/marker-icon.png"
import { Icon } from 'leaflet'


function Chargers() {
  const position = [45.7475404089335, 21.22641090881591];
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
          <Marker
            position={[45.76, 21.22]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>
              Statie 1
            </Popup>
          </Marker>
          <Marker
            position={[45.7475, 21.226]}
            icon={new Icon({ iconUrl: markerIconPng, iconSize: [25, 41], iconAnchor: [12, 41] })}
          >
            <Popup>
              Statie 2
            </Popup>
          </Marker>
        </MapContainer>
      </center>
    </div>
  );
}

export default Chargers;
