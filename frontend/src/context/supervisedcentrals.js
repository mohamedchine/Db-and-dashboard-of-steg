
import { createContext, useState } from "react";


const ScentralsContext = createContext();


const ScentralsProvider = ({ children }) => {
  const [centrals, setCentrals] = useState([]);

  return (
    <ScentralsContext.Provider value={{ centrals, setCentrals }}>
      {children}
    </ScentralsContext.Provider>
  );
};


export { ScentralsContext, ScentralsProvider };