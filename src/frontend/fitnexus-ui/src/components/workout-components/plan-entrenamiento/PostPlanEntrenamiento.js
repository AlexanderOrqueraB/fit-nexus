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
import { apiClient } from '../../../utils/client';
import { customToast } from '../../../utils/customToast'
import { UserContext } from '../../global/UserContext';
import { GUARDAR_MENSAJE } from '../../../utils/env';

export function PostPlanEntrenamiento() {

    const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
    const { fitNexusId } = user; // Desestructurar el objeto user

	const [data, setData] = useState({
        nombrePlan: '',
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
		const newPlan = {
			nombrePlan: data.nombrePlan,
		};

		console.log('Enviando los siguientes datos: ', newPlan);

		apiClient
            .post(`/api/v1/planes/${fitNexusId}`, newPlan)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
                    customToast({message : "Plan de entrenamiento creado correctamente!", type : "success"});
				}
                if (response.status === 400) {
                    customToast({message : "Error al crear el plan!", type : "error"});
                }
                if (response.status === 404) {
                    customToast({message : "FitNexusID de entrenador no encontrado", type : "error"});
                }
			})
			.catch((error) => {
                customToast({message : "Error al crear el plan de entrenamiento!", type : "error"});
				console.error('Error al crear el plan de entrenamiento!', error);
			});
	};

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button size="sm" className="h-8 gap-1" variant="default">
                    Crear plan entrenamiento
                    <Pencil className="h-3.5 w-3.5 ml-2" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Plan de entrenamiento </DialogTitle>
                    <DialogDescription>Crea un plan de entrenamiento aquí</DialogDescription>
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
                            value={data.nombrePlan}
                            onChange={handleChange}
                            placeholder="Reto Verano 2025"
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

export default PostPlanEntrenamiento;