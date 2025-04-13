import { useState } from "react";
import "./login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loading, setloading] = useState(false);

    const handleLogin = async () => {
        setloading(true);
       
        
        try {
            const response = await axios.post("http://localhost:3004/auth/login", {
                steg_email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success(response.data.message); //take him to dashboard
           
        } catch (e) {
            toast.error( e.response.data.message);
        }
        setloading(false);
    };

    return (
        <div className="login">
            <div className="container">
                <input
                    type="text"
                    placeholder="Steg email"
                    className="se"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="pas"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                />
                <Link  to="/welcomepage/request-reset-password" className="frgpslink">Forgot password?</Link> 
                
                <button onClick={handleLogin} className="loginbtn" disabled={loading}>
                    {loading ? "loading .. " :"Login"}
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;
