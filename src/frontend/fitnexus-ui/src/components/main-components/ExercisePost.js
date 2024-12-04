import React, { useEffect, useState } from 'react';
import { UserCheck } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../components_ui/ui/dialog"

import { Button } from '../../components_ui/ui/button';
import { Input } from '../../components_ui/ui/input';
import { Label } from '../../components_ui/ui/label';
import { apiClient } from '../utils/client';
import { toast } from 'sonner'



export function ExercisePost() {
    useState({});
	const [data, setData] = useState({});

	const [dataEx, setDataEx] = useState({
		//useState to store data from server
		nombreEjercicio: '',
		repeticion: '',
		serie: '',
		peso: '',
		cardioRealizado: '',
	});

    const confirmationToast = () => {
        toast.success('My first toast')
      }

    const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

    const onSubmit = (e) => {
		e.preventDefault(); //prevent refresh on page
		const userData = {
			nombreEjercicio: data.nombreEjercicio,
			repeticion: data.repeticion,
			serie: data.serie,
			peso: data.peso,
			cardioRealizado: data.cardioRealizado,
		};

		console.log('Enviando los siguientes datos: ', userData);

		apiClient
			.post('/api/v1/ejercicios', userData)
			//.put(URL, userData)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
					console.log('Mostrando Toast de Ejercicio Guardado...');
					confirmationToast();
				}
			})
			.catch((error) => {
				console.error('Error en la petición: ', error);
			});
	};

    useEffect(() => {
	}, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" variant="outline">
                    Crear ejercicio
                    <UserCheck className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ejercicio</DialogTitle>
                    <DialogDescription>Crea un ejercicio aquí</DialogDescription>
                    <DialogDescription>
                        Haz click en Guardar cuando hayas terminado
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nombre del ejercicio
                        </Label>
                        <Input
                            id="nombreEjercicio"
                            name="nombreEjercicio"
                            /*value={dataEx.nombreEjercicio}*/
                            onChange={handleChange}
                            placeholder="Press banca"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="repeticion" className="text-right">
                            Repeticiones
                        </Label>
                        <Input
                            id="repeticion"
                            name="repeticion"
                            type="number"
                            /*value={dataEx.repeticion}*/
                            onChange={handleChange}
                            placeholder="5"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="serie" className="text-right">
                            Series
                        </Label>
                        <Input
                            id="serie"
                            name="serie"
                            type="number"
                            /*value={dataEx.serie}*/
                            onChange={handleChange}
                            placeholder="5"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="peso" className="text-right">
                            Peso (kg)
                        </Label>
                        <Input
                            id="peso"
                            name="peso"
                            type="number"
                            /*value={dataEx.peso}*/
                            onChange={handleChange}
                            placeholder="30"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="cardioRealizado" className="text-right">
                            Cardio (TRUE, FALSE)
                        </Label>
                        <Input
                            id="cardioRealizado"
                            name="cardioRealizado"
                            /*value={dataEx.cardioRealizado}*/
                            onChange={handleChange}
                            placeholder="false"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} type="submit">
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default ExercisePost;