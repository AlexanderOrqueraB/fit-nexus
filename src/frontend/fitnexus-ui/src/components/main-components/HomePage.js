import { CLIENTE } from '../utils/hardcodedModelDtos';
import ProgressCustom from "../to-double-check/Progress";
import EditProfileExtra from './EditProfileExtra';
import EditProfile from "./EditProfile";
import ChangePassword from './ChangePassword';
import { Toaster, toast } from 'sonner'
import { Button } from "../../components_ui/ui/button"

import PostExercise from '../buttons-components/ejercicio/PostExercise';
import PutExercise from '../buttons-components/ejercicio/PutExercise';
import GetExerciseByName from '../buttons-components/ejercicio/GetExerciseByName';
import DeleteExercise from '../buttons-components/ejercicio/DeleteExercise';

import PostRutina from '../buttons-components/rutina/PostRutina';
import PostListEjerciciosInRutina from '../buttons-components/rutina/PostListEjerciciosInRutina';
import GetRutinaByName from '../buttons-components/rutina/GetRutinaByName';
import GetRutinaById from '../buttons-components/rutina/GetRutinaById';
import DeleteExerciseListByName from '../buttons-components/rutina/DeleteExerciseListByName';

import PostPlanEntrenamientoFecha  from '../buttons-components/plan-entrenamiento/PostPlanEntrenamientoFecha';
import PostPlanEntrenamiento  from '../buttons-components/plan-entrenamiento/PostPlanEntrenamiento';

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
import { EXERCISES, PLAN2, RUTINAS } from '../utils/hardcodedModelDtos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { ListFilter, MoreHorizontal, UserCheck } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';
import { apiClient } from '../utils/client';
import React, { useEffect, useState } from 'react';




