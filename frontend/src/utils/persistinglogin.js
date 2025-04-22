import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import axios from "axios";
import useAuth from "../context/useAuth";

const PersistLogin = () => {
  const { user, setuser } = useAuth();
  const [loading, setLoading] = useState(true);
  const date = new Date();
    const showTime = date.getHours() 
        + ':' + date.getMinutes() 
        + ":" + date.getSeconds();
 
  useEffect(() => {
    console.log("persisting login is running at ",showTime);
    const verifyUser = async () => {
      try {
        console.log("user before persisting login check :",user );
        const res = await axios.get("http://localhost:3004/auth/check", {
          withCredentials: true,
        });
        setuser(res.data.user); 
      } catch (err) {
        setuser(null);
      } finally {
        console.log(showTime); 
        console.log("user is after the persisting login check :",user );
        setLoading(false);
      }
    };

    if (!user) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return <Outlet />;
};

export default PersistLogin;
