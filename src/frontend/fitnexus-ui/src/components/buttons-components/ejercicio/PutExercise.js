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
import { customToast } from '../../utils/customToast'


export function PutExercise ({ open, onClose, exerciseData }) {
    const [data, setData] = useState({
        nombreEjercicio: exerciseData?.nombreEjercicio || '',
        repeticion: exerciseData?.repeticion || '',
        serie: exerciseData?.serie || '',
        peso: exerciseData?.peso || '',
        cardioRealizado: exerciseData?.cardioRealizado || '',
        });

    const [dataEx, setDataEx] = useState({
        //useState to store data from server
        nombreEjercicio: '',
        repeticion: '',
        serie: '',
        peso: '',
        cardioRealizado: '',
    });

{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}
    const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

const onSubmit = (e) => {
    e.preventDefault();
    const updatedExercise = {
        nombreEjercicio: data.nombreEjercicio,
        repeticion: data.repeticion,
        serie: data.serie,
        peso: data.peso,
        cardioRealizado: data.cardioRealizado,
    };

    console.log('Enviando los siguientes datos: ', updatedExercise);

    // Enviar la solicitud PUT para actualizar el ejercicio
    apiClient.put(`/api/v1/ejercicios/${exerciseData.id}`, updatedExercise)
        .then(response => {
            console.log('Respuesta del servidor: ', response.data);
            console.log('Status: ', response.status);
            if (response.status ===200) {
                customToast({message : "Ejercicio actualizado correctamente!", type : "error"});
            }
            onClose(); // Cerrar el modal
        })
        .catch(error => {
            customToast({message : "Error al actualizar el ejercicio!", type : "error"});
            console.error('Error al actualizar el ejercicio:', error);
        });
    console.log('Datos actualizados:', data);
    //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
    // Actualizar los datos si cambia exerciseData
    if (exerciseData) {
        setData({
            nombreEjercicio: exerciseData.nombreEjercicio || '',
            repeticion: exerciseData.repeticion || '',
            serie: exerciseData.serie || '',
            peso: exerciseData.peso || '',
            cardioRealizado: exerciseData.cardioRealizado || '',
        });
    }
}, [exerciseData]);


    return (
        <Dialog open={open} onOpenChange={onClose}>
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
                            value={data.nombreEjercicio || ''}
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
                            value={data.repeticion || ''}
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
                            value={data.serie || ''}
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
                            value={data.peso || ''}
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
                            value={data.cardioRealizado || ''}
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


export default PutExercise;