export function HomePage() {

	useState({});
	const [data, setData] = useState({});

	//EJERCICIO LOGIC
	//Listar ejercicios en tabla + Put Exercise
	const [exercises, setExercises] = useState([]);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedExercise, setSelectedExercise] = useState(null);

	useEffect(() => {
        // Obtener los ejercicios al cargar la página
        apiClient.get('/api/v1/ejercicios')
            .then(response => {
                setExercises(response.data); // Actualizar estado con los datos obtenidos
            })
            .catch(error => {
                console.error('Error al obtener los ejercicios:', error);
            });
    }, []);

	const handleEditClick = (exercise) => {
		setSelectedExercise(exercise);
		setIsEditOpen(true);
	};
	//EJERCICIO LOGIC
	//Listar ejercicios en tabla + Put Exercise

	const [dataEx, setDataEx] = useState({
		//useState to store data from server
		nombreEjercicio: '',
		repeticion: '',
		serie: '',
		peso: '',
		cardioRealizado: '',
	});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setData({
			...data,
			[name]: value,
		});
	};

	const confirmationToast = () => {
        toast.success('My first toast')
      }

      const errorToast = () => {
        toast.error('My first toast')
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

	useEffect(() => {
		//handleClickPlan();
		//handleClickRutina();
		//handleClickEjercicio();
		//handleClickEjercicioPost();
	}, []); //empty array ensures that the effect only runs once


	return (
		<div>
		<h1>Bienvenido: {CLIENTE.nombre}</h1>
		
			<div>
				<ProgressCustom />
			</div>
			<h3>No tienes aun añadidos tus datos extra para poder calcular tu dieta! Añadelos pulsando el botón</h3>
			<div>
				<div className="flex flex-row space-x-4"> 
					<EditProfile />
					<EditProfileExtra />
					<ChangePassword />
					<Toaster expand={false} position="top-right" richColors closeButton  />
					<Button onClick={confirmationToast} type="submit">Confirmation</Button>
					<Button onClick={errorToast} type="submit">Error</Button>
				</div>

				<div className="flex flex-row space-x-4"> 
					<PostExercise/>
					<PutExercise/>
					<GetExerciseByName/>
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

			{/*Tabla para testing:*/}
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
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Nombre del plan</TableHead>
													<TableHead>Fecha Inicio</TableHead>
													<TableHead className="hidden md:table-cell">Fecha Final</TableHead>
													<TableHead className="hidden md:table-cell">
														Rutinas
													</TableHead>
													<TableHead className="hidden md:table-cell">
														Acciones
													</TableHead>
												</TableRow>
											</TableHeader>

											<TableBody>
												{PLAN2.map((data) => (
													<TableRow key={data.nombrePlan}>
														<TableCell className="font-medium">{data.nombrePlan}</TableCell>
														<TableCell className="font-medium">
															{data.fechaInicio}
														</TableCell>
														<TableCell className="font-medium">{data.fechaFinal}</TableCell>
														<TableCell className="font-medium">
															{data.rutinas.map((rutina, index) => (
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
																	<DropdownMenuItem>Editar ?</DropdownMenuItem>
																	<DropdownMenuItem>Eliminar</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Mostrando <strong>1-5</strong> de <strong>12</strong> planes
										</div>
									</CardFooter>
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
													<TableHead className="hidden md:table-cell">Fecha Final</TableHead>
													<TableHead className="hidden md:table-cell">
														Ejercicios{' '}
													</TableHead>
													<TableHead className="hidden md:table-cell">
														<span className="sr-only">Acciones</span>
														Acciones
													</TableHead>
												</TableRow>
											</TableHeader>

											<TableBody>
												{RUTINAS.map((data) => (
													<TableRow key={data.nombreRutina}>
														<TableCell className="font-medium">
															{data.nombreRutina}
														</TableCell>
														<TableCell className="font-medium">
															{data.fechaInicio}
														</TableCell>
														<TableCell className="font-medium">{data.fechaFinal}</TableCell>
														<TableCell className="font-medium">
															{data.ejercicios.map((ejercicio, index) => (
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
																	<DropdownMenuItem>Editar ?</DropdownMenuItem>
																	<DropdownMenuItem>Eliminar</DropdownMenuItem>
																</DropdownMenuContent>
															</DropdownMenu>
														</TableCell>
													</TableRow>
												))}
											</TableBody>
										</Table>
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Mostrando <strong>1-5</strong> de <strong>12</strong> rutinas
										</div>
									</CardFooter>
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
													<TableHead className="hidden md:table-cell">
														Acciones
													</TableHead>
												</TableRow>
											</TableHeader>

											<TableBody>
											{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}
											{/*{exercises.map((exercise) => (*/}
											{/*<TableRow key={exercise.id}>*/}
												{EXERCISES.map((exercise) => (
													<TableRow key={exercise.nombreEjercicio}>
														<TableCell className="font-medium">
															{exercise.nombreEjercicio}
														</TableCell>
														<TableCell className="font-medium">{exercise.repeticion}</TableCell>
														<TableCell className="font-medium">{exercise.serie}</TableCell>
														<TableCell className="font-medium">{exercise.peso}</TableCell>
														<TableCell className="font-medium">{exercise.cardioRealizado ? 'Sí' : 'No'}</TableCell>
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
																	<DropdownMenuItem onClick={() => handleEditClick(exercise)}>
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
										{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}
										{isEditOpen && (
											<PutExercise
											open={isEditOpen}
											onClose={() => setIsEditOpen(false)}
											exerciseData={selectedExercise}
											/>
										)}
										{/*EJERCICIO LOGICL: istar ejercicios en tabla + Put Exercise*/}
									</CardContent>
									<CardFooter>
										<div className="text-xs text-muted-foreground">
											Mostrando <strong>1-5</strong> de <strong>12</strong> ejercicios
										</div>
									</CardFooter>
								</Card>
							</TabsContent>
						</Tabs>
					</div>
				</main>
			</div>
		</div>
			{/*Tabla para testing:*/}

		</div>
	);
}

export default HomePage;
