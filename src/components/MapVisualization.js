import React from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

const MapVisualization = ({ data }) => {
  const path = data.map((d) => {
    if (d.start && d.end) {
      return [
        [d.start.latitude, d.start.longitude],
        [d.end.latitude, d.end.longitude]
      ];
    }
    return null;
  }).filter(Boolean);

  return (
    <MapContainer center={[12.929, 74.917]} zoom={13} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      />
      {path.length > 0 && <Polyline positions={path} color="blue" />}
      {data.map((stop, idx) => (
        stop.start && stop.end && (
          <Marker key={idx} position={[stop.start.latitude, stop.start.longitude]} icon={new Icon({iconUrl: markerIconPng, iconSize: [25, 31], iconAnchor: [12, 21]})}>
            <Popup>
              <div>
                <p>Reach Time: {stop.start.eventGeneratedTime.toLocaleString()}</p>
                <p>End Time: {stop.end.eventGeneratedTime.toLocaleString()}</p>
                <p>Stoppage Duration: {stop.duration.toFixed(2)} minutes</p>
              </div>
            </Popup>
          </Marker>
        )
      ))}
    </MapContainer>
  );
};

export default MapVisualization;
