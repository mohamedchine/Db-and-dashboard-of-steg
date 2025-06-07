import { useState } from "react";
import "./requestresetpassword.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RequestResetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRequestReset = async () => {

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:3004/password/request-password-reset", { steg_email: email }, {
        headers: { "Content-Type": "application/json" },
      });

      toast.success(response.data.message);
    } catch (e) {
      toast.error(e.response.data.message);
    }
    setLoading(false);
  };

  return (
    <div className="request-reset">
      <div className="container">
       
        <input
          type="text"
          placeholder="Enter your STEG email"
          className="se"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleRequestReset}
          className="reqreset-btn"
          disabled={loading}
        >
          {loading?"loading .." :  "Request a password Reset"}
        </button>
      </div>
   
    </div>
  );
};

export default RequestResetPassword;
