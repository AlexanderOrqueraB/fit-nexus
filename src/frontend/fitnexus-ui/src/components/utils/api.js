import { apiClient } from '../utils/client';

export const fetchWorkoutData = async (userEmail) => {
    try {
        const [exercisesResponse, routinesResponse, plansResponse] = await Promise.all([
            apiClient.get('/api/v1/ejercicios/ejercicios-dto'),
            apiClient.get('/api/v1/rutinas'),
            apiClient.get('/api/v1/planes')
        ]);

        //TODO: Change URL to use pathvariable email and change it also in the backend

        return {
            exercises: exercisesResponse.data,
            routines: routinesResponse.data,
            plans: plansResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        throw new Error('Error al cargar los datos planes/rutinas/ejercicios');
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
        throw new Error('Error al cargar los datos de clientes');
    }
};

export const fetchExtraData = async (email) => {
    try {
        const response = await apiClient.get(`/api/v1/clientes/extra-data/${email}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error('Error al cargar los datos extra:', error);
        throw new Error('Error al cargar los datos extra');
    }
};

export const createNutritionPlan = async (email) => {
    try {
        const response = await apiClient.post('/api/v1/plan-nutri', { email });
        return response.data;
    } catch (error) {
        console.error('Error al crear el plan nutricional:', error);
        throw new Error('Error al crear el plan nutricional');
    }
};

export const fetchNutriData = async () => {
    try {
        const cliente = { id: 1 }; // TODO: Get the client id from the logged user
        const [nutriControllerResponse] = await Promise.all([
            apiClient.get(`/api/v1/plan-nutri/gramos/${cliente.id}`),
            apiClient.get(`/api/v1/plan-nutri/porcentajes/${cliente.id}`),
            apiClient.get(`/api/v1/plan-nutri/kcal/${cliente.id}`)
        ]);
        return {
            clients: nutriControllerResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        throw new Error('Error al cargar los datos de clientes');
    }
};