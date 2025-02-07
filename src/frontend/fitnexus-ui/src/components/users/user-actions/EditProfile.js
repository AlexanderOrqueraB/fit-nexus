import { Button } from "../../../components_ui/ui/button"
import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components_ui/ui/dialog"
import { Input } from "../../../components_ui/ui/input"
import { Label } from "../../../components_ui/ui/label"
import { mockClients } from '../../../mocks/mockData'
import { customToast } from '../../utils/customToast'
import { fetchClientData } from '../../utils/api';
import {apiClient} from "../../utils/client";
import { UserContext } from "../../main-components/UserContext";

export function EditProfile() {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { email, role, fitNexusId } = user; // Desestructurar el objeto user

  const [clients, setClients] = useState([]);
  	// Cargar datos desde varias fuentes simultáneamente
	const loadData = async (fitNexusId) => {
		try {
		// Ejecutar todas las solicitudes en paralelo
		const clients = await fetchClientData(fitNexusId);

		// Actualizar los estados con los datos obtenidos
		setClients(clients);

		} catch (error) {
		console.error('Error al cargar datos:', error);
		console.log('Disparando customToast');
		customToast({message : "Hubo un error al cargar los datos de cliente", type : "error"});
		}
	};
	
	useEffect(() => {
	loadData(fitNexusId);
	}, []); // Llama a loadData solo al montar el componente

  const [data, setData] = useState({
    nombre: '',
    apellido: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
			nombre: data.nombre,
      apellido: data.apellido,
      email: data.email,
		};

    console.log('Datos del usuario: ', userData);

    apiClient
      .put(`/api/v1/cliente/addClienteIdFromProps`, userData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Datos actualizados correctamente:", response.data);
          customToast({message : "Datos actualizados correctamente", type : "success"});
        }
    })
      .catch((error) => {
        console.error("Error al actualizar los datos:", error);
        customToast({message : "Error al actualizar los datos", type : "error"});
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Haz cambios a tu perfil aquí.
          </DialogDescription>
          <DialogDescription>
            Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              placeholder={mockClients[0].nombre}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              placeholder={mockClients[0].apellido}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder={mockClients[0].email}
                className="col-span-3"
              />
          </div>
        </div>
        <DialogFooter>
        <Button onClick={onSubmit} type="submit" className="w-full">
            Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile
