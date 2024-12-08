import React, { useState } from 'react';
import { FaGasPump, FaClock, FaShieldAlt, FaTachometerAlt } from 'react-icons/fa';

const RouteInfo = () => {
  const [routeInfo, setRouteInfo] = useState({
    fuelEfficiency: 85,
    timeEfficiency: 85,
    safetyScore: 90,
    profitSpeed: 20
  });

  return (
    <div id="route-info" className="p-4 bg-gray-100 mt-4">
      <h2 className="text-2xl font-bold text-center mb-4">Route Information</h2>
      <ul className="list-none space-y-6">
        <li className="flex items-center justify-center bg-white p-6 rounded">
          <FaGasPump className="mr-2 text-3xl" />
          <span className="font-bold mr-2 text-xl">Fuel Efficiency:</span>
          <span className="font-bold text-xl">{routeInfo.fuelEfficiency}%</span>
        </li>
        <li className="flex items-center justify-center bg-white p-6 rounded">
          <FaClock className="mr-2 text-3xl" />
          <span className="font-bold mr-2 text-xl">Time Efficiency:</span>
          <span className="font-bold text-xl">{routeInfo.timeEfficiency}%</span>
        </li>
        <li className="flex items-center justify-center bg-white p-6 rounded">
          <FaShieldAlt className="mr-2 text-3xl" />
          <span className="font-bold mr-2 text-xl">Safety Score:</span>
          <span className="font-bold text-xl">{routeInfo.safetyScore}%</span>
        </li>
        <li className="flex items-center justify-center bg-white p-6 rounded">
          <FaTachometerAlt className="mr-2 text-3xl" />
          <span className="font-bold mr-2 text-xl">Profit Speed:</span>
          <span className="font-bold text-xl">{routeInfo.profitSpeed} knots</span>
        </li>
      </ul>
    </div>
  );
};

export default RouteInfo;
