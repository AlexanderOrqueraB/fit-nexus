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

import { fetchWorkoutData } from '../../../utils/api';
import { UserContext } from '../../global/UserContext';

export function PostListEjerciciosInRutina({ open, onClose, routineData }) {

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
        const filteredExercises = exercises.filter(exercise => !selectedExerciseIds.includes(exercise.id));
        setAvailableExercises(filteredExercises);
      } catch (error) {
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
    console.log('Checkbox change:', exerciseId, isChecked); // Log the exercise id and checked status

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
    ejercicios: ejerciciosDTO,  // Lista de EJERCICIOS con id y nombre
    };

    console.log('Enviando los siguientes datos: ', updatedRoutine);

    apiClient
        .post(`/api/v1/rutina/ejercicios/${routineData.id}`, updatedRoutine)
        .then((response) => {
        console.log('Respuesta del servidor: ', response.data);
        console.log('Status: ', response.status);
        if (response.status === 200) {
          customToast({ message: "Rutina actualizada correctamente!", type: "success" });
        }
        if (response.status === 404) {
          customToast({ message: "Rutina no encontrada!", type: "warning" });
        }
        if (response.status === 500) {
          customToast({ message: "Runtime exception from @Transactional!", type: "error" });
        }
        onClose(); // Close the modal
      })
      .catch((error) => {
        customToast({ message: "Error al añadir ejercicios!", type: "error" });
        console.error('Error en la petición: ', error);
      });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Modificar Rutina</DialogTitle>
          <DialogDescription>Selecciona los ejercicios que quieres añadir a la rutina</DialogDescription>
          <DialogDescription>
            {GUARDAR_MENSAJE}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombreRutina" className="text-right">
              Nombre de la rutina
            </Label>
            <Input
              id="nombreRutina"
              name="nombreRutina"
              value={data.nombreRutina || ''}
              disabled
              className="col-span-3"
            />
          </div>
  
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
                    className="h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-500"
                  />
                  <label
                    htmlFor={`exercise-${exercise.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {exercise.nombreEjercicio}
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

export default PostListEjerciciosInRutina;
