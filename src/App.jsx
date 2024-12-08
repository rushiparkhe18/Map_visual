import React from "react";
import Header from "./components/Header"; // Adjusted path for Header
import Sidebar from "./components/Sidebar"; // Adjusted path for Sidebar
import MapComponent from "./components/Map"; // Adjusted path for MapComponent
import Weather from "./components/Weather"; // Adjusted path for Weather
import Summary from "./components/Summary"; // Adjusted path for Summary
import RouteInfo from "./components/RouteInfo"; // Adjusted path for RouteInfo

const App = () => {
  return (
    <div className="flex flex-col h-screen">
      {" "}
      <Header />{" "}
      <div className="flex flex-grow">
        {" "}
        <Sidebar />{" "}
        <div className="flex-grow flex flex-col p-4">
          {" "}
          <MapComponent className="flex-grow" /> <RouteInfo className="mt-4" />{" "}
        </div>{" "}
        <div className="flex flex-col w-[20%]">
          {" "}
          <Weather /> <Summary />{" "}
        </div>{" "}
      </div>{" "}
    </div>
  );
};
export default App;
