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
} from "../../../components_ui/ui/alert-dialog"
import { customToast } from '../../../utils/customToast'
import { apiClient } from '../../../utils/client';


export function DeleteModalRoutinePost ({ 
  title, description,
  open, onClose, routineData }) {

    const [data, setData] = useState({
      nombreRutina: routineData?.nombreRutina || '',
    });

const onSubmit = (e) => {
  e.preventDefault();

  console.log('Eliminando la rutina: ', data.nombreRutina);

  const response = apiClient.delete(`/api/v1/rutinas/${routineData.nombreEjercicio}`)
      .then(response => {
          console.log('Respuesta del servidor:', response.data);
          console.log('Status: ', response.status);

          if (response.status === 200) {
              customToast({message : "Rutina eliminada correctamente!", type : "success"});
          }
          if (response.status === 404) {
              customToast({message : "Rutina no encontrado", type : "error"});
          }
          if (response.status === 400) {
              customToast({message : "Error al eliminar la rutina", type : "error"});
          }
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar la rutina", type : "error"});
          console.error('Error al eliminar la rutina: ', error);
      });
      //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
  // Actualizar los datos si cambia routineData
  if (routineData) {
      setData({
          nombreRutina: routineData.nombreRutina || '',
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
