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
import { fetchMyData } from '../../utils/api';
import {apiClient} from "../../utils/client";
import { UserContext } from "../../main-components/UserContext";

export function EditProfile({ clientData }) {

  console.log('Datos del cliente:', clientData);

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [data, setData] = useState([]);

  const loadData = async () => {
      try {
        const userData = await fetchMyData(fitNexusId);
        setData(userData);
        customToast({ message: "Datos cargados correctamente", type: "success" });
  
      } catch (error) {
        console.error("Error al cargar datos:", error);
        customToast({
          message: "Hubo un error al cargar los datos de cliente",
          type: "error",
        });
      }
    };
  
  useEffect(() => {
    loadData();
  }, []); // Llama a loadData solo al montar el componente

  const [myData, setMyData] = useState({
    nombre: '',
    apellido: '',
    email: '',
    fitNexusId: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyData({
      ...myData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
			nombre: myData.nombre,
      apellido: myData.apellido,
      email: myData.email,
		};

    console.log('Datos del usuario: ', userData);

    apiClient
      .put(`/api/v1/data/${fitNexusId}`, userData)
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
            Haz cambios a tu perfil aquí
          </DialogDescription>
          <DialogDescription>
            Haz click en "Guardar cambios" cuando hayas terminado
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              value={mockClients[0].nombre}
              placeholder={mockClients[0].nombre}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              value={mockClients[0].apellido}
              placeholder={mockClients[0].apellido}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                value={mockClients[0].email}
                placeholder={mockClients[0].email}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="fitNexusId" className="text-right">
                  FitNexusId
              </Label>
              <Input
              id="fitNexusId"
              placeholder={mockClients[0].fitNexusId}
              className="col-span-3"
              disabled
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
