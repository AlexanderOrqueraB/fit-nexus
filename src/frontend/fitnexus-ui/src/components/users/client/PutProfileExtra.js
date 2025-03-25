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
import { mockClients } from '../../../mocks/mockData'
import { fetchClientData } from '../../../utils/api';
import { customToast } from '../../../utils/customToast'
import {apiClient} from "../../../utils/client";
import { UserContext } from "../../global/UserContext";
import { GUARDAR_MENSAJE } from "../../../utils/env";

export function PutProfileExtra() {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [clients, setClients] = useState([]);
  const [extraData, setExtraData] = useState(null);

	const loadData = async () => {
		try {
		// Ejecutar todas las solicitudes en paralelo
        const { clients } = await fetchClientData(fitNexusId);

		// Actualizar los estados con los datos obtenidos
		setClients(clients);

		} catch (error) {
		  customToast({message : "Hubo un error al cargar los datos de cliente", type : "error"});
		}
	};

  const fetchExtraData = async (fitNexusId) => {
      try {
        //uncomment this lines to use backend data
        const data = await fetchExtraData(fitNexusId);
        setExtraData(data);

        //uncomment this lines to use mock data
        //const client = mockClients.find(client => client.fitNexusId === fitNexusId);
        //setExtraData(client ? client : null);
      } catch (error) {
        setExtraData(null);
      }
    };
	
	useEffect(() => {
    loadData();
    fetchExtraData(fitNexusId);
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

    console.log('Datos extra del usuario: ', userData);

    apiClient
      .put(`/api/v1/clientes/${fitNexusId}`, userData)
      .then((response) => {
        if (response.status === 200) {
          console.log("Datos actualizados correctamente:", response.data);
          customToast({message : "Datos actualizados correctamente", type : "success"});
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
							onValueChange={(value) => setData({ ...data, objetivo: value})}>
								<SelectTrigger className="col-span-3">
									<SelectValue placeholder={data?.objetivo || mockClients[0].objetivo} />
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
            <Label htmlFor="apellido" className="text-right">
              Genero
            </Label>
            <Select name="genero" 
              onValueChange={(value) => setData({ ...data, genero: value})}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={data?.genero || mockClients[0].genero} />
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
              <Label htmlFor="frecuencia" className="text-right">
                Frecuencia Ejercicio
              </Label>
              <Select name="frecuencia" 
                  onValueChange={(value) => setData({ ...data, frecuencia: value})}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={data?.frecuenciaEjercicioSemanal || mockClients[0].frecuenciaEjercicioSemanal} />
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
                id="text"
                placeholder={data?.edad || mockClients[0].edad}
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
                placeholder={data?.peso || mockClients[0].peso}
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
                placeholder={data?.altura || mockClients[0].altura}
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

