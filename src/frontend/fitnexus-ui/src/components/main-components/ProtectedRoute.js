import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  if (!user) {
    // Redirigir al login si no está autenticado
    return <Navigate to="/" state={{ from: location }} />; 
  }

  if (roleRequired && user.role !== roleRequired) {
    // Redirigir si no tiene el rol necesario
    return <Navigate to="/unauthorized" state={{ from: location }}/>;
  }

  // Si el usuario cumple los requisitos, renderizar el componente
  return React.cloneElement(children, { isAdmin: user.role === "ADMIN" });
};

export default ProtectedRoute;