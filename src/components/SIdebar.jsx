import React, { useState } from 'react';
import { FaShip } from 'react-icons/fa';

const Sidebar = () => {
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

  const handleDestinationChange = (index, event) => {
    const newDestinations = destinations.map((destination, i) => {
      if (i === index) {
        return { ...destination, value: event.target.value };
      }
      return destination;
    });
    setDestinations(newDestinations);
  };

  const addDestination = () => {
    setDestinations([...destinations, { type: 'destination', value: '' }]);
  };

  const removeDestination = (index) => {
    const newDestinations = destinations.filter((_, i) => i !== index);
    setDestinations(newDestinations);
  };

  const handleShipDetailsChange = (key, value) => {
    setShipDetails({ ...shipDetails, [key]: value });
  };

  return (
    <aside className="w-[20%] p-8 bg-gray-100 h-full">
      <div>
        <h2 className="text-4xl font-bold mb-10">Add Destination</h2>
        {destinations.map((destination, index) => (
          <div key={index} className="flex items-center mb-8">
            <input
              type="text"
              value={destination.value}
              onChange={(e) => handleDestinationChange(index, e)}
              className="block w-full p-5 border rounded-lg text-2xl"
              placeholder={destination.type === 'source' ? 'Enter Source Location' : `Enter Destination ${index}`}
            />
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
        <button className="bg-blue-500 text-white py-4 px-6 mt-6 w-full text-2xl rounded-lg" onClick={addDestination}>
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
