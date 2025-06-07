import React, { useEffect, useContext, useState } from 'react';
import { apiClient } from '../../../utils/client';
import { customToast } from '../../../utils/customToast';
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
import { fetchWorkoutData } from '../../../utils/api';
import { UserContext } from '../../global/UserContext';

export function DeleteListEjerciciosInRutina({ open, onClose, routineData }) {
  
  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user
  
  const [data, setData] = useState({
    nombreRutina: routineData?.nombreRutina || '',
    ejerciciosSeleccionados: routineData?.ejercicios?.map((e) => e.id) || [],
  });

  const [availableExercises, setAvailableExercises] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const { exercises } = await fetchWorkoutData(fitNexusId);
        const selectedExerciseIds = routineData.ejercicios.map(e => e.id);
        const filteredExercises = exercises.filter(exercise => selectedExerciseIds.includes(exercise.id));
        setAvailableExercises(filteredExercises);
      } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los datos de ejercicios', type: 'error' });
      }
    };

    if (routineData) {
      setData({
        nombreRutina: routineData.nombreRutina || '',
        ejerciciosSeleccionados: routineData.ejercicios?.map((e) => e.id) || [],
      });
      loadData();
    }
  }, [routineData]);

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
    const ejerciciosSeleccionados = availableExercises.filter(exercise =>
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
      .delete(`/api/v1/rutinas/rutina/ejercicios/${routineData.id}`, { data: updatedRoutine })
      .then((response) => {
      console.log('Respuesta del servidor: ', response.data);
      console.log('Status: ', response.status);
      if (response.status === 200) {
        customToast({ message: "Ejercicios eliminados correctamente!", type: "success" });
      }
      if (response.status === 500) {
        customToast({ message: "Runtime exception from @Transactional!", type: "error" });
      }
      onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al eliminar ejercicios!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

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
              {availableExercises.map((exercise) => (
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
