import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle } from 'react-leaflet';
import { toast, ToastContainer } from 'react-toastify';
import { FaSun, FaWind, FaCompass } from 'react-icons/fa'; // Updated icons
import 'react-toastify/dist/ReactToastify.css';
import 'leaflet/dist/leaflet.css';

const MapComponent = () => {
  const route = [
    [19.0760, 72.8777], // Mumbai
    [6.9271, 79.8612],  // Colombo
    [-6.2088, 106.8456] // Jakarta
  ];

  const [liveLocation, setLiveLocation] = useState(null);
  const [climateInfo, setClimateInfo] = useState({});

  useEffect(() => {
    // Fetch live location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const location = [position.coords.latitude, position.coords.longitude];
        console.log('Live Location:', location);
        setLiveLocation(location);
      },
      (error) => {
        console.error('Error fetching live location:', error);
      }
    );
  }, []);

  useEffect(() => {
    // Fetch climate information based on live location
    const fetchClimateInfo = async () => {
      if (!liveLocation) return;
    
      try {
        const [latitude, longitude] = liveLocation;
        console.log(latitude);
        console.log(longitude);
        const response = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`
        );
        const data = await response.json();
        const weatherInfo = {
          temperature: data.current_weather.temperature,
          windSpeed: data.current_weather.windspeed,
          windDirection: data.current_weather.winddirection,
        };
        console.log('Weather Info:', weatherInfo);
        setClimateInfo(weatherInfo);
    
        // Show toast notification with updated icons and style
        toast.info(
          <div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaSun style={{ marginRight: "8px", fontSize: "24px" }} /> {/* Larger icon */}
              <strong style={{ fontSize: "20px" }}>Temperature:</strong> 
              <span style={{ fontSize: "20px" }}> {weatherInfo.temperature}°C</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaWind style={{ marginRight: "8px", fontSize: "24px" }} /> {/* Larger icon */}
              <strong style={{ fontSize: "20px" }}>Wind Speed:</strong> 
              <span style={{ fontSize: "20px" }}> {weatherInfo.windSpeed} km/h</span>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <FaCompass style={{ marginRight: "8px", fontSize: "24px" }} /> {/* Larger icon */}
              <strong style={{ fontSize: "20px" }}>Wind Direction:</strong> 
              <span style={{ fontSize: "20px" }}> {weatherInfo.windDirection}°</span>
            </div>
          </div>,
          {
            autoClose: 8000,
            position: "top-right",
            style: {
              fontSize: "20px", // Increased text size
              textAlign: "left", // Left-aligned text
              padding: "16px 90px 16px 24px", // Adjusted padding (right padding increased)
              color: "#333", // Text color
              backgroundColor: "#f0f8ff", // Light background color
              borderRadius: "10px", // Rounded corners
              width: "400px", // Increased width for a wider toast box
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Added subtle shadow for emphasis
            },
          }
        );
        
        // For ToastContainer, add right-side margin to avoid the close button overlapping:
        <ToastContainer 
          style={{
            marginRight: '20px', // Right margin for spacing
          }} 
        />
        
        
       
        
        
        
      } catch (error) {
        console.error('Error fetching climate information:', error);
      }
    };

    fetchClimateInfo();
    const intervalId = setInterval(fetchClimateInfo, 10 * 60 * 1000); // Update every 10 minutes

    return () => clearInterval(intervalId);
  }, [liveLocation]);

  return (
    <div className="h-[85%] w-full p-4">
      <ToastContainer />
      <MapContainer center={liveLocation || [20.5937, 78.9629]} zoom={5} className="h-full w-full">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {route.map((position, idx) => (
          <Marker key={idx} position={position}>
            <Popup>
              <div style={{ fontSize: '18px', fontWeight: 'bold' }}> {/* Increased font size */}
                <p>Temperature: {climateInfo.temperature}°C</p>
                <p>Wind Speed: {climateInfo.windSpeed} km/h</p>
                <p>Wind Direction: {climateInfo.windDirection}°</p>
              </div>
            </Popup>
          </Marker>
        ))}
        {liveLocation && (
          <>
            <Marker position={liveLocation}>
              <Popup>
                <div style={{ fontSize: '18px', fontWeight: 'bold' }}> {/* Increased font size */}
                  <p>Your Live Location</p>
                  <p>Temperature: {climateInfo.temperature}°C</p>
                  <p>Wind Speed: {climateInfo.windSpeed} km/h</p>
                  <p>Wind Direction: {climateInfo.windDirection}°</p>
                </div>
              </Popup>
            </Marker>
            <Circle center={liveLocation} radius={50000} color="blue" />
          </>
        )}
        <Polyline positions={route} color="blue" />
      </MapContainer>
    </div>
  );
};

export default MapComponent;
