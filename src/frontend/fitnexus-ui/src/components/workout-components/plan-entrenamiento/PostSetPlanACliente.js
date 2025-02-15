import React, { useEffect, useState } from 'react';
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
import { apiClient } from '../../utils/client';
import { customToast } from '../../utils/customToast'

export function PostSetPlanACliente ({ open, onClose, planData }) {
    const [data, setData] = useState({
        nombrePlan: planData?.nombrePlan || '',
        clienteFitNexusId: '',
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
		const assignedPlan = {
			nombrePlan: data.nombrePlan,
			clienteFitNexusId: data.clienteFitNexusId,
		};

		console.log('Enviando los siguientes datos: ', assignedPlan);

		apiClient
			.post('/api/v1/planes/asignar-plan', assignedPlan)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 200) {
                    customToast({message : "Plan asignado correctamente!", type : "success"});
				}
                if (response.status === 404) {
                    customToast({message : "Plan o cliente no encontrado!", type : "error"});
                }
                if (response.status === 409) {
                    customToast({message : "El cliente ya tiene ese plan asignado!", type : "error"});
                }
                if (response.status === 400) {
                    customToast({message : "Error al asignar el plan de entrenamiento!", type : "error"});
                }
                
                onClose(); // Cerrar el modal
			})
			.catch((error) => {
                customToast({message : "Error al asignar el plan de entrenamiento!", type : "error"});
				console.error('Error al asignar el plan de entrenamiento', error);
			});
            console.log('Datos actualizados:', data);
            //onClose(); // Cerrar el modal después de guardar
	};

    useEffect(() => {
        // Actualizar los datos si cambia planData
        if (planData) {
            setData({
                nombrePlan: planData?.nombrePlan || '',
                clienteFitNexusId: planData?.clienteFitNexusId || '',
            });
        }
    }, [planData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Plan</DialogTitle>
                    <DialogDescription>
                        Haz click en Asignar plan cuando hayas terminado
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
                            disabled
                            value={data.nombrePlan || ''}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="nombrePlan" className="text-right">
                            FitNexusID del cliente
                        </Label>
                        <Input
                            id="fitNexusId"
                            name="clienteFitNexusId"
                            onChange={handleChange}
                            value={data.clienteFitNexusId || ''}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={onSubmit} type="submit">
                        Asignar plan
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PostSetPlanACliente;