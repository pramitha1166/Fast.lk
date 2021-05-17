import React, { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [islLoggedIn, setIslLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIslLoggedIn(true);
    }
  });

  return (
    <LoginContext.Provider value={[islLoggedIn, setIslLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};
