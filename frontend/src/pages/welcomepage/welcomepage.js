import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";

import Home from "./components/home/home";
import About from "./components/about/about";
import Login from "./components/login/login";
import Signup from "./components/signup/signup";
import RequestResetPassword from "./components/forgetpassword/requestresetpassword";
import Resetpassword from "./components/reset-password-component/resetpassword";
import NotFound from "../notfound/notfound";

import './welcome.css';
// react router first checks the root element then enter inside it if it find an other router inside it goes to it to check again
//the navbar doesnt get reerendered if we go from welcomepage/home to welcomepage/about the component stay mounted
const Wpage = () => {
  return (
    <div className="wpage">
      <Navbar />
      <div className="wpage-content">
        <Routes>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="request-reset-password" element={<RequestResetPassword />} />
          <Route path="reset-password" element={<Resetpassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      
    </div>
  );
};

export default Wpage;
