import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // null significa no autenticado

    // Persistencia opcional al recargar
    useEffect(() => {
      const storedEmail = localStorage.getItem("userEmail");
      const storedFitNexusId = localStorage.getItem("fitNexusId");
      console.log("FitNexusId tras refresh (to doublecheck): ", storedFitNexusId);
      const storedRole = localStorage.getItem("userRole");
      console.log("Rol tras refresh (to doublecheck): ", storedRole);
      
      if (storedEmail && storedRole && storedFitNexusId) {
        setUser({ email: storedEmail, role: storedRole, fitNexusId: storedFitNexusId });
      }
    }, []);

  return (
    // Proporcionar el contexto a los componentes hijos con email y role
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
