import { Button } from "../../../components_ui/ui/button"
import React, { useState, useEffect, useContext } from "react";
import {
  RefreshCcwIcon,
} from "lucide-react";
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
import { customToast } from '../../../utils/customToast'
import { fetchMyData } from '../../../utils/api';
import {apiClient} from "../../../utils/client";
import { UserContext } from "../../global/UserContext";
import { GUARDAR_MENSAJE } from "../../../utils/env";

export function EditProfile () {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [data, setData] = useState([]);

  const loadData = async () => {
      try {
        const userData = await fetchMyData(fitNexusId);
        if (userData != null) {
            setData(userData);
            console.log("Datos cargados correctamente")
        } else if (userData == null) {
            console.log("Ha habido un problema cargando los datos")
        }
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

    console.log('Datos del usuario: ', JSON.stringify(userData));

    apiClient
      .put(`/api/v1/data/${fitNexusId}`, userData)
      .then((response) => {
        if (response.status === 200) {
          customToast({message : "Perfil actualizado correctamente", type : "success"});
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
            {GUARDAR_MENSAJE}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              value={myData.nombre|| data.nombre}
              placeholder={data.nombre || mockClients[0].nombre}
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
              name="apellido"
              value={myData.apellido || data.apellido}
              placeholder={data.apellido || mockClients[0].apellido}
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
                name="email"
                value={myData.email || data.email}
                placeholder={data.email || mockClients[0].email}
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
              placeholder={data?.fitNexusId || mockClients[0].fitNexusId}
              className="col-span-3"
              disabled
              />
          </div>
        </div>
        <DialogFooter>
        <Button onClick={onSubmit} type="submit" className="w-full">
            Guardar cambios
        </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfile
