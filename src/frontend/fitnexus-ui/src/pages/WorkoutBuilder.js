import { Button } from '../components_ui/ui/button';
import React, { useContext, useEffect, useState } from 'react';
import { customToast } from '../utils/customToast'
import PostExercise from '../components/workout-components/ejercicio/PostExercise';
import PutExercise from '../components/workout-components/ejercicio/PutExercise';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components_ui/ui/tabs';
import { Calendar, CalendarDays, CircleMinusIcon, CirclePlusIcon, Edit, RefreshCwIcon, Trash2Icon, UserRoundPlus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components_ui/ui/card';
import { fetchWorkoutData } from '../utils/api';
import PostRutina from '../components/workout-components/rutina/PostRutina';
import PostListEjerciciosInRutina from '../components/workout-components/rutina/PostListEjerciciosInRutina';
import PostPlanEntrenamientoFecha from '../components/workout-components/plan-entrenamiento/PostPlanEntrenamientoFecha';
import PutPlanEntrenamientoFecha  from '../components/workout-components/plan-entrenamiento/PutPlanEntrenamientoFecha';
import PostPlanEntrenamiento  from '../components/workout-components/plan-entrenamiento/PostPlanEntrenamiento';
import DeleteModalExercisePost from '../components/workout-components/ejercicio/DeleteModalExercisePost';
import PutRutina from '../components/workout-components/rutina/PutRutina';
import DeleteModalRoutinePost from '../components/workout-components/rutina/DeleteModalRoutinePost';
import DeleteListEjerciciosInRutina from '../components/workout-components/rutina/DeleteListEjerciciosInRutina';
import PutPlanEntrenamiento from '../components/workout-components/plan-entrenamiento/PutPlanEntrenamiento';
import DeleteModalPlanPost from '../components/workout-components/plan-entrenamiento/DeleteModalPlanPost';
import PostListRoutinesInPlan from '../components/workout-components/plan-entrenamiento/PostListRoutinesInPlan';
import DeleteListRoutinesInPlan from '../components/workout-components/plan-entrenamiento/DeleteListRoutinesInPlan';
import { mockExercises, mockRoutinesBuilder, mockPlans, mockClients } from '../mocks/mockData'
import { UserContext } from "../components/global/UserContext";
import { formatDateToDDMMYYYY } from '../utils/utilsMethod';
import {   DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger, } from '../components_ui/ui/dropdown-menu';
  import {
    ListFilter,
  } from "lucide-react";
import { PostSetPlanACliente } from '../components/workout-components/plan-entrenamiento/PostSetPlanACliente';

const deleteMessage = "deleteMessage"
const deleteTitle = "¡¡ Esta acción NO se puede revertir !!"
const deleteDescription = "Pulsa Eliminar para confirmar la acción de eliminar, Cancelar para salir"

export function WorkoutBuilder() {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState({});

  const [routines, setRoutines] = useState([]);
  const [selectedRoutine, setSelectedRoutine] = useState(null);

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const [isTestMode, setIsTestMode] = useState(false);

  const displayedExercises = (isTestMode ? mockExercises : exercises) || [];
  const displayedRoutines = (isTestMode ? mockRoutinesBuilder : routines) || [];
  const displayedPlans = (isTestMode ? mockPlans : plans) || [];

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  //rutina
  const [isAddExerciseToRoutineOpen, setIsAddExerciseToRoutineOpen] = useState(false);
  const [isRemoveExerciseFromRoutineOpen, setIsRemoveExerciseFromRoutineOpen] = useState(false);

  //plan
  const [isAddRoutineToPlanOpen, setIsAddRoutineToPlanOpen] = useState(false);
  const [isRemoveRoutineFromPlanOpen, setIsRemoveRoutineFromPlanOpen] = useState(false);
  const [isAddDateOpen, setIsAddDateOpen] = useState(false);
  const [isEditDateOpen, setIsEditDateOpen] = useState(false);
  const [isSetPlanToClientOpen, setIsSetPlanToClientOpen] = useState(false);	

  const [visibleColumns, setVisibleColumns] = useState([
    "nombrePlan",
    "cliente",
    "fecha Inicio",
    "fecha Final",
    "rutinas",
    "Asignar",
    "Editar",
    "Añadir fechas",
    "Cambiar fechas",
    "Añadir",
    "Quitar",
    "Eliminar",
  ]);

  // Estado para rastrear la pestaña activa
  const [activeTab, setActiveTab] = useState('planes'); 

  const loadData = async () => {
    try {
      const { exercises, routines, plans } = await fetchWorkoutData(fitNexusId);

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
    setIsDeleteOpen(false);
  };

  const handleDeleteClick = (item, type) => {
    if (type === 'exercise') {
      setSelectedExercise(item);
    } else if (type === 'routine') {
      setSelectedRoutine(item);
    } else if (type === 'plan') {
      setSelectedPlan(item);
    }
    setIsDeleteOpen(true);
    setIsEditOpen(false);
  };

  //rutina
  const handleAddExerciseToRoutine = (routine) => {
    console.log("Selected Routine:", routine);
    setSelectedRoutine(routine);
    setIsAddExerciseToRoutineOpen(true);
  };
  const handleRemoveExerciseFromRoutine = (routine) => {
    console.log("Selected Routine:", routine);
    setSelectedExercise(routine); // Guarda la rutina que tiene ejercicios seleccionados
    setIsRemoveExerciseFromRoutineOpen(true); // Abre el modal de eliminación
  };

  //plan
  const handleAddRoutineToPlan = (plan) => {
    console.log("Selected Plan:", plan);
    setSelectedPlan(plan);
    setIsAddRoutineToPlanOpen(true);
  };
  const handleRemoveRoutineFromPlan = (plan) => {
    console.log("Selected Plan:", plan);
    setSelectedRoutine(plan); // Guarda el plan que tiene rutinas seleccionadas
    setIsRemoveRoutineFromPlanOpen(true); // Abre el modal de eliminación
  };
  const handleAddDate = (plan) => {
    console.log("Selected Plan:", plan);
    setSelectedPlan(plan);
    setIsAddDateOpen(true);
  }
  const handleEditDate = (plan) => {
    console.log("Selected Plan:", plan);
    setSelectedPlan(plan);
    setIsEditDateOpen(true);
  }
  const handleSetPlanToClient = (plan) => {
    console.log("Selected Plan:", plan);
    setSelectedPlan(plan);
    setIsSetPlanToClientOpen(true);
  }
  
  return (
    <React.Fragment>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <Tabs defaultValue="ejercicio" onValueChange={(value) => setActiveTab(value)}>
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
                  {activeTab === 'plan' && (
                  <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filtro
                        </span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {[
                        "nombrePlan",
                        "cliente",
                        "fecha Inicio",
                        "fecha Final",
                        "rutinas",
                        "Asignar",
                        "Editar",
                        "Añadir fechas",
                        "Cambiar fechas",
                        "Añadir",
                        "Quitar",
                        "Eliminar",
                      ].map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column}
                          checked={visibleColumns.includes(column)}
                          onCheckedChange={() => {
                            setVisibleColumns((prev) =>
                              prev.includes(column)
                                ? prev.filter((col) => col !== column)
                                : [...prev, column]
                            );
                          }}
                        >
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
                </div>


                <TabsContent value="plan">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Planes de entrenamiento</CardTitle>
                      <div className= "text-right">
                        <PostPlanEntrenamiento />
                      </div>
                      <CardDescription>
                        A continuación puedes ver tus planes de entrenamiento creados
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                          {visibleColumns.includes("nombrePlan") && (
                            <TableHead>Nombre del plan</TableHead>
                          )}
                            {visibleColumns.includes("cliente") && (
                            <TableHead className="hidden md:table-cell">Cliente</TableHead>
                            )}
                            {visibleColumns.includes("fecha Inicio") && (
                            <TableHead className="hidden md:table-cell">Fecha Inicio</TableHead>
                            )}
                            {visibleColumns.includes("fecha Final") && (
                            <TableHead className="hidden md:table-cell">Fecha Final</TableHead>
                            )}
                            {visibleColumns.includes("rutinas") && (
                            <TableHead className="hidden md:table-cell">Rutinas</TableHead>
                          )}
                            {visibleColumns.includes("Asignar") && (
                            <TableHead className="hidden md:table-cell">Asignar</TableHead>
                          )}
                            {visibleColumns.includes("Editar") && (
                            <TableHead className="hidden md:table-cell">Editar</TableHead>
                          )}
                            {visibleColumns.includes("Añadir fechas") && (
                            <TableHead className="hidden md:table-cell">Añadir fechas</TableHead>
                          )}
                            {visibleColumns.includes("Cambiar fechas") && (
                            <TableHead className="hidden md:table-cell">Cambiar fechas</TableHead>
                          )}
                            {visibleColumns.includes("Añadir") && (
                            <TableHead className="hidden md:table-cell">Añadir</TableHead>
                          )}
                            {visibleColumns.includes("Quitar") && (
                            <TableHead className="hidden md:table-cell">Quitar</TableHead>
                          )}
                            {visibleColumns.includes("Eliminar") && (
                            <TableHead className="hidden md:table-cell">Eliminar</TableHead>
                          )}
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedPlans.map((plan) => (
                            <TableRow key={plan.id}>
                              {visibleColumns.includes("nombrePlan") && (
                                /*<TableCell className="font-medium">{clientNameMap[plan.fitNexusId] || plan.fitNexusId}</TableCell>*/
                              <TableCell className="font-medium">{plan.nombrePlan}</TableCell>
                            )}
                              {visibleColumns.includes("cliente") && (
                              <TableCell className="font-medium">{mockClients[0].fitNexusId || ''
                              }</TableCell>
                              )}
                              {visibleColumns.includes("fecha Inicio") && (
                              <TableCell className="font-medium">{plan.fechaInicio ? formatDateToDDMMYYYY(plan.fechaInicio) : ''}</TableCell>
                              )}
                              {visibleColumns.includes("fecha Final") && (
                              <TableCell className="font-medium">{plan.fechaFinal ? formatDateToDDMMYYYY(plan.fechaFinal) : ''}</TableCell>
                              )}
                              {visibleColumns.includes("rutinas") && (
                              <TableCell className="font-medium">
                              <ul className="list-disc pl-4">
                                {plan.rutinas.map((rutina, index) => (
                                  <li key={index}>{rutina.nombreRutina}</li>
                                ))}
                              </ul>
                              </TableCell>
                              )}
                              {visibleColumns.includes("Asignar") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleSetPlanToClient(plan, 'plan')}>
                                  <UserRoundPlus/>
                                </Button>
                              </TableCell>
                              )}
                              {visibleColumns.includes("Editar") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEditClick(plan, 'plan')}>
                                  <Edit/>
                                </Button>
                              </TableCell>
                              )}
                              {visibleColumns.includes("Añadir fechas") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleAddDate(plan, 'plan')}>
                                  <Calendar/>
                                </Button>
                              </TableCell>
                              )}
                              {visibleColumns.includes("Cambiar fechas") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEditDate(plan, 'plan')}>
                                  <CalendarDays/>
                                </Button>
                              </TableCell>
                              )}
                              {visibleColumns.includes("Añadir") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleAddRoutineToPlan(plan)}>
                                  <CirclePlusIcon/>
                                </Button>
                              </TableCell>
                            )}
                              {visibleColumns.includes("Quitar") && (
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleRemoveRoutineFromPlan(plan)}>
                                  <CircleMinusIcon />
                                </Button>
                              </TableCell>
                            )}
                              {visibleColumns.includes("Eliminar") && (
                              <TableCell>
                                <Button 
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleDeleteClick(plan, 'plan')}>
                                <Trash2Icon color="red"/>
                                </Button>
                              </TableCell>
                            )}
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {isEditOpen && (
                        <PutPlanEntrenamiento
                          open={isEditOpen}
                          onClose={() => setIsEditOpen(false)}
                          planData={selectedPlan}
                        />
                      )}
                      {isSetPlanToClientOpen && (
                        <PostSetPlanACliente
                          open={isSetPlanToClientOpen}
                          onClose={() => setIsSetPlanToClientOpen(false)}
                          planData={selectedPlan}
                        />
                      )}
                      {isAddDateOpen && (
                        <PostPlanEntrenamientoFecha
                          open={isAddDateOpen}
                          onClose={() => setIsAddDateOpen(false)}
                          planData={selectedPlan}
                        />
                      )}
                      {isEditDateOpen && (
                        <PutPlanEntrenamientoFecha
                          open={isEditDateOpen}
                          onClose={() => setIsEditDateOpen(false)}
                          planData={selectedPlan}
                        />
                      )}
                      {isDeleteOpen && (
                        <DeleteModalPlanPost
                          title = {deleteTitle}
                          description = {deleteDescription} 
                          open={isDeleteOpen}
                          onClose={() => setIsDeleteOpen(false)}
                          routineData={selectedRoutine}
                        />
                      )}
                      {isAddRoutineToPlanOpen && (
                        <PostListRoutinesInPlan
                          open={isAddRoutineToPlanOpen}
                          onClose={() => setIsAddRoutineToPlanOpen(false)}
                          planData={selectedPlan}
                        />
                      )}
                      {isRemoveRoutineFromPlanOpen && (
                        <DeleteListRoutinesInPlan
                          title = {deleteTitle}
                          description = {deleteDescription} 
                          open={isRemoveRoutineFromPlanOpen}
                          onClose={() => setIsRemoveRoutineFromPlanOpen(false)}
                          planData={selectedRoutine}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="rutina">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Rutinas</CardTitle>
                      <div className= "text-right">
                          <PostRutina />
                      </div>
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
                            <TableHead className="hidden md:table-cell">Fecha Final</TableHead>
                            <TableHead className="hidden md:table-cell">Ejercicios</TableHead>
                            <TableHead className="hidden md:table-cell">Editar</TableHead>
                            <TableHead className="hidden md:table-cell">Añadir</TableHead>
                            <TableHead className="hidden md:table-cell">Quitar</TableHead>
                            <TableHead className="hidden md:table-cell">Eliminar</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedRoutines.map((routine) => (
                            <TableRow key={routine.id}>
                              <TableCell className="font-medium">{routine.nombreRutina}</TableCell>
                              <TableCell className="font-medium">{routine.fechaInicio ? formatDateToDDMMYYYY(routine.fechaInicio) : ''}</TableCell>
                              <TableCell className="font-medium">{routine.fechaFinal ? formatDateToDDMMYYYY(routine.fechaFinal) : ''}</TableCell>
                              <TableCell className="font-medium">
                              <ul className="list-disc pl-4">
                                {routine.ejercicios.map((ejercicio, index) => (
                                  <li key={index}>{ejercicio.nombreEjercicio}</li>
                                ))}
                              </ul>
                              </TableCell>
                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEditClick(routine, 'routine')}>
                                  <Edit/>
                                </Button>
                              </TableCell>

                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleAddExerciseToRoutine(routine)}>
                                  <CirclePlusIcon/>
                                </Button>
                              </TableCell>

                              <TableCell>
                                <Button 
                                    aria-haspopup="true"
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleRemoveExerciseFromRoutine(routine)}>
                                  <CircleMinusIcon />
                                </Button>
                              </TableCell>


                              <TableCell>
                                <Button 
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleDeleteClick(routine, 'routine')}>
                                <Trash2Icon color="red"/>
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                      {isEditOpen && (
                        <PutRutina
                          open={isEditOpen}
                          onClose={() => setIsEditOpen(false)}
                          routineData={selectedRoutine}
                        />
                      )}
                      {isDeleteOpen && (
                        <DeleteModalRoutinePost
                          title = {deleteTitle}
                          description = {deleteDescription} 
                          open={isDeleteOpen}
                          onClose={() => setIsDeleteOpen(false)}
                          exerciseData={selectedExercise}
                        />
                      )}

                      {isAddExerciseToRoutineOpen && (
                        <PostListEjerciciosInRutina
                          open={isAddExerciseToRoutineOpen}
                          onClose={() => setIsAddExerciseToRoutineOpen(false)}
                          routineData={selectedRoutine}
                        />
                      )}
                      {isRemoveExerciseFromRoutineOpen && (
                        <DeleteListEjerciciosInRutina
                          title = {deleteTitle}
                          description = {deleteDescription} 
                          
                          open={isRemoveExerciseFromRoutineOpen}
                          onClose={() => setIsRemoveExerciseFromRoutineOpen(false)}
                          routineData={selectedExercise}
                        />
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="ejercicio">
                  <Card x-chunk="dashboard-06-chunk-0">
                    <CardHeader>
                      <CardTitle>Ejercicios</CardTitle>
                      <div className= "text-right">
                          <PostExercise />
                      </div>
                      <CardDescription>
                        A continuación puedes ver tus ejercicios creados:
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
                            <TableHead className="hidden md:table-cell">Editar</TableHead>
                            <TableHead className="hidden md:table-cell">Eliminar</TableHead>
                          </TableRow>
                        </TableHeader>

                        <TableBody>
                          {displayedExercises.map((exercise) => (
                            <TableRow key={exercise.id}>
                              <TableCell className="font-medium">{exercise.nombreEjercicio}</TableCell>
                              <TableCell className="font-medium">{exercise.repeticion}</TableCell>
                              <TableCell className="font-medium">{exercise.serie}</TableCell>
                              <TableCell className="font-medium">{exercise.peso}</TableCell>
                              <TableCell className="font-medium">{exercise.cardioRealizado ? 'Sí' : 'No'}</TableCell>
                              <TableCell>
                                <Button 
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleEditClick(exercise, 'exercise')}>
                                <Edit/>
                                </Button>
                              </TableCell>
                              <TableCell>
                                <Button 
                                  aria-haspopup="true"
                                  size="icon"
                                  variant="ghost"
                                  onClick={() => handleDeleteClick(exercise, 'exercise')}>
                                <Trash2Icon color="red"/>
                                </Button>
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
                      {isDeleteOpen && (
                        <DeleteModalExercisePost
                          messageButton = {deleteMessage}
                          title = {deleteTitle}
                          description = {deleteDescription} 
                          open={isDeleteOpen}
                          onClose={() => setIsDeleteOpen(false)}
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
    </React.Fragment>
  );
}

export default WorkoutBuilder;