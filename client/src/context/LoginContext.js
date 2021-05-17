import React, { useState, createContext, useEffect } from "react";

export const LoginContext = createContext();

export const LoginProvider = (props) => {
  const [islLoggedIn, setIslLoggedIn] = useState({
    login: true,
    status: undefined,
  });

  useEffect(() => {
    const status = localStorage.getItem("loginData");
    if (status === "buyer") {
      setIslLoggedIn({
        login: true,
        status: "buyer",
      });
    } else if (status === "seller") {
      setIslLoggedIn({
        login: true,
        status: "seller",
      });
    } else {
      setIslLoggedIn({
        login: false,
        status: undefined,
      });
    }
  }, []);

  return (
    <LoginContext.Provider value={[islLoggedIn, setIslLoggedIn]}>
      {props.children}
    </LoginContext.Provider>
  );
};
