// context/usercontext.js
import { createContext, useState } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setuser] = useState(null);


  // Runs only once when component mounts

  return (
    <UserContext.Provider value={{ user, setuser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };