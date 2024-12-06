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
} from "../../../components_ui/ui/dialog"

import { Button } from '../../../components_ui/ui/button';
import { Input } from '../../../components_ui/ui/input';
import { Label } from '../../../components_ui/ui/label';
import { apiClient } from '../../utils/client';
import { toast } from 'sonner'
import { ENTRENADOR, PLAN } from '../../utils/hardcodedModelDtos';



export function PlanEntrenamientoFechaPost() {
    useState({});
	const [data, setData] = useState({});

	const [dataEx, setDataEx] = useState({
		//useState to store data from server
		nombrePlan: '',
		fechaInicio: '',
        fechaFinal: ''
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

    //TODO: AÑADIR GET para obtener el nombre del plan y añadirle las fechas

    const onSubmit = (e) => {
		e.preventDefault(); //prevent refresh on page
		const userData = {
			nombrePlan: data.nombrePlan,
			fechaInicio: data.fechaInicio,
            fechaFinal: data.fechaFinal
		};

		console.log('Enviando los siguientes datos: ', userData);

		apiClient
			.post('/api/v1/cambiar', userData)
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
                    Añadir fecha a plan
                    <UserCheck className="h-3.5 w-3.5" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Plan de entrenamiento</DialogTitle>
                    <DialogDescription>Añade fechas aquí</DialogDescription>
                    <DialogDescription>
                        Haz click en Guardar cuando hayas terminado
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
                            /*value={PLAN.nombrePlan}*/
                            onChange={handleChange}
                            placeholder={PLAN.nombrePlan}
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
                            /*value={ENTRENADOR.email}*/
                            onChange={handleChange}
                            placeholder={PLAN.fechaInicio}
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
                            /*value={ENTRENADOR.email}*/
                            onChange={handleChange}
                            placeholder={PLAN.fechaFinal}
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


export default PlanEntrenamientoFechaPost;