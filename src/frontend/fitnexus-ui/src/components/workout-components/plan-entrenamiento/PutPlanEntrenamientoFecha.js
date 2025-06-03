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
import { apiClient } from '../../../utils/client';
import { planWithEntrenador } from '../../../mocks/mockData'
import { customToast } from '../../../utils/customToast'
import { GUARDAR_MENSAJE } from '../../../utils/env';

export function PutPlanEntrenamientoFecha ({ open, onClose, planData }) {
    const [data, setData] = useState({
        nombrePlan: planData?.nombrePlan || '',
        fechaInicio: planData?.fechaInicio || '',
        fechaFinal: planData?.fechaFinal || '',
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

        const updatedPlan = {
			nombrePlan: data.nombrePlan,
			fechaInicio: data.fechaInicio,
            fechaFinal: data.fechaFinal
		};

		console.log('Enviando los siguientes datos: ', updatedPlan);
		apiClient
			.put('/api/v1/planes/plan/fecha', updatedPlan)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 200) {
                    customToast({message : "Fecha del plan actualizada correctamente!", type : "success"});
				}
                if (response.status === 404) {
                    customToast({message : "Plan de entrenamiento no encontrado!", type : "warning"});
				}
                if (response.status === 400) {
                    customToast({message : "Error al actualizar la fecha del plan de entrenamiento!", type : "error"});
				}
			})
			.catch((error) => {
                customToast({message : "Error al actualizar la fecha del plan de entrenamiento!", type : "error"});
			});
	};

    useEffect(() => {
        // Actualizar los datos si cambia planData
        if (planData) {
            setData({
                nombrePlan: planData?.nombrePlan || '',
                fechaInicio: planData?.fechaInicio || '',
                fechaFinal: planData?.fechaFinal || '',
            });
        }
    }, [planData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Plan de entrenamiento</DialogTitle>
                    <DialogDescription>Edita la fecha aquí</DialogDescription>
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
                            value={planWithEntrenador.nombrePlan}
                            disabled
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="fechaInicial" className="text-right">
                            Fecha Inicial
                        </Label>
                        <Input
                            id="fechaInicial"
                            name="fechaInicial"
                            type="date"
                            value={data.fechaInicio || ''}
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
                            value={data.fechaFinal || ''}
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

export default PutPlanEntrenamientoFecha;