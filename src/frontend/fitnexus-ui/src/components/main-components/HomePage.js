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
	//<Toaster expand={false} position="top-right" richColors closeButton  />
	//<Button onClick={confirmationToast} type="submit">Confirmation</Button>
	//<Button onClick={errorToast} type="submit">Error</Button>

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
	}, []); //empty array ensures that the effect only runs once


	return (
		<div>
			<h1>Bienvenido: {CLIENTE.nombre}</h1>
			<div className="flex flex-1 flex-col gap-4 p-4">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
            		<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>No tienes aun añadidos tus datos extra para poder calcular tu dieta!</h3>
					</div>
            		<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>Añadelos pulsando el botón</h3>
						<div className="flex flex-row space-x-4"> 
						<EditProfileExtra />
						</div>
					</div>
            		<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>ejemplo extra</h3>
					</div>
					<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>ejemplo extra</h3>
					</div>
					<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>ejemplo extra</h3>
					</div>
					<div className="aspect-video rounded-xl bg-muted/50" >
						<h3>ejemplo extra</h3>
					</div>
         		</div>
				<div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min">
				</div>
        	</div>
		</div>
	);
}

export default HomePage;
