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

export function DeleteListEjerciciosInRutina({ open, onClose, routineData }) {
  const [data, setData] = useState({
    nombreRutina: routineData?.nombreRutina || '',
    ejerciciosSeleccionados: routineData?.ejercicios?.map((e) => e.id) || [],
  });

  const handleCheckboxChange = (exerciseId, isChecked) => {
    setData((prev) => {
      const updatedEjercicios = isChecked
        ? [...prev.ejerciciosSeleccionados, exerciseId]
        : prev.ejerciciosSeleccionados.filter((id) => id !== exerciseId);

      return {
        ...prev,
        ejerciciosSeleccionados: updatedEjercicios,
      };
    });
  };

  const onSubmit = (e) => {
    e.preventDefault(); // prevent page refresh
    const ejerciciosSeleccionados = routineData.ejercicios.filter(exercise =>
      data.ejerciciosSeleccionados.includes(exercise.id)
    );

    const ejerciciosDTO = ejerciciosSeleccionados.map(exercise => ({
      id: exercise.id,
      nombreEjercicio: exercise.nombreEjercicio
    }));

    const updatedRoutine = {
      ejercicios: ejerciciosDTO,  // Lista de ejercicios con id y nombre
    };

    apiClient
      .delete(`/api/v1/rutina/${routineData.id}/ejercicios`, { data: updatedRoutine })
      .then((response) => {
        customToast({ message: "Ejercicios eliminados correctamente!", type: "success" });
        onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al eliminar ejercicios!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

  useEffect(() => {
    if (routineData) {
      setData({
        nombreRutina: routineData.nombreRutina || '',
        ejerciciosSeleccionados: [],
      });
    }
  }, [routineData]);

  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Eliminar Ejercicios</AlertDialogTitle>
          <AlertDialogDescription>Selecciona los ejercicios que quieres eliminar de la rutina</AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">Ejercicios disponibles:</Label>
            <div className="space-y-2">
              {routineData.ejercicios.map((exercise) => (
                <div key={exercise.id} className="items-top flex space-x-2">
                  <input
                    type="checkbox"
                    id={`exercise-${exercise.id}`}
                    checked={data.ejerciciosSeleccionados.includes(exercise.id)}
                    onChange={(e) => handleCheckboxChange(exercise.id, e.target.checked)}
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-red-500"
                  />
                  <label
                    htmlFor={`exercise-${exercise.id}`}
                    className="text-sm font-medium leading-none"
                  >
                    {exercise.nombreEjercicio}
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
                nombreRutina: routineData?.nombreRutina || '',
                ejerciciosSeleccionados: routineData?.ejercicios?.map((e) => e.id) || [],
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

export default DeleteListEjerciciosInRutina;
