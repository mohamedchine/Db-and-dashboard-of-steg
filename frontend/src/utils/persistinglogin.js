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
        //i didn't use axs cause i dont want that message to show and we be redirected to the login each time we oppen the app (check the axs)
        const res = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/auth/check`, {
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
