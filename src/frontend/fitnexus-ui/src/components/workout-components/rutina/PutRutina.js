import React, { useContext, useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../../components_ui/ui/dialog"

import { Button } from '../../../components_ui/ui/button';
import { Input } from '../../../components_ui/ui/input';
import { Label } from '../../../components_ui/ui/label';
import { apiClient } from '../../../utils/client';
import { customToast } from '../../../utils/customToast'
import { UserContext } from '../../global/UserContext';
import { GUARDAR_MENSAJE } from '../../../utils/env';

export function PutRutina ({ open, onClose, routineData }) {

    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const { fitNexusId } = user; // Desestructurar el objeto user

    const [data, setData] = useState({
        nombreRutina: routineData?.nombreRutina || '',
        fechaInicio: routineData?.fechaInicio || '',
        fechaFinal: routineData?.fechaFinal || '',
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
        if (new Date(data.fechaFinal) < new Date(data.fechaInicio)) {
            customToast({
                message: "La fecha final no puede ser anterior a la fecha inicial.",
                type: "error",
            });
            return;
        }

		const updatedRoutine = {
			nombreRutina: data.nombreRutina,
			fechaInicio: data.fechaInicio,
			fechaFinal: data.fechaFinal,
		};

		console.log('Enviando los siguientes datos: ', updatedRoutine);

		apiClient
			.put(`/api/v1/rutinas/${fitNexusId}`, updatedRoutine)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 200) {
                    customToast({message : "Rutina actualizada correctamente!", type : "success"});
				}
                if (response.status === 404) {
                    customToast({message : "FitNexusID de entrenador o rutina no encontrada", type : "error"});
                }
                onClose(); // Cerrar el modal
			})
			.catch((error) => {
                customToast({message : "Error al actualizar la rutina!", type : "error"});
				console.error('Error al actualizar la rutina: ', error);
			});
            //onClose(); // Cerrar el modal después de guardar
	};

    useEffect(() => {
        // Actualizar los datos si cambia routineData
        if (routineData) {
            setData({
                nombreRutina: routineData.nombreRutina || '',
                fechaInicio: routineData.fechaInicio || '',
                fechaFinal: routineData.fechaFinal || '',
            });
        }
    }, [routineData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Rutina</DialogTitle>
                    <DialogDescription>Edita tu rutina aquí</DialogDescription>
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
                            onChange={handleChange}
                            value={data.nombreRutina || ''}
                            className="col-span-3"
                            disabled
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
                            onChange={handleChange}
                            value={data.fechaInicio  || ''}
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
                            onChange={handleChange}
                            value={data.fechaFinal  || ''}
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

export default PutRutina;