import { CLIENTE } from '../utils/hardcodedModelDtos';
import ProgressCustom from "../to-double-check/Progress";
import EditProfileExtra from './EditProfileExtra';
import EditProfile from "./EditProfile";
import ChangePassword from './ChangePassword';
import { customToast } from '../utils/customToast'
import { Button } from "../../components_ui/ui/button"
import { useNavigate } from 'react-router-dom'
import PostExercise from '../buttons-components/ejercicio/PostExercise';
import PutExercise from '../buttons-components/ejercicio/PutExercise';
import GetExerciseByName from '../buttons-components/ejercicio/GetExerciseByName';

import fitNexusLogo from "../../images/fit-nexus-logo.jpeg"

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
	const navigate = useNavigate();
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
					customToast({message : "Cambiar mensaje!", type : "success"});
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
					<Card>
						<CardContent className="flex flex-col items-center justify-center p-6">
						<span className="text-2xl font-bold mb-2">Quieres ver tu dieta?</span>
						<div className="relative flex items-center justify-center">
						Primero añade unos datos extra:
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<EditProfileExtra />
						<div className="relative flex items-center justify-center">
						O consulta tus ejercicios:
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<Button onClick={()=> navigate("/ejercicios")}>						
							Let´s go!
						</Button>
						<span className="text-sm mt-2 text-center"></span>
						</CardContent>
					</Card>
					</div>
            		<div className="aspect-video rounded-xl bg-muted/50" >
						<img
							src={fitNexusLogo}
							alt="fitNexusLogo"
							className="inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
						/>
					</div>
            		<div className="aspect-video rounded-xl bg-muted/50" >
					<Card>
						<CardContent className="flex flex-col items-center justify-center p-6">
						<span className="text-2xl font-bold mb-2">Quieres crear un ejercicio?</span>
						<div className="relative flex items-center justify-center">
							Créalo ahora mismo pulsando el botón:
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<span className="text-sm mt-2 text-center"></span>
						<PostExercise />
						<div className="relative flex items-center justify-center">
							O accede directamente al Workout Builder!
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<Button onClick={()=> navigate("/workout-builder")}>						
							Let´s go!
						</Button>
						</CardContent>
					</Card>
					</div>
         		</div>
        	</div>
		</div>
	);
}

export default HomePage;
