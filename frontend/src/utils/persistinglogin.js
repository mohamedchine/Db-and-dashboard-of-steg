import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, CircularProgress } from "@mui/material";
import axios from "axios";
import useAuth from "../context/useAuth";

const PersistLogin = () => {
  const { user, setuser } = useAuth();
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    
    const verifyUser = async () => {
      try {
      
        const res = await axios.get("http://localhost:3004/auth/check", {
          withCredentials: true,
        });
        setuser(res.data.user); 
      } catch (err) {
        setuser(null);
      } finally {
       
        
        setLoading(false);
      }
    };

    if (!user) {
      verifyUser();
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return <Outlet />;
};

export default PersistLogin;
