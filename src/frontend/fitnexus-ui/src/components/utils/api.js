import { apiClient } from '../utils/client';

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
        throw new Error('Error al cargar los datos planes/rutinas/ejercicios');
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
        throw new Error('Error al cargar los datos de clientes');
        console.error('Error al cargar los datos:', error);
    }
};