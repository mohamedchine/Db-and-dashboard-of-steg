import Navbar from "./components/navbar/navbar";
import { Outlet } from "react-router-dom";
import './welcome.css';
const Wpage = () => {
    return ( 
        <div className="wpage">
            <Navbar></Navbar>
            <div className="wpage-content">
            <Outlet></Outlet> 
            </div> 
        </div>
     );
}
 
export default Wpage;