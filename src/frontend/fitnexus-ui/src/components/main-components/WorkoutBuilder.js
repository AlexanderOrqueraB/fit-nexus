import { Button } from '../../components_ui/ui/button';
import React, { useRef, useEffect, useState } from 'react';
import { customToast } from '../utils/customToast'
import { apiClient } from '../utils/client';

import PostExercise from '../buttons-components/ejercicio/PostExercise';
import PutExercise from '../buttons-components/ejercicio/PutExercise';
import GetExerciseByName from '../buttons-components/ejercicio/GetExerciseByName';
import DeleteExercise from '../buttons-components/ejercicio/DeleteExercise';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../components_ui/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { MoreHorizontal, RefreshCwIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components_ui/ui/card';
import { fetchWorkoutData } from '../utils/api';

import PostRutina from '../buttons-components/rutina/PostRutina';
import PostListEjerciciosInRutina from '../buttons-components/rutina/PostListEjerciciosInRutina';
import GetRutinaByName from '../buttons-components/rutina/GetRutinaByName';
import GetRutinaById from '../buttons-components/rutina/GetRutinaById';
import DeleteExerciseListByName from '../buttons-components/rutina/DeleteExerciseListByName';

import PostPlanEntrenamientoFecha  from '../buttons-components/plan-entrenamiento/PostPlanEntrenamientoFecha';
import PostPlanEntrenamiento  from '../buttons-components/plan-entrenamiento/PostPlanEntrenamiento';
import { Dialog } from '../../components_ui/ui/dialog';

export function WorkoutBuilder() {
  const [data, setData] = useState({}); //useState to store data from server

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  //estado booleando para "test mode"
  const [isTestMode, setIsTestMode] = useState(false);

  const testExercises = [
    {
      id: 1,
      nombreEjercicio: 'Dominadas',
      repeticion: 10,
      serie: 3,
      peso: 0,
      cardioRealizado: false,
    },
    {
      id: 2,
      nombreEjercicio: 'Press Banca',
      repeticion: 12,
      serie: 4,
      peso: 50,
      cardioRealizado: false,
    },
  ];
  
  const testRoutines = [
    {
      id: 1,
      nombreRutina: 'Rutina Fuerza',
      fechaInicio: '2024-12-01',
      fechaFinal: '2024-12-31',
      ejercicios: [
        { nombreEjercicio: 'Sentadilla' },
        { nombreEjercicio: 'Peso Muerto' },
      ],
    },
  ];
  
  const testPlans = [
    {
      id: 1,
      nombrePlan: 'Plan Noviembre',
      fechaInicio: '2024-11-01',
      fechaFinal: '2024-11-30',
      rutinas: [{ nombreRutina: 'Rutina de Pecho' }],
    },
  ];

  //Alternamos entre datos reales y datos de prueba
  const displayedExercises = (isTestMode ? testExercises : exercises) || [];
  const displayedRoutines = (isTestMode ? testRoutines : routines) || [];
  const displayedPlans = (isTestMode ? testPlans : plans) || [];

  const [isEditOpen, setIsEditOpen] = useState(false);

  // Cargar datos desde varias fuentes simultáneamente
  const loadData = async () => {
    try {
      // Ejecutar todas las solicitudes en paralelo
      const { exercises, routines, plans } = await fetchWorkoutData();

      // Actualizar los estados con los datos obtenidos
      setExercises(exercises);
      setRoutines(routines);
      setPlans(plans);
    } catch (error) {
      console.error('Error al cargar datos:', error);
      customToast({message : "Hubo un error al cargar los datos de planes/rutinas/ejercicios", type : "error"});
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Llama a loadData solo al montar el componente

  const handleEditClick = (item, type) => {
    if (type === 'exercise') {
      setSelectedExercise(item);
    } else if (type === 'routine') {
      setSelectedRoutine(item);
    } else if (type === 'plan') {
      setSelectedPlan(item);
    }
    setIsEditOpen(true);
  };

  // Handle changes on inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  //TODO: Example to get all, get by id and get by title
  const get_id = useRef(null);
  const get_title = useRef(null);

  const [getResult, setGetResult] = useState(null);

  const fortmatResponse = (res) => {
    return JSON.stringify(res, null, 2);
  };

  //TODO: Examples, not tested yet
  async function getAllData() {
    try {
      const res = await apiClient.get('/test');
      //apiClient.get("/tutorials");

      const result = {
        status: res.status + '-' + res.statusText,
        headers: res.headers,
        data: res.data,
      };

      setGetResult(fortmatResponse(result));
    } catch (err) {
      setGetResult(fortmatResponse(err.response?.data || err));
    }
  }
  //TODO: Examples, not tested yet
  async function getDataById() {
    const id = get_id.current.value;

    if (id) {
      try {
        const res = await apiClient.get('/test');
        //apiClient.get(`/tutorials/${id}`);

        const result = {
          data: res.data,
          status: res.status,
          statusText: res.statusText,
          headers: res.headers,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }

  //TODO: Examples, not tested yet
  async function getDataByTitle() {
    const title = get_title.current.value;

    if (title) {
      try {
        // const res = await instance.get(`/tutorials?title=${title}`);
        const res = await apiClient.get('/test');
        //apiClient.get("/tutorials", {
        //  params: {
        //  title: title,
        // },
        // });

        const result = {
          status: res.status + '-' + res.statusText,
          headers: res.headers,
          data: res.data,
        };

        setGetResult(fortmatResponse(result));
      } catch (err) {
        setGetResult(fortmatResponse(err.response?.data || err));
      }
    }
  }
  //TODO: Examples, not tested yet
  const clearGetOutput = () => {
    setGetResult(null);
  };

  //TODO example in return () <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
  //  <div className="input-group-append">
  //  <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
  //  </div>

  // <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>

  const onSubmit = (e) => {
    e.preventDefault(); //prevent refresh on page
    const userData = {
      nombreEjercicio: data.nombreEjercicio,
      repeticion: data.repeticion,
      serie: data.serie,
      peso: data.peso,
      cardioRealizado: data.cardioRealizado,
    };

    console.log('Enviando los siguientes datos: ', userData);

    //TODO: Review createEmployee(employee){
    //        return apiClient.post(EMPLOYEE_API_BASE_URL, employee);
    //    }

    //TODO: Review example 1 getEmployeeById(employeeId){
    //        return apiClient.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    //    }

    //TODO: Review example 2 export const getProductById = async (id) => {
    //  try {
    //    const response = await apiClient.get(`${apiUrl}/${id}`);
    //    return response.data;
    //  } catch (error) {
    //    throw error;
    //  }
    //}

    apiClient
      .post('/api/v1/ejercicios', userData)
      //.put(URL, userData)
      .then((response) => {
        console.log('Respuesta del servidor: ', response.data);
        console.log('Status: ', response.status);
        if (response.status === 201) {
          console.log('Mostrando Toast de Ejercicio Guardado...');
          customToast({message : "Cambiar mensaje", type : "success"});

        }
      })
      .catch((error) => {
        console.error('Error en la petición: ', error);
      });
  };

  return (
    <div>
      <div>
        <div className="flex flex-row space-x-4">
          <PostExercise />
          <PutExercise />
          <GetExerciseByName />
          <DeleteExercise/>
        </div>
        <div className="flex flex-row space-x-4"> 
					<PostRutina/>
					<PostListEjerciciosInRutina/>
					<GetRutinaByName/>
					<GetRutinaById/>
					<DeleteExerciseListByName/>
				</div>
				<div className="flex flex-row space-x-4"> 
					<PostPlanEntrenamiento/>
					<PostPlanEntrenamientoFecha/>
				</div>
      </div>

      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <Tabs defaultValue="plan">
                <div className="flex items-center">
                  <TabsList className="flex items-center space-x-4">
                    <TabsTrigger value="plan">Planes</TabsTrigger>
                    <TabsTrigger value="rutina">Rutinas</TabsTrigger>
                    <TabsTrigger value="ejercicio">Ejercicios</TabsTrigger>
                    <Button onClick={() => setIsTestMode(!isTestMode)}>
                      {isTestMode ? 'Usar Datos Reales' : 'Usar Datos de Prueba'}
                    </Button>
                    <div className="ml-auto">
                      <Button onClick={() => loadData()}>
                        <RefreshCwIcon className="h-3.5 w-3.5" />
                          Refrescar datos
                      </Button>
                    </div>
                  </TabsList>
                </div>
                <TabsContent value="plan">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Planes de entrenamiento</CardTitle>
                      <CardDescription>
                        A continuación puedes ver tus planes de entrenamiento creados
											</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre del plan</TableHead>
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Fecha Final
														</TableHead>
                            <TableHead className="hidden md:table-cell">Rutinas</TableHead>
                            <TableHead className="hidden md:table-cell">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedPlans.map((plan) => (
                            <TableRow key={plan.id}>
                              <TableCell className="font-medium">
                                {plan.nombrePlan}
                              </TableCell>
                              <TableCell className="font-medium">
                                {plan.fechaInicio}
                              </TableCell>
                              <TableCell className="font-medium">
                                {plan.fechaFinal}
                              </TableCell>
                              <TableCell className="font-medium">
                                {plan.rutinas.map((rutina, index) => (
                                  <div key={index}>{rutina.nombreRutina}</div>
                                ))}
                              </TableCell>

                              <TableCell>
                                <Dialog>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleEditClick(plan, 'plan')
                                      }
                                    >
                                      Editar
																		</DropdownMenuItem>
                                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
          Test
        </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                                </Dialog>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rutina">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Rutinas</CardTitle>
                      <CardDescription>
                        A continuación puedes ver tus rutinas creadas.
											</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre de la rutina</TableHead>
                            <TableHead>Fecha Inicio</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Fecha Final
														</TableHead>
                            <TableHead className="hidden md:table-cell">
                              Ejercicios
														</TableHead>
                            <TableHead className="hidden md:table-cell">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedRoutines.map((routine) => (
                            <TableRow key={routine.id}>
                              <TableCell className="font-medium">
                                {routine.nombreRutina}
                              </TableCell>
                              <TableCell className="font-medium">
                                {routine.fechaInicio}
                              </TableCell>
                              <TableCell className="font-medium">
                                {routine.fechaFinal}
                              </TableCell>
                              <TableCell className="font-medium">
                                {routine.ejercicios.map((ejercicio, index) => (
                                  <div key={index}>{ejercicio.nombreEjercicio}</div>
                                ))}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleEditClick(routine, 'routine')
                                      }
                                    >
                                      Editar
																		</DropdownMenuItem>
                                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ejercicio">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Ejercicios</CardTitle>
                      <CardDescription>
                        A continuación puedes ver tus ejercicios creados.
											</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Nombre del ejercicio</TableHead>
                            <TableHead>Repeticiones</TableHead>
                            <TableHead className="hidden md:table-cell">Series</TableHead>
                            <TableHead className="hidden md:table-cell">Peso</TableHead>
                            <TableHead className="hidden md:table-cell">Cardio</TableHead>
                            <TableHead className="hidden md:table-cell">Acciones</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedExercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                              <TableCell className="font-medium">
                                {exercise.nombreEjercicio}
                              </TableCell>
                              <TableCell className="font-medium">
                                {exercise.repeticion}
                              </TableCell>
                              <TableCell className="font-medium">
                                {exercise.serie}
                              </TableCell>
                              <TableCell className="font-medium">
                                {exercise.peso}
                              </TableCell>
                              <TableCell className="font-medium">
                                {exercise.cardioRealizado ? 'Sí' : 'No'}
                              </TableCell>
                              <TableCell>
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                    >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                    <DropdownMenuItem
                                      onClick={() =>
                                        handleEditClick(exercise, 'exercise')
                                      }
                                    >
                                      Editar
																		</DropdownMenuItem>
                                    <DropdownMenuItem>Añadir imagen</DropdownMenuItem>
                                    <DropdownMenuItem>Eliminar</DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {isEditOpen && (
                        <PutExercise
                          open={isEditOpen}
                          onClose={() => setIsEditOpen(false)}
                          exerciseData={selectedExercise}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default WorkoutBuilder;
