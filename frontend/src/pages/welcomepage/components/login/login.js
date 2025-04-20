import { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../../../context/usercontext";


const Login = () => {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [loadingg, setloadinggg] = useState(false); 
    const {setUser} =useContext(UserContext);
    const navigate = useNavigate();
  
    const handleLogin = async () => {
        
        setloadinggg(true);
        try {
            const response = await axios.post("http://localhost:3004/auth/login", {
                steg_email: email,
                password: password
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
                ,withCredentials: true
            });
            toast.success(response.data.message);  //switch his role we will redirect him to his dashboard
            //save the user  in the global state
            setUser(response.data.user);
            const userData = response.data.user;
            setTimeout(() => {
                if(userData.central_id) {
                    navigate("/central/dashboard", { replace: true });
                } else if(userData.groupement_id) {
                    navigate("/groupement/dashboard", { replace: true });
                } else {
                    navigate("/direction/dashboard", { replace: true });
                }
            }, 3000);
           
        } catch (e) {
            toast.error( e.response.data.message);
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
                <Link  to="/welcomepage/request-reset-password" className="frgpslink">Forgot password?</Link> 
                
                <button onClick={handleLogin} className="loginbtn" disabled={loadingg}>
                    {loadingg ? "loadingg .. " :"Login"}
                </button>
            </div>
            <ToastContainer position="top-right" autoClose={3000} />
        </div>
    );
};

export default Login;
