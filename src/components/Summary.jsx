import React, { useState } from 'react';
import { FaGasPump, FaRoute, FaClock } from 'react-icons/fa';

const Summary = () => {
  const [routeSummary, setRouteSummary] = useState({
    fuelConsumption: 648,
    totalDistance: 6475,
    estimatedArrival: '259 hours, 1 minute'
  });

  return (
    <div className="pb-8 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Route Summary</h2>
      <ul className="list-none space-y-6">
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaGasPump className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Fuel Consumption</span>
          </div>
          <span className="font-bold text-xl">{routeSummary.fuelConsumption} tons</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaRoute className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Total Distance</span>
          </div>
          <span className="font-bold text-xl">{routeSummary.totalDistance} km</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaClock className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Estimated Arrival</span>
          </div>
          <span className="font-bold text-xl">{routeSummary.estimatedArrival}</span>
        </li>
      </ul>
    </div>
  );
};

export default Summary;
