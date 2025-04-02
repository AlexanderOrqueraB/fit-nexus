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
import { customToast } from '../../../utils/customToast'
import {apiClient} from "../../../utils/client";
import { UserContext } from "../../global/UserContext";
import { GUARDAR_MENSAJE } from "../../../utils/env";

export function EditProfile ({ data, reloadData }) {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [myData, setMyData] = useState({
      nombre: data?.nombre || "",
      apellido: data?.apellido || "",
      email: data?.email || "",
      fitNexusId: data?.fitNexusId || "",
    });

  useEffect(() => {
    setMyData({
      nombre: data?.nombre || "",
      apellido: data?.apellido || "",
      email: data?.email || "",
      fitNexusId: data?.fitNexusId || "",
    });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMyData({
      ...myData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!myData.nombre.trim()) {
        customToast({ message: "El campo 'Nombre' es obligatorio", type: "warning" });
        return;
    }
    if (!myData.apellido.trim()) {
        customToast({ message: "El campo 'Apellido' es obligatorio", type: "warning" });
        return;
    }
    if (!myData.email.trim()) {
            customToast({ message: "El campo 'Email' es obligatorio", type: "warning" });
            return;
        }

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
          reloadData();
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
              value={myData.nombre}
              required="required"
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
              value={myData.apellido}
              required="required"
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
                value={myData.email}
                required="required"
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
              value={myData?.fitNexusId || mockClients[0].fitNexusId}
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
