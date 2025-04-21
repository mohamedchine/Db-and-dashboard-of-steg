import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import './welcome.css';
const Wpage = () => {
  return (
    <div className="wpage">
      <Navbar />
      <div className="wpage-content">
       <Outlet/>
      </div>
      
    </div>
  );
};

export default Wpage;
