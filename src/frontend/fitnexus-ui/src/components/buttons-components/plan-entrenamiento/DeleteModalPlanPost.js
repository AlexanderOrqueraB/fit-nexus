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


export function DeleteModalPlanPost ({ 
  title = "Titulo ejemplo",
  description = "descripcion",
  open, onClose, planData }) {

    const [data, setData] = useState({
      nombrePlan: planData?.nombrePlan || '',
      entrenadorEmail: planData?.entrenadorEmail || '',
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
  const deletedPlan = {
    nombrePlan: data.nombrePlan,
    entrenadorEmail: data.entrenadorEmail,
  };

  console.log('Enviando los siguientes datos: ', deletedPlan);

  apiClient.delete(`/api/v1/plan/${planData.id}`, deletedPlan)
      .then(response => {
          customToast({message : "Plan eliminado correctamente!", type : "success"});
          onClose(); // Cerrar el modal
      })
      .catch(error => {
          customToast({message : "Error al eliminar el plan", type : "error"});
          console.error('Error al eliminar el plan:', error);
      });

  console.log('Datos actualizados:', data);
  //onClose(); // Cerrar el modal después de guardar
};

useEffect(() => {
  // Actualizar los datos si cambia planData
  if (planData) {
      setData({
        nombrePlan: planData?.nombrePlan || '',
        entrenadorEmail: planData?.entrenadorEmail || '',
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
              entrenadorEmail: planData?.entrenadorEmail || '',
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
