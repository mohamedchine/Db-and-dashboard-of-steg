// this context check if the navigation to the manage account happend from the url(true) is from the sidebar(false); like if the sidebar already verified the user we dont want to revirify him
import React, { createContext, useContext, useState } from "react";

const ParamsContext = createContext();
export const ParamsProvider = ({ children }) => {
  const [camefromurl, setcamefromurl] = useState(true);

  return (
    <ParamsContext.Provider value={{ camefromurl, setcamefromurl }}>
      {children}
    </ParamsContext.Provider>
  );
};


export const useParamsContext = () => useContext(ParamsContext);
