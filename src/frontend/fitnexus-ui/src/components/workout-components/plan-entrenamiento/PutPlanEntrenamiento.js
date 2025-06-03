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


export function PutPlanEntrenamiento ({ open, onClose, planData }) {

    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const { fitNexusId } = user; // Desestructurar el objeto user

    const [data, setData] = useState({
        nombrePlan: planData?.nombrePlan || '',
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
		const updatedPlan = {
			nombrePlan: data.nombrePlan,
		};

		console.log('Enviando los siguientes datos: ', updatedPlan);

		apiClient
            .put(`/api/v1/planes/${fitNexusId}`, updatedPlan)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 200) {
                    customToast({message : "Plan actualizado correctamente!", type : "success"});
				}
                if (response.status === 404) {
                    customToast({message : "FitNexusID de entrenador o plan no encontrado", type : "error"});
                }
                onClose(); // Cerrar el modal
			})
			.catch((error) => {
                customToast({message : "Error al actualizar el plan de entrenamiento!", type : "error"});
				console.error('Error al actualizar el plan de entrenamiento', error);
			});
            //onClose(); // Cerrar el modal después de guardar
	};

    useEffect(() => {
        // Actualizar los datos si cambia planData
        if (planData) {
            setData({
                nombrePlan: planData?.nombrePlan || '',
            });
        }
    }, [planData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Plan</DialogTitle>
                    <DialogDescription>Edita tu plan aquí</DialogDescription>
                    <DialogDescription>
                        {GUARDAR_MENSAJE}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombrePlan" className="text-right">
                            Nombre del plan
                        </Label>
                        <Input
                            id="nombrePlan"
                            name="nombrePlan"
                            onChange={handleChange}
                            value={data.nombrePlan || ''}
                            className="col-span-3"
                            disabled
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

export default PutPlanEntrenamiento;