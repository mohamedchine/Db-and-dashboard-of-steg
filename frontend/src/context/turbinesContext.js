// context/usercontext.js
import { createContext, useState } from "react";

const TurbinesContext = createContext();

const TurbinesProvider = ({ children }) => {
  const [turbines, setturbines] = useState([]);

  return (
    <TurbinesContext.Provider value={{ turbines, setturbines }}>
      {children}
    </TurbinesContext.Provider>
  );
};

export { TurbinesContext, TurbinesProvider };
