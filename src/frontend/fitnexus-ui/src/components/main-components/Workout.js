import { ListFilter, MoreHorizontal, UserCheck } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../../components_ui/ui/dropdown-menu';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { apiClient } from '../utils/client';
import { EXERCISES, PLAN2, RUTINAS } from '../utils/hardcodedModelDtos';
import { toast } from 'sonner'
import ExercisePost from "../buttons-components/ejercicio/PostExercise"
import { fetchWorkoutData } from '../utils/api';


export function Workout() {
	const [data, setData] = useState({}); //useState to store data from server

	const [exercises, setExercises] = useState([]);
  
	const [routines, setRoutines] = useState([]);
  
	const [plans, setPlans] = useState([]);
  
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
				  <Tabs defaultValue="plan">
					<div className="flex items-center">
					  <TabsList>
						<TabsTrigger value="plan">Planes</TabsTrigger>
						<TabsTrigger value="rutina">Rutinas</TabsTrigger>
						<TabsTrigger value="ejercicio">Ejercicios</TabsTrigger>
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
							  {plans.map((plan) => (
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
										<DropdownMenuItem>
										  Ver imagen
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
							  {routines.map((routine) => (
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
										<DropdownMenuItem>
										  Ver imagen
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
							  {exercises.map((exercise) => (
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
										<DropdownMenuItem>
										  Ver imagen
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
				  </Tabs>
				</div>
			  </main>
			</div>
		  </div>
		</div>
	  );
}

export default Workout;
