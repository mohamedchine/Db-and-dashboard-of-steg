import { useState } from "react";
import "./login.css";
import axs from "../../../../api/customizedaxios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../../context/useAuth";


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loadingg, setloadinggg] = useState(false); 
    const {  setuser } = useAuth();

    const navigate = useNavigate();
    
   
    const handleLogin = async () => {
        setloadinggg(true);
        try {
            const response = await axs.post("/auth/login", {
                steg_email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            toast.success(response.data.message);
            const loggedUser = response.data.user; //bcs setuseris async
            setuser(loggedUser); // update the global userstate
            
            setTimeout(() => {
                navigate("/"+loggedUser.unittype+"/dashboard", { replace: true });//take him to the protected link like the link he was asked for 
            }, 3000);
        } catch (e) {
            toast.error(e.response.data.message);
        }
        setloadinggg(false);
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
                <Link to="/request-reset-password" className="frgpslink">Forgot password?</Link>
                <button onClick={handleLogin} className="loginbtn" disabled={loadingg}>
                    {loadingg ? "loadingg .. " : "Login"}
                </button>
            </div>
           
        </div>
    );
};

export default Login;
