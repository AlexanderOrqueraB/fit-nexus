import { Info, InfoIcon, ListFilter, MoreHorizontal, UserCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { apiClient } from '../utils/client';
import { EXERCISES, PLAN2, RUTINAS } from '../utils/hardcodedModelDtos';
import { toast } from 'sonner'
import ExercisePost from "../buttons-components/ejercicio/PostExercise"
import { fetchWorkoutData } from '../utils/api';
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
  } from '../../components_ui/ui/sheet';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import ExercisesInfoImg from '../to-double-check/ExercisesInfoImg';
import { Badge } from '../../components_ui/ui/badge';



export function Workout() {
	const [data, setData] = useState({}); //useState to store data from server

	const [exercises, setExercises] = useState([]);
  
	const [routines, setRoutines] = useState([]);
  
	const [plans, setPlans] = useState([]);

	const [selectedExercise, setSelectedExercise] = useState(null); 

	const handleInfoClick = (exercise) => {
		setSelectedExercise(exercise);
	};

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
	{
		id: 3,
		nombreEjercicio: 'Caminar cinta',
		repeticion: 1,
		serie: 1,
		peso: 0,
		cardioRealizado: true,
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
	const displayedExercises = isTestMode ? testExercises : exercises;
	const displayedRoutines = isTestMode ? testRoutines : routines;
	const displayedPlans = isTestMode ? testPlans : plans; 

	//Para el filtro de objetivo
	const [selectedCardio, setSelectedCardio] = useState('Todos');
	
	// Estado para rastrear la pestaña activa
	const [activeTab, setActiveTab] = useState('ejercicio'); 

	const filteredExercises = displayedExercises.filter((exercise) => {
		if (selectedCardio === 'Todos') return true;
		const isCardio = selectedCardio === 'true'; // Convertimos a booleano
		return exercise.cardioRealizado === isCardio; // Compararmos valores booleanos
	  });
	  

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	useEffect(() => {
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
			toast.error('Hubo un error al cargar los datos.');
		  }
		};
		loadData();
	  }, []); // Llama a loadData solo al montar el componente

	const confirmationToast = () => {
        toast.success('My first toast')
      }

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

		apiClient
			.post('/api/v1/ejercicios', userData)
			//.put(URL, userData)
			.then((response) => {
				console.log('Respuesta del servidor: ', response.data);
				console.log('Status: ', response.status);
				if (response.status === 201) {
					console.log('Mostrando Toast de Ejercicio Guardado...');
					confirmationToast();
				}
			})
			.catch((error) => {
				console.error('Error en la petición: ', error);
			});
	};

	return (
		<div>	
		  <div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
			  <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
				<div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
				  <Tabs defaultValue="ejercicio" onValueChange={(value) => setActiveTab(value)}>
					<div className="flex items-center">
					  <TabsList>
						<TabsTrigger value="plan">Planes</TabsTrigger>
						<TabsTrigger value="rutina">Rutinas</TabsTrigger>
						<TabsTrigger value="ejercicio">Ejercicios</TabsTrigger>
						<Button onClick={() => setIsTestMode(!isTestMode)}>
							{isTestMode ? 'Usar Datos Reales' : 'Usar Datos de Prueba'}
						</Button>
					  </TabsList>
					  {activeTab === 'ejercicio' && (
					  <div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-8 gap-1">
											<ListFilter className="h-3.5 w-3.5" />
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
								  	<Button 
									  	aria-haspopup="true"
										size="icon"
										variant="ghost">
										<Info/>
										<Sheet>
											<SheetTrigger>Info</SheetTrigger>
											<SheetContent>
												<SheetHeader>
													<ExercisesInfoImg/>
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
		</div>
	  );
}

export default Workout;
