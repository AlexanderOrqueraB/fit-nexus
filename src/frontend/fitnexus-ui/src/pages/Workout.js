import { Info, ListFilter, RefreshCcwIcon } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from '../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components_ui/ui/card';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components_ui/ui/tabs';
import { customToast } from '../utils/customToast'

import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTrigger,
  } from '../components_ui/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuTrigger
} from '../components_ui/ui/dropdown-menu';
import ExercisesInfoImg from '../components/workout-components/ejercicio/ExercisesInfoImg';
import { Badge } from '../components_ui/ui/badge';
import { formatDateToDDMMYYYY } from '../utils/utilsMethod';
import { fetchWorkoutData } from '../utils/api';
import { UserContext } from '../components/global/UserContext';

export function Workout ()  {
  	const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
	const { fitNexusId } = user; // Desestructurar el objeto user

	const [exercises, setExercises] = useState([]);
  
	const [routines, setRoutines] = useState([]);
  
	const [plans, setPlans] = useState([]);

	const [selectedExercise, setSelectedExercise] = useState(null); 

	const handleInfoClick = (exercise) => {
		setSelectedExercise(exercise);
	};

	const displayedExercises = exercises || [];
	const displayedRoutines = routines || [];
	const displayedPlans = plans || [];

	//Para el filtro de objetivo
	const [selectedCardio, setSelectedCardio] = useState('Todos');
	
	// Estado para rastrear la pestaña activa
	const [activeTab, setActiveTab] = useState('ejercicio'); 

	const filteredExercises = displayedExercises.filter((exercise) => {
		if (selectedCardio === 'Todos') return true;
		const isCardio = selectedCardio === 'true'; // Convertimos a booleano
		return exercise.cardioRealizado === isCardio; // Comparamos valores booleanos
	  });
	  
	const loadData = async () => {
		try {
		const { exercises, routines, plans } = await fetchWorkoutData(fitNexusId);
		setExercises(exercises);
		setRoutines(routines);
		setPlans(plans);
		console.log('Datos cargados:', { exercises, routines, plans });
		customToast({message : "Datos cargados correctamente", type : "success"});
		
		} catch (error) {
		setExercises(null);
		setRoutines(null);
		setPlans(null);

		console.error('Error al cargar datos:', error);
		customToast({message : "Hubo un error al cargar los datos de planes/rutinas/ejercicios", type : "error"});
		}
	};
	
	useEffect(() => {
		loadData();
	}, []);

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
						<div className="ml-auto">
							<Button onClick={() => loadData()}>
							<RefreshCcwIcon className="h-3.5 w-3.5 mr-2" />
								Refrescar datos
							</Button>
						</div>
					  </TabsList>
					  {activeTab === 'ejercicio' && (
					  <div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-8 gap-1">
											<ListFilter className="h-3.5 w-3.5 mr-2" />
											<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtro</span>
										</Button>
									</DropdownMenuTrigger>


									<DropdownMenuContent align="end">
										<DropdownMenuLabel>Visualizar ejercicios</DropdownMenuLabel>
												<DropdownMenuRadioGroup value={selectedCardio} onValueChange={setSelectedCardio}>
												<DropdownMenuRadioItem value="Todos">Todos</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="true">Sólo cardio</DropdownMenuRadioItem>
												<DropdownMenuRadioItem value="false">Ejercicio normal</DropdownMenuRadioItem>
											</DropdownMenuRadioGroup>
									</DropdownMenuContent>
								</DropdownMenu>
							</div>
							)}
					</div>
					<TabsContent value="plan">
					  <Card x-chunk="dashboard-06-chunk-0">
						<CardHeader>
						  <CardTitle>Planes de entrenamiento</CardTitle>
						  <CardDescription>
							A continuación puedes ver tus planes de entrenamiento asignados
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
							  </TableRow>
							</TableHeader>
	
							<TableBody>
							  {displayedPlans.map((plan) => (
								<TableRow key={plan.id}>
								  <TableCell className="font-medium">
									{plan.nombrePlan}
								  </TableCell>
								  <TableCell className="font-medium">
									{plan.fechaInicio ? formatDateToDDMMYYYY(plan.fechaFinal) : ''}
								  </TableCell>
								  <TableCell className="font-medium">
									{plan.fechaFinal ? formatDateToDDMMYYYY(plan.fechaFinal) : ''}
								  </TableCell>
								  <TableCell className="font-medium">
								  	<ul className="list-disc pl-4">
										{plan.rutinas.map((rutina, index) => (
										<li key={index}>{rutina.nombreRutina}</li>
										))}
									</ul>
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
							A continuación puedes ver tus rutinas asignadas.
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
							  </TableRow>
							</TableHeader>
	
							<TableBody>
							  {displayedRoutines.map((routine) => (
								<TableRow key={routine.id}>
								  <TableCell className="font-medium">
									{routine.nombreRutina}
								  </TableCell>
								  <TableCell className="font-medium">
									{routine.fechaInicio ? formatDateToDDMMYYYY(routine.fechaInicio) : ''}
								  </TableCell>
								  <TableCell className="font-medium">
									{routine.fechaFinal ? formatDateToDDMMYYYY(routine.fechaFinal) : ''}
								  </TableCell>
								  <TableCell className="font-medium">
								  	<ul className="list-disc pl-4">
										{routine.ejercicios.map((ejercicio, index) => (
										<li key={index}>{ejercicio.nombreEjercicio}</li>
										))}
									</ul>
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
								A continuación puedes ver tus ejercicios asignados:
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
							  {filteredExercises.map((exercise) => (
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
								<TableCell>
									<Badge variant="outline">
										{exercise.cardioRealizado ? 'Sí' : 'No'}
									</Badge>
								</TableCell>
								  <TableCell>
									  <Button 
									  	aria-haspopup="true"
										size="icon"
										variant="ghost"
										onClick={() => handleInfoClick(exercise)}>
										<Info/>
										<Sheet>
											<SheetTrigger>Info</SheetTrigger>
											<SheetContent>
												<SheetHeader>
													<ExercisesInfoImg
														exercise={selectedExercise}
													/>
												</SheetHeader>
											</SheetContent>
										</Sheet> 
									  </Button>
								  </TableCell>
								</TableRow>
							  ))}
							</TableBody>
						  </Table>
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

export default Workout;
