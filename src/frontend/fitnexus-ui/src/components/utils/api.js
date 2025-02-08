import { apiClient } from '../utils/client';

export const fetchWorkoutData = async (fitNexusId) => {
    try {
        const [exercisesResponse, routinesResponse, plansResponse] = await Promise.all([
            apiClient.get(`/api/v1/ejercicios/ejercicio/usuario/${fitNexusId}`),
            apiClient.get(`/api/v1/rutinas/rutina/usuario/${fitNexusId}`),
            apiClient.get(`/api/v1/planes/plan/usuario/${fitNexusId}`),
        ]);

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

export const fetchClientData = async (fitNexusId) => {
    try {
        const [clientResponse] = await Promise.all([
            apiClient.get(`/api/v1/entrenadores/${fitNexusId}`)
        ]);

        return {
            clients: clientResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        throw new Error('Error al cargar los datos de clientes');
    }
};

export const fetchMyData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/data/${fitNexusId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error('Error al cargar los datos extra:', error);
        throw new Error('Error al cargar los datos extra');
    }
};

export const fetchExtraData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/clientes/extra-data/${fitNexusId}`);
        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error('Error al cargar los datos extra:', error);
        throw new Error('Error al cargar los datos extra');
    }
};

export const createNutritionPlan = async (fitNexusId) => {
    try {
        const response = await apiClient.post('/api/v1/plan-nutri', { fitNexusId });
        return response.data;
    } catch (error) {
        console.error('Error al crear el plan nutricional:', error);
        throw new Error('Error al crear el plan nutricional');
    }
};

export const fetchNutriData = async (fitNexusId) => {
    try {
        const cliente = { fitNexusId };
        const [nutriControllerResponse] = await Promise.all([
            apiClient.get(`/api/v1/plan-nutri/gramos/${cliente.fitNexusId}`),
            apiClient.get(`/api/v1/plan-nutri/porcentajes/${cliente.fitNexusId}`),
            apiClient.get(`/api/v1/plan-nutri/kcal/${cliente.fitNexusId}`)
        ]);
        return {
            clients: nutriControllerResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        throw new Error('Error al cargar los datos de clientes');
    }
};