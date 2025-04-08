import React from 'react';
import './navbar.css';
import { Link } from 'react-router-dom';
const Navbar = () => {
    return (  
        <div className="navbar">
            <div className="navbar-left">
                <img src="/images/logoapp.png" alt="Logo" className="logo" />
                <p className="appname">
                    Tunisian company of electricity and gas
                </p>
            </div>
            <div className="horline"></div>
            <div className="navbar-right">
                <Link to="/home">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}
 
export default Navbar;