import React, { useEffect, useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../../components_ui/ui/alert-dialog"
import { Button } from "../../../components_ui/ui/button"
import { customToast } from '../../utils/customToast'
import { apiClient } from '../../utils/client';


export function DeleteModalRoutinePost ({ 
  messageButton = "Eliminar", 
  title = "Titulo ejemplo",
  description = "descripcion",
  open, onClose, routineData }) {

    const [data, setData] = useState({
      nombreRutina: routineData?.nombreRutina || '',
      fechaInicio: routineData?.fechaInicio || '',
      fechaFinal: routineData?.fechaFinal || '',
      entrenadorEmail: routineData?.entrenadorEmail || '',
    });

  const handleChange = (e) => {
    const { name, value } = e.target;
      setData({
        ...data,
        [name]: value,
      });
};

const onSubmit = (e) => {
  e.preventDefault();
  const deletedRoutine = {
    nombreRutina: data.nombreRutina,
    fechaInicio: data.fechaInicio,
    fechaFinal: data.fechaFinal,
    entrenadorEmail: data.entrenadorEmail
  };

  console.log('Enviando los siguientes datos: ', deletedRoutine);

  // Enviar la solicitud PUT para actualizar el ejercicio
  apiClient.delete(`/api/v1/rutinas/${routineData.id}`, deletedRoutine)
      .then(response => {
          customToast({message : "Rutina eliminada correctamente!", type : "success"});
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar la rutina", type : "error"});
          console.error('Error al eliminar la rutina:', error);
      });

  console.log('Datos actualizados:', data);
  //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
  // Actualizar los datos si cambia routineData
  if (routineData) {
      setData({
          nombreRutina: routineData.nombreRutina || '',
          fechaInicio: routineData.fechaInicio || '',
          fechaFinal: routineData.fechaFinal || '',
          entrenadorEmail: routineData.entrenadorEmail || '',
      });
  }
}, [routineData]);


  return (
  <AlertDialog open= {open} onOpenChange={onClose}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
      {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel onClick={() => {
            onClose();
            setData({
              nombreRutina: routineData?.nombreRutina || '',
              fechaInicio: routineData?.fechaInicio || '',
              fechaFinal: routineData?.fechaFinal || '',
              entrenadorEmail: routineData?.entrenadorEmail || '',
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
};

export default DeleteModalRoutinePost
