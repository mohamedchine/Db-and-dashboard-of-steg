
import { createContext, useState } from "react";


const AllcentralsContext = createContext();


const AllcentralsProvider = ({ children }) => {
  const [centrals, setCentrals] = useState([]);

  return (
    <AllcentralsContext.Provider value={{ centrals, setCentrals }}>
      {children}
    </AllcentralsContext.Provider>
  );
};


export { AllcentralsContext, AllcentralsProvider };