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


export function DeleteModalExercisePost ({ 
  messageButton = "Eliminar", 
  title = "Titulo ejemplo",
  description = "descripcion",
  open, onClose, exerciseData }) {

  const [data, setData] = useState({
    nombreEjercicio: exerciseData?.nombreEjercicio || '',
  });


const onSubmit = (e) => {
  e.preventDefault();

  console.log('Eliminando el ejercicio: ', data.nombreEjercicio);

  // Enviar la solicitud PUT para actualizar el ejercicio
  apiClient.delete(`/api/v1/ejercicios/${exerciseData.nombreEjercicio}`)
      .then(response => {
          console.log('Respuesta del servidor:', response.data);
          console.log('Status: ', response.status);
          if (response.status === 200) {
              customToast({message : "Ejercicio eliminado correctamente!", type : "success"});
          }
          if (response.status === 404) {
              customToast({message : "Ejercicio no encontrado", type : "error"});
          }
          if (response.status === 500) {
              customToast({message : "Error al eliminar el ejercicio", type : "error"});
          }
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar el ejercicio", type : "error"});
          console.error('Error al eliminar el ejercicio:', error);
      });
};

useEffect(() => {
  // Actualizar los datos si cambia exerciseData
  if (exerciseData) {
      setData({
          nombreEjercicio: exerciseData.nombreEjercicio || '',
      });
  }
}, [exerciseData]);


  return (
  <AlertDialog open= {open} onOpenChange={onClose}>
  <AlertDialogTrigger asChild>
    <Button variant="outline">
      {messageButton}
    </Button>
  </AlertDialogTrigger>
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
              nombreEjercicio: exerciseData?.nombreEjercicio || '',
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

export default DeleteModalExercisePost
