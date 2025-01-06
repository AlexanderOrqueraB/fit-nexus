import { apiClient } from '../utils/client';
import { customToast } from '../utils/customToast'

export const fetchWorkoutData = async () => {
    try {
        const [exercisesResponse, routinesResponse, plansResponse] = await Promise.all([
            apiClient.get('/api/v1/ejercicios/ejercicios-dto'),
            apiClient.get('/api/v1/rutinas'),
            apiClient.get('/api/v1/planes')
        ]);

        return {
            exercises: exercisesResponse.data,
            routines: routinesResponse.data,
            plans: plansResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
    }
};

export const fetchClientData = async () => {
    try {
        const [clientResponse] = await Promise.all([
            apiClient.get('/api/v1/clientes')
        ]);

        return {
            clients: clientResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({message : "Hubo un error al cargar los datos", type : "error"});
    }
};