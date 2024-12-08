import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const center = [20.5937, 78.9629]; // Coordinates for India
  const route = [
    [19.0760, 72.8777], // Mumbai
    [6.9271, 79.8612],  // Colombo
    [-6.2088, 106.8456] // Jakarta
  ];

  return (
    <div className="h-[85%] w-full p-4">
      <MapContainer center={center} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {route.map((position, idx) => (
          <Marker key={idx} position={position} />
        ))}
        <Polyline positions={route} color="blue" />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
