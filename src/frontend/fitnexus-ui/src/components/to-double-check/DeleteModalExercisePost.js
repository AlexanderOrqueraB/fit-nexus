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
} from "../../components_ui/ui/alert-dialog"
import { Button } from "../../components_ui/ui/button"
import { customToast } from '../utils/customToast'
import { apiClient } from '../utils/client';


export function DeleteModalExercisePost ({ 
  messageButton = "Eliminar", 
  title = "Titulo ejemplo",
  description = "descripcion",
  open, onClose, exerciseData }) {

    const [data, setData] = useState({
      nombreEjercicio: exerciseData?.nombreEjercicio || '',
      repeticion: exerciseData?.repeticion || '',
      serie: exerciseData?.serie || '',
      peso: exerciseData?.peso || '',
      cardioRealizado: exerciseData?.cardioRealizado || '',
    });
{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}

const [dataEx, setDataEx] = useState({
  //useState to store data from server
  nombreEjercicio: '',
  repeticion: '',
  serie: '',
  peso: '',
  cardioRealizado: '',
});


{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}
  const handleChange = (e) => {
  const { name, value } = e.target;
  setData({
    ...data,
    [name]: value,
  });
};

const onSubmit = (e) => {
  e.preventDefault();
  const deletedExercise = {
      nombreEjercicio: data.nombreEjercicio,
      repeticion: data.repeticion,
      serie: data.serie,
      peso: data.peso,
      cardioRealizado: data.cardioRealizado,
  };

  console.log('Enviando los siguientes datos: ', deletedExercise);

  // Enviar la solicitud PUT para actualizar el ejercicio
  apiClient.delete(`/api/v1/ejercicios/${exerciseData.id}`, deletedExercise)
      .then(response => {
          customToast({message : "Ejercicio eliminado correctamente!", type : "success"});
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar el ejercicio", type : "error"});
          console.error('Error al eliminar el ejercicio:', error);
      });

  console.log('Datos actualizados:', data);
  //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
  // Actualizar los datos si cambia exerciseData
  if (exerciseData) {
      setData({
          nombreEjercicio: exerciseData.nombreEjercicio || '',
          repeticion: exerciseData.repeticion || '',
          serie: exerciseData.serie || '',
          peso: exerciseData.peso || '',
          cardioRealizado: exerciseData.cardioRealizado || '',
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
              repeticion: exerciseData?.repeticion || '',
              serie: exerciseData?.serie || '',
              peso: exerciseData?.peso || '',
              cardioRealizado: exerciseData?.cardioRealizado || '',
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
