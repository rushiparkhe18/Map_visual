import React, { useState, useEffect } from 'react';
import { FaShip } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Papa from 'papaparse';

const Sidebar = () => {
  const [ports, setPorts] = useState([]); // List of ports loaded from CSV
  const [destinations, setDestinations] = useState([{ type: 'source', value: '' }]);
  const [shipDetails, setShipDetails] = useState({
    type: 'cargo',
    length: '',
    width: '',
    loadWeight: '',
    fuelCapacity: '',
    avgSpeed: ''
  });
  const [routeOptimization, setRouteOptimization] = useState('Optimal Route');

  // Load ports from the CSV file on component mount
  useEffect(() => {
    fetch('/port.csv') // Path from the public folder
      .then((response) => {
        if (!response.ok) throw new Error('Failed to fetch ports.csv');
        return response.text();
      })
      .then((data) => {
        const parsedData = Papa.parse(data, { header: true }).data;
        const portNames = parsedData
          .map((row) => row['Port Name']?.trim())
          .filter((name) => !!name); // Filter out undefined or empty names
        setPorts(portNames);
      })
      .catch((error) => {
        console.error('Error loading ports:', error);
        toast.error('Failed to load ports from CSV file.');
      });
  }, []);

  // Handle destination change
  const handleDestinationChange = (index, event) => {
    const value = event.target.value;
    if (ports.includes(value)) {
      const newDestinations = destinations.map((destination, i) =>
        i === index ? { ...destination, value } : destination
      );
      setDestinations(newDestinations);
    } else {
      toast.error(`Invalid port: ${value}. Please select a valid port.`);
    }
  };

  // Add new destination
  const addDestination = () => {
    if (destinations.length >= 2) {
      toast.error('Only one destination is allowed.');
    } else {
      setDestinations([...destinations, { type: 'destination', value: '' }]);
    }
  };

  // Remove a destination
  const removeDestination = (index) => {
    setDestinations(destinations.filter((_, i) => i !== index));
  };

  // Handle ship details change
  const handleShipDetailsChange = (key, value) => {
    setShipDetails({ ...shipDetails, [key]: value });
  };

  return (
    <aside className="w-[20%] p-8 bg-gray-100 h-full">
      <ToastContainer />
      <div>
        <h2 className="text-4xl font-bold mb-10">Add Destination</h2>
        {destinations.map((destination, index) => (
          <div key={index} className="flex items-center mb-8">
            <select
              value={destination.value}
              onChange={(e) => handleDestinationChange(index, e)}
              className="block w-full p-5 border rounded-lg text-2xl"
            >
              <option value="">{destination.type === 'source' ? 'Select Source' : 'Select Destination'}</option>
              {ports.map((port, i) => (
                <option key={i} value={port}>
                  {port}
                </option>
              ))}
            </select>
            {destination.type === 'destination' && (
              <button
                onClick={() => removeDestination(index)}
                className="bg-red-500 text-white px-5 py-3 ml-4 text-2xl rounded-lg"
              >
                Remove
              </button>
            )}
          </div>
        ))}
        <button
          className="bg-blue-500 text-white py-4 px-6 mt-6 w-full text-2xl rounded-lg"
          onClick={addDestination}
        >
          Add Destination
        </button>
      </div>
      <div className="mt-12 pb-6">
        <h2 className="text-4xl font-bold flex items-center mb-10">
          <FaShip className="mr-4 text-5xl" />
          Ship Details
        </h2>
        <div className="space-y-6">
          <select
            value={shipDetails.type}
            onChange={(e) => handleShipDetailsChange('type', e.target.value)}
            className="block w-full p-5 border rounded-lg text-2xl"
          >
            <option value="cargo">Cargo</option>
            <option value="tanker">Tanker</option>
            <option value="container">Container</option>
            <option value="bulk carrier">Bulk Carrier</option>
          </select>
          {Object.entries(shipDetails).map(([key, value]) =>
            key !== 'type' && (
              <input
                key={key}
                type="text"
                value={value}
                onChange={(e) => handleShipDetailsChange(key, e.target.value)}
                className="block w-full p-5 border rounded-lg text-2xl"
                placeholder={`Enter ${key.charAt(0).toUpperCase() + key.slice(1)}`}
              />
            )
          )}
        </div>
      </div>
      <div className="mt-12 pb-6">
        <h2 className="text-4xl font-bold mb-10">Route Optimization</h2>
        <select
          value={routeOptimization}
          onChange={(e) => setRouteOptimization(e.target.value)}
          className="block w-full p-5 border rounded-lg text-2xl"
        >
          <option>Optimal Route</option>
          <option>Fuel Efficiency</option>
          <option>Time Efficiency</option>
          <option>Safety Priority</option>
        </select>
        <button className="bg-blue-500 text-white py-4 px-6 mt-8 w-full text-2xl rounded-lg">
          Calculate Route
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
