import { apiClient } from './client';
import customToast from './customToast';

export const fetchWorkoutData = async (fitNexusId) => {
    try {
            const exercisesResponse = await apiClient.get(`/api/v1/ejercicios/ejercicio/usuario/${fitNexusId}`);
            const routinesResponse = await apiClient.get(`/api/v1/rutinas/rutina/usuario/${fitNexusId}`);
            const plansResponse = await apiClient.get(`/api/v1/planes/plan/usuario/${fitNexusId}`);

            //console.log("LOG- Ejercicios Response:", exercisesResponse.data);
            //console.log("LOG- Rutinas Response:", routinesResponse.data);
            //console.log("LOG- Planes Response:", plansResponse.data);
    
            if (exercisesResponse.status === 400) {
                customToast({ message: 'Error al cargar los ejercicios', type: 'error' }); 
            } else if (exercisesResponse.status === 404) {
                customToast({ message: 'Datos no encontrados (FitNexusId o ejercicio)', type: 'error' }); 
            }

            if (routinesResponse.status === 400) {
                customToast({ message: 'Error al cargar las rutinas', type: 'error' }); 
            } else if (routinesResponse.status === 404) {
                customToast({ message: 'Datos no encontrados (FitNexusId o rutina)', type: 'error' }); 
            }
            
            if (plansResponse.status === 400) {
                customToast({ message: 'Error al cargar los planes', type: 'error' }); 
            } else if (plansResponse.status === 404) {
                customToast({ message: 'Datos no encontrados (FitNexusId o plan)', type: 'error' }); 
            }

            if (exercisesResponse.status === 200 && routinesResponse.status === 200 && plansResponse.status === 200) {
                console.log("Datos de entrenamiento cargados correctamente con el FitNexusId: ", fitNexusId);
                if (exercisesResponse.data.length === 0) {
                    customToast({ message: 'No tienes ejercicios guardados', type: 'info' });
                } 
                if (routinesResponse.data.length === 0) {
                    customToast({ message: 'No tienes rutinas guardadas', type: 'info' });
                }
                if (plansResponse.data.length === 0) {
                    customToast({ message: 'No tienes planes guardados', type: 'info' });
                }
            }

            return {
                exercises: exercisesResponse.data,
                routines: routinesResponse.data,
                plans: plansResponse.data
            };
    } catch (error) {
        console.error('Error al cargar los datos:', error);
        customToast({ message: 'Error al cargar los datos planes/rutinas/ejercicios', type: 'error' }); 
        return {
            exercises: [],
            routines: [],
            plans: [],
        };
    }
};

export const fetchClientData = async (fitNexusId) => {
    try {
        const clientsListResponse = await apiClient.get(`/api/v1/entrenadores/${fitNexusId}`);

        if (clientsListResponse.status === 200) {
            const clients = clientsListResponse.data;
            console.log ("Datos de cliente cargados correctamente en api.js desde API", clients);
            return { clients }
        }

        if (clientsListResponse.status === 400) {
            customToast({ message: 'Error al cargar los clientes', type: 'error' });
            return { clients: [] };
        }

        if (clientsListResponse.status === 404) {
            customToast({ message: 'Datos de entrenador no encontrados con fitNexusId: ', type: 'warning' });
            return { clients: [] };
        }

    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                customToast({ message: 'Error al cargar los datos de clientes ', type: 'error' });
                console.error('Error 400 al cargar los datos de clientes:', error);
            } else if (error.response.status === 404) {
                customToast({ message: 'Clientes no encontrados ', type: 'warning' });
                console.error('Error 404 al cargar los datos de clientes:', error);
            }
        } else {
            console.error('Error al cargar los datos:', error);
            customToast({ message: 'Error al cargar los datos', type: 'error' });
        }
        return null;
    }
};

export const fetchMyData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/data/${fitNexusId}`);
        if (response.status === 200) {
            console.log("Datos del usuario cargados correctamente por su FitNexusId: ", fitNexusId);
        }

        if (response.status === 400) {
            customToast({ message: 'Error al cargar tus datos con ese FitNexusId', type: 'error' });
        }

        if (response.status === 404) {
            customToast({ message: 'Datos de entrenador no encontrados con FitNexusId: '
                + fitNexusId , type: 'warning' }); 
        }

        return response.data;
    } catch (error) {
        if (error.response) {
            if (error.response.status === 400) {
                customToast({ message: 'Error al cargar los datos', type: 'error' });
                console.error('Error 400 al cargar los datos con el FitNexusId: ', fitNexusId, error);
            } else if (error.response.status === 404) {
                customToast({ message: 'Datos no encontrados', type: 'warning' });
                console.error('Error 404 al cargar los datos con el FitNexusId: ', fitNexusId, error);
            }
        } else {
            console.error('Error al cargar los datos:', error);
            customToast({ message: 'Error al cargar los datos', type: 'error' });
        }
        return null;
    }
};

export const fetchExtraData = async (fitNexusId) => {
    try {
        const response = await apiClient.get(`/api/v1/clientes/extra-data/${fitNexusId}`);
        if (response.status === 200) {
            console.log("Datos del usuario cargados correctamente por su FitNexusId: ", fitNexusId);
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
        if (error.response) {
            if (error.response.status === 400) {
                customToast({ message: 'Error al cargar los datos extra', type: 'error' });
                console.error('Error 400 al cargar los datos extra con el FitNexusId: ', fitNexusId, error);
            } else if (error.response.status === 404) {
                customToast({ message: 'Datos extra no encontrados (404)', type: 'warning' });
                console.error('Error 404 al cargar los datos extra con el FitNexusId: ', fitNexusId, error);
            }
        } else {
            console.error('Error al cargar los datos extra:', error);
            customToast({ message: 'Error al cargar los datos extra', type: 'error' });
        }
        return null;
    }
};

export const createNutritionPlan = async (email) => {
    try {
        const response = await apiClient.post('/api/v1/plan-nutri', { email });
        
        if (response.status === 201) {
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
        console.log("Ejecutando fetchNutriData con este fitNexusId: " + cliente.fitNexusId);
            const nutriGramosResponse = await apiClient.get(`/api/v1/plan-nutri/gramos/${cliente.fitNexusId}`);
            const nutriPorcentajesResponse = await apiClient.get(`/api/v1/plan-nutri/porcentajes/${cliente.fitNexusId}`);
            const nutriKcalResponse = await apiClient.get(`/api/v1/plan-nutri/kcal/${cliente.fitNexusId}`);

        if (nutriGramosResponse.status === 200 && nutriPorcentajesResponse.status === 200 && nutriKcalResponse.status === 200) {
            console.log("Datos nutri cargados correctamente con el FitNexusId: ", fitNexusId)
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
        console.error('Error al cargar los datos nutricionales desde fetchNutriData (api.js):', error);
        return null;
    }
};