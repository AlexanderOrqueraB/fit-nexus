import React, { useEffect, useContext, useState } from 'react';
import { apiClient } from '../../../utils/client';
import { customToast } from '../../../utils/customToast';
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
import { GUARDAR_MENSAJE } from '../../../utils/env';
import { UserContext } from '../../global/UserContext';
import { fetchWorkoutData } from '../../../utils/api';

export function PutListRoutinesInPlan({ open, onClose, planData }) {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user
  
  const [data, setData] = useState({
  nombrePlan: planData?.nombrePlan || '',
  rutinasSeleccionadas: planData?.rutinas?.map((e) => e.id) || [],
  });

  const [availableRoutines, setAvailableRoutines] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { routines } = await fetchWorkoutData(fitNexusId);
        const selectedRoutineIds = planData.rutinas.map(e => e.id);
        const filteredRoutines = routines.filter(routine => !selectedRoutineIds.includes(routine.id));
        setAvailableRoutines(filteredRoutines);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los datos de rutinas', type: 'error' });
      }
    };

    if (planData) {
      setData({
        nombrePlan: planData.nombrePlan || '',
        rutinasSeleccionadas: planData.rutinas?.map((e) => e.id) || [],
      });
      loadData();
    }
  }, [planData]);

  const handleCheckboxChange = (routineId, isChecked) => {
    console.log('Checkbox change:', routineId, isChecked); 

    setData((prev) => {
      const updatedRutinas = isChecked
        ? [...prev.rutinasSeleccionadas, routineId]
        : prev.rutinasSeleccionadas.filter((id) => id !== routineId);
        
      console.log('Updated rutinasSeleccionadas:', updatedRutinas);

      return {
        ...prev,
        rutinasSeleccionadas: updatedRutinas,
      };
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault(); // prevent page refresh
    const rutinasSeleccionadas = availableRoutines.filter(routine => 
        data.rutinasSeleccionadas.includes(routine.id)
      );
    
    const rutinasDTO = rutinasSeleccionadas.map(routine => ({
    id: routine.id,
    nombreRutina: routine.nombreRutina
    }));

    const updatedPlan = {
    rutinas: rutinasDTO,  // Lista de RUTINAS con id y nombre
    };

    console.log('Enviando los siguientes datos: ', updatedPlan);

    try {
      const response = await apiClient
        .put(`/api/v1/planes/plan/rutinas/${planData.id}`, updatedPlan);

      console.log('Respuesta del servidor: ', response.data);
      console.log('Status: ', response.status);
      if (response.status === 200) {
        customToast({ message: "Plan actualizado correctamente!", type: "success" });
      }
      onClose(); // Close the modal
    } catch (error) {
      if (error.response) {
        if (error.response.status === 404) {
          customToast({ message: "Plan de entrenamiento no encontrado!", type: "warning" });
        }
        if (error.response.status === 500) {
          customToast({ message: "Runtime exception from @Transactional!", type: "error" });
        }
        onClose(); // Close the modal
      } else {
              console.error('Error al realizar la operación', error);
              customToast({ message: 'Error al realizar la operación', type: 'error' });
          }
          return null;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modificar Plan</DialogTitle>
          <DialogDescription>Selecciona las rutinas que quieres añadir al plan</DialogDescription>
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
            Guardar cambios
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
  
}

export default PutListRoutinesInPlan;
