import React, { useEffect, useState } from 'react';
import { Building, Pencil, UserCheck } from 'lucide-react';
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
import { mockEntrenador, mockRoutinesBuilder } from '../../../mocks/mockData'


export function PostRutina() {
    useState({});
	const [data, setData] = useState({});

	const [dataEx, setDataEx] = useState({
		//useState to store data from server
		nombreRutina: '',
		fechaInicio: '',
		fechaFinal: '',
		entrenadorEmail: ''
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
		const userData = {
			nombreRutina: data.nombreRutina,
			fechaInicio: data.fechaInicio,
			fechaFinal: data.fechaFinal,
			entrenadorEmail: data.entrenadorEmail
		};

		console.log('Enviando los siguientes datos: ', userData);

		apiClient
			.post('/api/v1/rutina', userData)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
                    customToast({message : "Rutina creada correctamente!", type : "success"});
				}
			})
			.catch((error) => {
                customToast({message : "Error al crear rutina!", type : "error"});
				console.error('Error al crear rutina!', error);
			});
	};

    useEffect(() => {
	}, []);

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" variant="default">
                    Crear rutina
                    <Pencil className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rutina</DialogTitle>
                    <DialogDescription>Crea tu rutina aquí</DialogDescription>
                    <DialogDescription>
                        Haz click en Guardar cuando hayas terminado
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombreRutina" className="text-right">
                            Nombre de la rutina
                        </Label>
                        <Input
                            id="nombreRutina"
                            name="nombreRutina"
                            /*value={mockRoutinesBuilder.nombreRutina}*/
                            onChange={handleChange}
                            placeholder={mockRoutinesBuilder.nombreRutina}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fechaFinal" className="text-right">
                            Fecha Inicio
                        </Label>
                        <Input
                            id="fechaInicio"
                            name="fechaInicio"
                            type="date"
                            /*value={mockRoutinesBuilder.fechaInicio}*/
                            onChange={handleChange}
                            placeholder={mockRoutinesBuilder.fechaInicio}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fechaFinal" className="text-right">
                            Fecha Final
                        </Label>
                        <Input
                            id="fechaFinal"
                            name="fechaFinal"
                            type="date"
                            /*value={dataEx.repeticion}*/
                            onChange={handleChange}
                            placeholder={mockRoutinesBuilder.fechaFinal}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="entrenador" className="text-right">
                            Entrenador
                        </Label>
                        <Input
                            id="entrenador"
                            name="entrenador"
                            type="email"
                            /*value={dataEx.peso}*/
                            onChange={handleChange}
                            placeholder={mockEntrenador.email}
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

export default PostRutina;