import { apiClient } from '../utils/client';
import { toast } from 'sonner'

export const fetchData = async () => {
    try {
        const [exercisesResponse, routinesResponse, plansResponse] = await Promise.all([
            apiClient.get('/api/v1/ejercicios'),
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
        toast.error('Hubo un error al cargar los datos.');
        throw error; // Lanza el error para manejarlo en el componente llamante
    }
};