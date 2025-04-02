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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  } from "../../../components_ui/ui/select"
import { Input } from "../../../components_ui/ui/input"
import { Label } from "../../../components_ui/ui/label"
import { customToast } from '../../../utils/customToast'
import {apiClient} from "../../../utils/client";
import { UserContext } from "../../global/UserContext";
import { GUARDAR_MENSAJE } from "../../../utils/env";

export function PutProfileExtra ({ data, reloadData }) {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [extraData, setExtraData] = useState({
        objetivo: data?.objetivo || "",
        genero: data?.genero || "",
        frecuenciaEjercicioSemanal: data?.frecuenciaEjercicioSemanal || "",
        edad: data?.edad || "",
        peso: data?.peso || "",
        altura: data?.altura || "",
    });

	useEffect(() => {
        setExtraData({
            objetivo: data?.objetivo || "",
            genero: data?.genero || "",
            frecuenciaEjercicioSemanal: data?.frecuenciaEjercicioSemanal || "",
            edad: data?.edad || "",
            peso: data?.peso || "",
            altura: data?.altura || "",
            });
	}, [data]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setExtraData({
      ...extraData,
      [name]: value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (Object.keys(userData).length === 0) {
      customToast({ message: "No hay cambios para guardar", type: "info" });
      return;
    }

    if (!extraData.edad.trim() && !data?.edad) {
        customToast({ message: "El campo 'Edad' es obligatorio", type: "warning" });
        return;
    }
    if (!extraData.peso.trim() && !data?.peso) {
        customToast({ message: "El campo 'Peso' es obligatorio", type: "warning" });
        return;
    }
    if (!extraData.altura.trim() && !data?.altura) {
        customToast({ message: "El campo 'Altura' es obligatorio", type: "warning" });
        return;
    }

    const userData = {
      objetivo: extraData.objetivo !== data?.objetivo ? extraData.objetivo : undefined,
      genero: extraData.genero !== data?.genero ? extraData.genero : undefined,
      frecuenciaEjercicioSemanal:
        extraData.frecuenciaEjercicioSemanal !== data?.frecuenciaEjercicioSemanal
          ? extraData.frecuenciaEjercicioSemanal
          : undefined,
      edad: extraData.edad !== data?.edad ? extraData.edad : undefined,
      peso: extraData.peso !== data?.peso ? extraData.peso : undefined,
      altura: extraData.altura !== data?.altura ? extraData.altura : undefined,
    };

    Object.keys(userData).forEach((key) => {
      if (userData[key] === undefined) {
        delete userData[key];
      }
    });

    if (Object.keys(userData).length === 0) {
      customToast({ message: "No hay cambios para guardar", type: "info" });
      return;
    }

    console.log('Datos extra del usuario: ', JSON.stringify(userData));

    apiClient
      .put(`/api/v1/clientes/${fitNexusId}`, userData)
      .then((response) => {
        if (response.status === 200) {
          customToast({message : "Datos actualizados correctamente", type : "success"});
          reloadData();
        }
        if (response.status === 404) {
          console.log("Cliente no encontrado", response.data);
          customToast({message : "Cliente no encontrado", type : "warning"});
        }
        if (response.status === 400) {
          console.log("Ha habido un error", response.data);
          customToast({message : "Ha habido un error", type : "error"});
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
        <Button variant="default">Editar datos extra</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar datos extra</DialogTitle>
          <DialogDescription>
           {GUARDAR_MENSAJE}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="objetivo" className="text-right">
              Objetivo
            </Label>
            <Select name="objetivo"
            value={extraData.objetivo}
            onValueChange={(value) => setExtraData({ ...extraData, objetivo: value})}>
                <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona un objetivo"  />
                </SelectTrigger>
                <SelectContent>
                        <SelectItem  value="PERDER_GRASA" required>
                            Perder grasa
                        </SelectItem>
                        <SelectItem  value="GANAR_MUSCULO" required>
                            Ganar músculo
                        </SelectItem>
                </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="genero" className="text-right">
              Genero
            </Label>
            <Select name="genero"
              value={extraData.genero}
              onValueChange={(value) => setExtraData({ ...extraData, genero: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Selecciona un género" />
              </SelectTrigger>
              <SelectContent>
                  <SelectItem  value="MUJER" required>
                    Mujer
                  </SelectItem>
                  <SelectItem  value="HOMBRE" required>
                    Hombre
                  </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frecuenciaEjercicioSemanal" className="text-right">
                Frecuencia Ejercicio
              </Label>
              <Select name="frecuenciaEjercicioSemanal"
              value={extraData.frecuenciaEjercicioSemanal}
                  onValueChange={(value) => setExtraData({ ...extraData, frecuenciaEjercicioSemanal: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Selecciona una frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                      <SelectItem  value="POCO_NADA" required>
                        Poco o nada
                      </SelectItem>
                      <SelectItem  value="LIGERO" required>
                        Ligero (1-3 días a la semana)
                      </SelectItem>
                      <SelectItem  value="MODERADO" required>
                        Moderado (3-5 días a la semana)
                      </SelectItem>
                      <SelectItem  value="FUERTE" required>
                        Fuerte (6-7 días a la semana)
                      </SelectItem>
                      <SelectItem  value="MUY_FUERTE" required>
                        Muy fuerte (2 veces al día)
                      </SelectItem>
                  </SelectContent>
                </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edad" className="text-right">
                Edad
              </Label>
              <Input
                id="edad"
                name="edad"
                value={extraData.edad}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="peso" className="text-right">
                Peso
              </Label>
              <Input
                id="peso"
                name="peso"
                value={extraData.peso}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="altura" className="text-right">
                Altura
              </Label>
              <Input
                id="altura"
                name="altura"
                value={extraData.altura}
                onChange={handleChange}
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

export default PutProfileExtra

