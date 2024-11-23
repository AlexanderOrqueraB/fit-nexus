import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null significa no autenticado

    // Persistencia opcional al recargar
    useEffect(() => {
      const storedToken = localStorage.getItem("authToken");
      const storedRole = localStorage.getItem("userRole");
      if (storedToken && storedRole) {
        setUser({ token: storedToken, role: storedRole });
      }
    }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
