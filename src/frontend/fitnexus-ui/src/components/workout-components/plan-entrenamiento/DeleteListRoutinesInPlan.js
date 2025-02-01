import React, { useEffect, useState } from 'react';
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

export function DeleteListRoutinesInPlan({ open, onClose, planData }) {
  const [data, setData] = useState({
    nombrePlan: planData?.nombrePlan || '',
    rutinasSeleccionadas: planData?.rutinas?.map((e) => e.id) || [],
  });

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
    const rutinasSeleccionadas = planData.rutinas.filter(routine =>
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
      .delete(`/api/v1/plan/${planData.id}/rutinas`, { data: updatedPlan })
      .then((response) => {
        customToast({ message: "Rutinas eliminados correctamente!", type: "success" });
        onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al eliminar rutinas!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

  useEffect(() => {
    if (planData) {
      setData({
        nombrePlan: planData.nombrePlan || '',
        rutinasSeleccionadas: [],
      });
    }
  }, [planData]);

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
              {planData.rutinas.map((routine) => (
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
