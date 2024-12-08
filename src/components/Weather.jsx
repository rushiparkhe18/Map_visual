import React, { useState } from 'react';
import { FaThermometerHalf, FaWind, FaWater, FaEye, FaShip } from 'react-icons/fa';

const Weather = () => {
  const [weatherInfo, setWeatherInfo] = useState({
    temperature: 29,
    windSpeed: 15,
    waveHeight: 3.9,
    currentSpeed: 5,
    visibility: 'Moderate',
    swellHeight: 0.9
  });

  return (
    <aside className="pt-8 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-center mb-4">Weather Information</h2>
      <ul className="list-none space-y-6">
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaThermometerHalf className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Temperature</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.temperature}°C</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaWind className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Wind Speed</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.windSpeed} knots</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaWater className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Wave Height</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.waveHeight} meters</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaShip className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Current Speed</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.currentSpeed} knots</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaEye className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Visibility</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.visibility}</span>
        </li>
        <li className="flex flex-col items-center bg-white p-6 rounded">
          <div className="flex items-center mb-2">
            <FaWater className="mr-2 text-3xl" />
            <span className="font-bold text-xl">Swell Height</span>
          </div>
          <span className="font-bold text-xl">{weatherInfo.swellHeight} meters</span>
        </li>
      </ul>
    </aside>
  );
};

export default Weather;
