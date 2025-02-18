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
import { customToast } from '../../utils/customToast'
import { apiClient } from '../../utils/client';


export function DeleteModalPlanPost ({ 
  title, description,
  open, onClose, planData }) {

    const [data, setData] = useState({
      nombrePlan: planData?.nombrePlan || '',
    });

const onSubmit = (e) => {
  e.preventDefault();

  console.log('Eliminando el plan de entrenamiento: ', data.nombrePlan);

  apiClient.delete(`/api/v1/rutinas/${planData.nombrePlan}`)
      .then(response => {
          console.log('Respuesta del servidor:', response.data);
          console.log('Status: ', response.status);

          if (response.status === 200) {
          customToast({message : "Plan eliminado correctamente!", type : "success"});
          }
          if (response.status === 404) {
              customToast({message : "Plan no encontrado", type : "error"});
          }
          if (response.status === 400) {
              customToast({message : "Error al eliminar el plan", type : "error"});
          }
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar el plan", type : "error"});
          console.error('Error al eliminar el plan:', error);
      });
    //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
  // Actualizar los datos si cambia planData
  if (planData) {
      setData({
        nombrePlan: planData?.nombrePlan || '',
      });
  }
}, [planData]);


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
              nombrePlan: planData?.nombrePlan || '',
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

export default DeleteModalPlanPost
