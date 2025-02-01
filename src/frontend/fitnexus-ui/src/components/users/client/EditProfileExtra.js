import { Button } from "../../../components_ui/ui/button"
import React, { useState, useEffect } from "react";
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
import { fetchClientData } from '../../utils/api';
import { customToast } from '../../utils/customToast'
import {apiClient} from "../../utils/client";

export function EditProfileExtra() {
  const [clients, setClients] = useState([]);
	const loadData = async () => {
		try {
		// Ejecutar todas las solicitudes en paralelo
		const clients = await fetchClientData();

		// Actualizar los estados con los datos obtenidos
		setClients(clients);

		} catch (error) {
		console.error('Error al cargar datos:', error);
		console.log('Disparando customToast');
		customToast({message : "Hubo un error al cargar los datos de cliente", type : "error"});
		}
	};
	
	useEffect(() => {
	loadData();
	}, []); // Llama a loadData solo al montar el componente
 	
  const [data, setData] = useState({
    objetivo: '',
    genero: '',
    frecuenciaEjercicioSemanal: '',
    edad: '',
    peso: '',
    altura: '',
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
			objetivo: data.objetivo,
      genero: data.genero,
      frecuenciaEjercicioSemanal: data.frecuenciaEjercicioSemanal,
      edad: data.edad,
      peso: data.peso,
      altura: data.altura,
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
        <Button variant="default">Editar datos</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar datos extra</DialogTitle>
          <DialogDescription>
           Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Objetivo
            </Label>
            <Input
              id="nombre"
              placeholder={mockClients[0].objetivo}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Genero
            </Label>
            <Input
              id="apellido"
              placeholder={mockClients[0].genero}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="frecuencia" className="text-right">
                Frecuencia Ejercicio
              </Label>
              <Input
                id="text"
                placeholder={mockClients[0].frecuenciaEjercicioSemanal}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edad" className="text-right">
                Edad
              </Label>
              <Input
                id="text"
                placeholder={mockClients[0].edad}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="peso" className="text-right">
                Peso
              </Label>
              <Input
                id="text"
                placeholder={mockClients[0].peso}
                onChange={handleChange}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="altura" className="text-right">
                Altura
              </Label>
              <Input
                id="text"
                placeholder={mockClients[0].altura}
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

export default EditProfileExtra
