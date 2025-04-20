// context/usercontext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Runs only once when component mounts
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3004/auth/check", {
          withCredentials: true,
        });
        setUser(res.data.user);
        setLoading(false);
      } catch (err) {
        setLoading(false);
      } 
    };

    checkAuth();
  }, []); 

  return (
    <UserContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };