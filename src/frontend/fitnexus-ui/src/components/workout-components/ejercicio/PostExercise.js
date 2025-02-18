import React, { useContext, useState } from 'react';
import { Pencil } from 'lucide-react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../components_ui/ui/dialog"

import { Button } from '../../../components_ui/ui/button';
import { Input } from '../../../components_ui/ui/input';
import { Label } from '../../../components_ui/ui/label';
import { apiClient } from '../../utils/client';
import { customToast } from '../../utils/customToast'
import { UserContext } from '../../main-components/UserContext';
import { GUARDAR_MENSAJE } from '../../utils/env';

export function PostExercise() {

    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const { fitNexusId } = user; // Desestructurar el objeto user
    
	const [data, setData] = useState({
		//useState to store data from server
		nombreEjercicio: '',
		repeticion: '',
		serie: '',
		peso: '',
		cardioRealizado: '',
	});

    const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

    const onSubmit = (e) => {
		e.preventDefault(); //prevent refresh on page
		const newExercise = {
			nombreEjercicio: data.nombreEjercicio,
			repeticion: data.repeticion,
			serie: data.serie,
			peso: data.peso,
			cardioRealizado: data.cardioRealizado,
		};

		console.log('Enviando los siguientes datos: ', newExercise);

		apiClient
			.post(`/api/v1/ejercicios/${fitNexusId}`, newExercise)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
					customToast({message : "Ejercicio creado correctamente!", type : "success"});
				}
                if (response.status === 400) {
                    customToast({message : "Error al crear el ejercicio!", type : "error"});
                }
                if (response.status === 404) {
                    customToast({message : "FitNexusID de entrenador no encontrado", type : "error"});
                }
			})
			.catch((error) => {
                customToast({message : "Error al crear el ejercicio!", type : "error"});
				console.error('Error al crear el ejercicio: ', error);
			});
	};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-10 gap-1" variant="default">
                    Crear ejercicio
                    <Pencil className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Ejercicio</DialogTitle>
                    <DialogDescription>Crea un ejercicio aquí</DialogDescription>
                    <DialogDescription>
                        {GUARDAR_MENSAJE}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombreEjercicio" className="text-right">
                            Nombre del ejercicio
                        </Label>
                        <Input
                            id="nombreEjercicio"
                            name="nombreEjercicio"
                            value={data.nombreEjercicio}
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
                            value={data.repeticion}
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
                            value={data.serie}
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
                            value={data.peso}
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
                            value={data.cardioRealizado}
                            onChange={handleChange}
                            placeholder="false"
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={onSubmit}>
                        Guardar cambios
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PostExercise;