import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./resetpassword.css"
const Resetpassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      navigate("/notfound");
    }
  }, []);

  const [password, setpassword] = useState("");
  const [confirmpassword, setconfirmpassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async () => {
    if (password != confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3004/password/reset-password",
        { password, token },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/welcomepage/login"); 
      }, 3000);
    } catch (e) {
      toast.error(e.response.data.message );
      if(e.response.data.redirect){
        setTimeout(() => {
            navigate(e.response.data.redirect); 
          }, 3000);
      }
    }
    setLoading(false);
  };

  return (
    <div className="request-reset">
      <div className="container">
        <input
          type="password"
          placeholder="Enter your new password"
          className="se"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm your new password"
          className="se"
          value={confirmpassword}
          onChange={(e) => setconfirmpassword(e.target.value)}
        />
        <button
          onClick={handleRequestReset}
          className="reset-btn"
          disabled={loading}
        >
          {loading ? "loading.." : "Reset Password"}
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Resetpassword;
