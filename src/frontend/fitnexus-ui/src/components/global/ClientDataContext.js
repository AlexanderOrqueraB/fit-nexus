import React, { createContext, useState, useContext } from "react";
import { fetchClientData } from "../../utils/api";
import customToast from "../../utils/customToast";
import { UserContext } from "./UserContext";

const ClientDataContext = createContext();

export const ClientDataProvider = ({ children }) => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error] = useState(null);

  const { user } = useContext(UserContext);
  const { role } = user; // Desestructurar el objeto user

  const fetchClientDataOnce = async (fitNexusId) => {
    if (role !== "ADMIN") {
      console.warn("fetchClientDataOnce can only be executed by ADMIN users.");
      return;
    }
    
    setLoading(true);
    try {
        const { clients } = await fetchClientData(fitNexusId);
        setClients(clients);
        if (clients.length === 0) {
            setClients([]);
            customToast({ message: "No se encontraron clientes", type: "info" });
        }
        if (clients.length > 0) {
            customToast({ message: "Datos de clientes cargados correctamente", type: "success" });
            customToast({ message: "Tienes un total de: " + clients.length + " clientes", type: "info" });
        } else {
            setClients([]);
            customToast({ message: "Hubo un error al cargar los datos de cliente", type: "error" });
        }

    } catch (error) {
        console.error("Error al cargar datos de clientes:", error);
        customToast({
            message: "Hubo un error al cargar los datos de cliente",
            type: "error",
        });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ClientDataContext.Provider
      value={{ clients, setClients, loading, error, fetchClientDataOnce }}>
      {children}
    </ClientDataContext.Provider>
  );
};

export const useClientData = () => useContext(ClientDataContext);