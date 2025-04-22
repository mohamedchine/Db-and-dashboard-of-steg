// context/usercontext.js
import { createContext, useState } from "react";


const UserContext = createContext();

const UserProvider = ({ children }) => {
  const date = new Date();
  const showTime = date.getHours() 
      + ':' + date.getMinutes() 
      + ":" + date.getSeconds();
  console.log("usercontext  is running" ,showTime);
  const [user, setuser] = useState(null);


  

  return (
    <UserContext.Provider value={{ user, setuser}}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };