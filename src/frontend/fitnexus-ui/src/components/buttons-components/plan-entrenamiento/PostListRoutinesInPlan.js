import React, { useEffect, useState } from 'react';
import { apiClient } from '../../utils/client';
import { customToast } from '../../utils/customToast';
import { Button } from '../../../components_ui/ui/button';
import { Input } from '../../../components_ui/ui/input';
import { Label } from '../../../components_ui/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components_ui/ui/dialog";

const testRoutines = [
    {
        "id": 15,
        "nombreRutina": "Torso423"
      },
      {
        "id": 16,
        "nombreRutina": "Pierna423"
      }
];

export function PostListRoutinesInPlan({ open, onClose, planData }) {
    const [data, setData] = useState({
    nombreRutina: planData?.nombreRutina || '',
    rutinasSeleccionadas: planData?.rutinas?.map((e) => e.id) || [],
    });

  const [availableRoutines, setAvailableRoutines] = useState(testRoutines);

  const handleCheckboxChange = (routineId, isChecked) => {
    console.log('Checkbox change:', routineId, isChecked); // Log the exercise id and checked status

    setData((prev) => {
      const updatedRutinas = isChecked
        ? [...prev.rutinasSeleccionadas, routineId]
        : prev.rutinasSeleccionadas.filter((id) => id !== routineId);
        
      console.log('Updated rutinasSeleccionadas:', updatedRutinas); // Log the updated list of selected exercises

      return {
        ...prev,
        rutinasSeleccionadas: updatedRutinas,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    const rutinasSeleccionadas = availableRoutines.filter(routine => 
        data.rutinasSeleccionadas.includes(routine.id)
      );
    
    const rutinasDTO = rutinasSeleccionadas.map(routine => ({
    id: routine.id,
    nombreRutina: routine.nombreRutina
    }));

    const updatedPlan = {
    ejercicios: rutinasDTO,  // Lista de RUTINAS con id y nombre
    };

    console.log('Enviando los siguientes datos: ', updatedPlan);

    apiClient
        .post(`/api/v1/plan/${planData.id}/rutinas`, updatedPlan)
        .then((response) => {
        console.log('Respuesta del servidor: ', response.data);
        console.log('Status: ', response.status);
        if (response.status === 200) {
          customToast({ message: "Plan actualizado correctamente!", type: "success" });
        }
        onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al añadir rutinas!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

  useEffect(() => {
    console.log("Plan Data in PostListRoutinesInPlan:", planData);
    if (planData) {
      setData({
        nombrePlan: planData.nombrePlan || '',
        rutinasSeleccionadas: planData.rutinas?.map((e) => e.id) || [],
      });
    }
    if (planData && planData.rutinas) {
        const selectedRoutineIds = planData.rutinas.map(e => e.id);
        setAvailableRoutines(testRoutines);
        setData((prev) => ({
          ...prev,
          rutinasSeleccionadas: selectedRoutineIds.filter(id => testRoutines.some(routine => routine.id === id)),
        }));
      }
  }, [planData]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modificar Plan</DialogTitle>
          <DialogDescription>Selecciona las rutinas que quieres añadir al plan</DialogDescription>
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
              value={data.nombrePlan || ''}
              disabled
              className="col-span-3"
            />
          </div>
  
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Rutinas disponibles:</Label>
            <div className="space-y-2">
              {availableRoutines.map((routine) => (
                <div key={routine.id} className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id={`routine-${routine.id}`}
                    checked={data.rutinasSeleccionadas.includes(routine.id)}
                    onChange={(e) => handleCheckboxChange(routine.id, e.target.checked)}
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500"
                  />
                  <label
                    htmlFor={`routine-${routine.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {routine.nombreRutina}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
}

export default PostListRoutinesInPlan;
