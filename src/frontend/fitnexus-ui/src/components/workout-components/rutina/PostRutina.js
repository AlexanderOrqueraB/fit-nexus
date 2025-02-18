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

export function PostRutina() {

    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const { fitNexusId } = user; // Desestructurar el objeto user

	const [data, setData] = useState({
        nombreRutina: '',
		fechaInicio: '',
		fechaFinal: '',
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
		const newRoutine = {
			nombreRutina: data.nombreRutina,
			fechaInicio: data.fechaInicio,
			fechaFinal: data.fechaFinal,
		};

		console.log('Enviando los siguientes datos: ', newRoutine);

		apiClient
            .post(`/api/v1/rutinas/${fitNexusId}`, newRoutine)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
                    customToast({message : "Rutina creada correctamente!", type : "success"});
				}
                if (response.status === 400) {
                    customToast({message : "Error al crear la rutina!", type : "error"});
                }
                if (response.status === 404) {
                    customToast({message : "FitNexusID de entrenador no encontrado", type : "error"});
                }
			})
			.catch((error) => {
                customToast({message : "Error al crear rutina!", type : "error"});
				console.error('Error al crear rutina!', error);
			});
	};

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
                        {GUARDAR_MENSAJE}
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
                            value={data.nombreRutina}
                            onChange={handleChange}
                            placeholder="Rutina de torso"
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fechaInicio" className="text-right">
                            Fecha Inicio
                        </Label>
                        <Input
                            id="fechaInicio"
                            name="fechaInicio"
                            type="date"
                            value={data.fechaInicio}
                            onChange={handleChange}
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
                            value={data.fechaFinal}
                            onChange={handleChange}
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