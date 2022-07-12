import React, { useState } from "react";
import { createContext } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const authData = sessionStorage.getItem("authData")
    ? JSON.parse(sessionStorage.getItem("authData"))
    : {};
  const [auth, setAuth] = useState(authData);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;