import React, { useEffect, useContext, useState } from 'react';
import { apiClient } from '../../utils/client';
import { customToast } from '../../utils/customToast';
import { Label } from '../../../components_ui/ui/label';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
  } from "../../../components_ui/ui/alert-dialog"

import { fetchWorkoutData } from '../../utils/api';
import { UserContext } from '../../main-components/UserContext';

export function DeleteListRoutinesInPlan({ open, onClose, planData }) {

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
        const filteredRoutines = routines.filter(routine => selectedRoutineIds.includes(routine.id));
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
    setData((prev) => {
      const updatedRutinas = isChecked
        ? [...prev.rutinasSeleccionadas, routineId]
        : prev.rutinasSeleccionadas.filter((id) => id !== routineId);

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
      rutinas: rutinasDTO,  // Lista de rutinas con id y nombre
    };

    apiClient
      .delete(`/api/v1/planes/plan/rutinas/${planData.id}`, { data: updatedPlan })
      .then((response) => {
        console.log('Respuesta del servidor: ', response.data);
        console.log('Status: ', response.status);
        if (response.status === 200) {
          customToast({ message: "Rutinas eliminadas correctamente!", type: "success" });
        }
        if (response.status === 500) {
          customToast({ message: "Runtime exception from @Transactional!", type: "error" });
        }
        onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al eliminar rutinas!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Rutinas</AlertDialogTitle>
          <AlertDialogDescription>Selecciona los rutinas que quieres eliminar del plan</AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="grid gap-4 py-4">
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
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-red-500"
                  />
                  <label
                    htmlFor={`routine-${routine.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {routine.nombreRutina}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        <AlertDialogFooter>
        <AlertDialogCancel onClick={() => {
            onClose();
            setData({
                nombrePlan: planData?.nombrePlan || '',
                rutinasSeleccionadas: planData?.rutinas?.map((e) => e.id) || [],
            });
          }}>
            Cancelar
        </AlertDialogCancel>
        <AlertDialogAction onClick={onSubmit}>
            Eliminar
        </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteListRoutinesInPlan;
