import { apiClient } from './client';
import customToast from './customToast';

export const fetchWorkoutData = async (fitNexusId) => {
    try {
        const [exercisesResponse, routinesResponse, plansResponse] = await Promise.all([
            apiClient.get(`/api/v1/ejercicios/ejercicio/usuario/${fitNexusId}`),
            apiClient.get(`/api/v1/rutinas/rutina/usuario/${fitNexusId}`),
            apiClient.get(`/api/v1/planes/plan/usuario/${fitNexusId}`),
        ]);

        if (exercisesResponse.status === 400) {
            customToast({ message: 'Error al cargar los ejercicios', type: 'error' }); 
        }

        if (routinesResponse.status === 400) {
            customToast({ message: 'Error al cargar las rutinas', type: 'error' }); 
        }

        if (plansResponse.status === 400) {
            customToast({ message: 'Error al cargar los planes', type: 'error' }); 
        }

        if (exercisesResponse.status === 404) {
            customToast({ message: 'Datos no encontrados (FitNexusId o ejercicio)', type: 'error' }); 
        }

        if (routinesResponse.status === 404) {
            customToast({ message: 'Datos no encontrados (FitNexusId o rutina)', type: 'error' }); 
        }

        if (plansResponse.status === 404) {
            customToast({ message: 'Datos no encontrados (FitNexusId o plan)', type: 'error' }); 
        }

        if (exercisesResponse.status === 200 && routinesResponse.status === 200 && plansResponse.status === 200) {
            customToast({ message: 'Datos cargados correctamente', type: 'success' });
        }

        return {
            exercises: exercisesResponse.data,
            routines: routinesResponse.data,
            plans: plansResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los datos planes/rutinas/ejercicios', type: 'error' }); 
    }
};

export const fetchClientData = async (fitNexusId) => {
    try {
        const [clientResponse] = await Promise.all([
            apiClient.get(`/api/v1/entrenadores/${fitNexusId}`)
        ]);
 
        if (clientResponse.status === 200) {
            customToast({ message: 'Datos de cliente cargados correctamente', type: 'success' });
            return clientResponse
        }

        if (clientResponse.status === 400) {
            customToast({ message: 'Error al cargar los clientes', type: 'error' }); 
        }

        if (clientResponse.status === 404) {
            customToast({ message: 'Datos de entrenador no encontrados con fitNexusId: ', type: 'warning' }); 
        }

        return { clients: [] };

    } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los clientes', type: 'error' }); 
        return { clients: [] };
    }
};

export const fetchMyData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/data/${fitNexusId}`);
        if (response.status === 200) {
            customToast({ message: 'Datos cargados correctamente', type: 'success' }); 
        }

        if (response.status === 400) {
            customToast({ message: 'Error al cargar tus datos', type: 'error' }); 
        }

        if (response.status === 404) {
            customToast({ message: 'Datos de entrenador no encontrados con fitNexusId: '
                + fitNexusId , type: 'warning' }); 
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los datos', type: 'error' }); 
    }
};

export const fetchExtraData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/clientes/extra-data/${fitNexusId}`);
        if (response.status === 200) {
            customToast({ message: 'Datos cargados correctamente', type: 'success' }); 
        }

        if(response.status === 400) {
            customToast({ message: 'Error al cargar los datos extra', type: 'error' }); 
        }

        if (response.status === 404) {
            customToast({ message: 'Datos de cliente no encontrados con fitNexusId: ',
                 fitNexusId , type: 'warning' }); 
        }

        return response.data;
    } catch (error) {
        if (error.response && error.response.status === 404) {
            return null;
        }
        console.error('Error al cargar los datos extra:', error);
        customToast({ message: 'Error al cargar los datos extra', type: 'error' }); 
    }
};

export const createNutritionPlan = async (email) => {
    try {
        const response = await apiClient.post('/api/v1/plan-nutri', { email });
        
        if (response.status === 200) {
            customToast({ message: 'Plan nutricional creado correctamente', type: 'success' });
        }

        if (response.status === 400) {
            customToast({ message: 'Error al crear el plan nutricional', type: 'error' }); 
        }

        return response.data;
    } catch (error) {
        console.error('Error al crear el plan nutricional:', error);
        customToast({ message: 'Error al crear el plan nutricional', type: 'error' }); 
    }
};

export const fetchNutriData = async (fitNexusId) => {
    try {
        const cliente = { fitNexusId };
        const [nutriGramosResponse, nutriPorcentajesResponse, nutriKcalResponse] = await Promise.all([
            apiClient.get(`/api/v1/plan-nutri/gramos/${cliente.fitNexusId}`),
            apiClient.get(`/api/v1/plan-nutri/porcentajes/${cliente.fitNexusId}`),
            apiClient.get(`/api/v1/plan-nutri/kcal/${cliente.fitNexusId}`)
        ]);

        if (nutriGramosResponse.status === 200 && nutriPorcentajesResponse.status === 200 && nutriKcalResponse.status === 200) {
            customToast({ message: 'Datos cargados correctamente', type: 'success' });
        }

        if (nutriGramosResponse.status === 400) {
            customToast({ message: 'Error al cargar los datos nutricionales en gramos', type: 'error' }); 
        }
        if (nutriPorcentajesResponse.status === 400) {
            customToast({ message: 'Error al cargar los datos nutricionales en porcentaje', type: 'error' }); 
        }
        if (nutriKcalResponse.status === 404) {
            customToast({ message: 'Datos nutricionales en kcal no encontrados', type: 'error' }); 
        }
        
        return {
            gramos: nutriGramosResponse.data,
            porcentajes: nutriPorcentajesResponse.data,
            kcal: nutriKcalResponse.data
        };
    } catch (error) {
        console.error('Error al cargar los datos nutricionales:', error);
        customToast({ message: 'Error al cargar los datos nutricionales', type: 'error' });
    }
};