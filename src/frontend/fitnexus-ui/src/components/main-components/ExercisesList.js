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
import { EXERCISES, PLAN, RUTINAS } from '../utils/hardcodedModelDtos';
import { toast } from 'sonner'
import ExercisePost from "../buttons-components/ejercicio/PostExercise"

export interface ExercisesListProps {
	nombreEjercicio: string;
	repeticion: number;
	serie: number;
	peso: number;
	cardioRealizado: boolean;
}

export function ExercisesList() {
	useState({});
	const [data, setData] = useState({});

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

	const handleClickPlan = () => {
		apiClient
			.get('/api/v1/planes')
			.then((response) => {
				setData(response.data);
				console.log('Respuesta del servidor /api/v1/planes: ', response.data);
				console.log('Status: ', response.status);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleClickRutina = () => {
		apiClient
			.get('/api/v1/rutinas')
			.then((response) => {
				setData(response.data);
				console.log('Respuesta del servidor /api/v1/rutinas: ', response.data);
				console.log('Status: ', response.status);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const handleClickEjercicio = () => {
		apiClient
			.get('/api/v1/ejercicios')
			.then((response) => {
				setData(response.data);
				console.log('Respuesta del servidor /api/v1/ejercicios: ', response.data);
				console.log('Status: ', response.status);
			})
			.catch((error) => {
				console.log(error.message);
			});
	};

	const navigate = useNavigate();

	const handleClickEjercicioPost = () => {
		navigate('/create-exercise');
	};

	useEffect(() => {
		//handleClickPlan();
		//handleClickRutina();
		//handleClickEjercicio();
		//handleClickEjercicioPost();
	}, []); //empty array ensures that the effect only runs once

	return (
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
											<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
											<DropdownMenuSeparator />
											<DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>Planes de entrenamiento</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>Rutinas</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>Ejercicios</DropdownMenuCheckboxItem>
											<DropdownMenuCheckboxItem>Cardio(Si/No)</DropdownMenuCheckboxItem>
										</DropdownMenuContent>
									</DropdownMenu>
									<Button onClick={handleClickPlan} size="sm" className="h-8 gap-1">
										<UserCheck className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Get/Refresh planes
										</span>
									</Button>
									<Button onClick={handleClickRutina} size="sm" className="h-8 gap-1">
										<UserCheck className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Get/Refresh rutinas
										</span>
									</Button>
									<Button onClick={handleClickEjercicio} size="sm" className="h-8 gap-1">
										<UserCheck className="h-3.5 w-3.5" />
										<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
											Get/Refresh ejercicios
										</span>
									</Button>
									<ExercisePost />
									
								</div>
							</div>
							<TabsContent value="plan">
								<Card x-chunk="dashboard-06-chunk-0">
									<CardHeader>
										<CardTitle>Planes de entrenamiento</CardTitle>
										<CardDescription>A continuación puedes ver tus planes creados.</CardDescription>
									</CardHeader>
									<CardContent>
										<Table>
											<TableHeader>
												<TableRow>
													<TableHead>Nombre del plan</TableHead>
													<TableHead>Fecha Inicio</TableHead>
													<TableHead className="hidden md:table-cell">Fecha Final</TableHead>
													<TableHead className="hidden md:table-cell">
														Rutinas{' '}
													</TableHead>
													<TableHead className="hidden md:table-cell">
														<span className="sr-only">Acciones</span>
														Acciones
													</TableHead>
												</TableRow>
											</TableHeader>

											<TableBody>
												{PLAN.map((data) => (
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
														<span className="sr-only">Acciones</span>
														Acciones
													</TableHead>
												</TableRow>
											</TableHeader>

											<TableBody>
												{EXERCISES.map((data) => (
													<TableRow key={data.nombreEjercicio}>
														<TableCell className="font-medium">
															{data.nombreEjercicio}
														</TableCell>
														<TableCell className="font-medium">{data.repeticion}</TableCell>
														<TableCell className="font-medium">{data.serie}</TableCell>
														<TableCell className="font-medium">{data.peso}</TableCell>
														<TableCell className="font-medium">{data.cardio}</TableCell>
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
	);
}

export default ExercisesList;
