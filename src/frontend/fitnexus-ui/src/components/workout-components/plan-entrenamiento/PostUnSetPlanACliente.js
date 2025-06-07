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

import { apiClient } from '../../../utils/client';
import { customToast } from '../../../utils/customToast'

export function PostUnSetPlanACliente ({ 
    title, description, open, onClose, planData }) {
    
    const [data, setData] = useState({
            nombrePlan: planData?.nombrePlan || '',
            clienteFitNexusId: '',
    });

    const onSubmit = async (e) => {
        e.preventDefault(); //prevent refresh on page
        const assignedPlan = {
            nombrePlan: data.nombrePlan,
            clienteFitNexusId: data.clienteFitNexusId,
        };

        console.log('Enviando los siguientes datos: ', assignedPlan);

        try {
            const planResponse = await apiClient
                .post('/api/v1/planes/plan/desasignar-plan', assignedPlan);
                console.log('Respuesta del servidor: ', planResponse.data);
                console.log('Status: ', planResponse.status);

                if (planResponse.status === 200) {
                    customToast({message : "Plan desasignado correctamente!", type : "success"});
                }
                onClose(); // Cerrar el modal
            } catch (error) {
                if (error.response) {
                    if (error.response.status === 400) {
                        customToast({ message: 'Error al desasignar el plan de entrenamiento! ', type: 'error' });
                        console.error('Error al desasignar el plan de entrenamiento!', error);
                    } else if (error.response.status === 404) {
                        customToast({ message: 'Plan o cliente no encontrado!', type: 'warning' });
                        console.error('Plan o cliente no encontrado!', error);
                    }
                    else if (error.response.status === 409) {
                        customToast({ message: 'El cliente no tiene asignado el plan!', type: 'warning' });
                        console.error('El cliente no tiene asignado el plan!', error);
                    }
                } else {
                    console.error('Error al realizar la operación', error);
                    customToast({ message: 'Error al realizar la operación', type: 'error' });
                }
                return null;
            }
        };

    useEffect(() => {
        // Actualizar los datos si cambia planData
        if (planData) {
            setData({
                nombrePlan: planData?.nombrePlan || '',
                clienteFitNexusId: planData?.clienteFitNexusId || '',
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
    }

export default PostUnSetPlanACliente;