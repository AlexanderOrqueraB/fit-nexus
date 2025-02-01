import EditProfileExtra from '../users/client/EditProfileExtra';
import { customToast } from '../utils/customToast'
import { Button } from "../../components_ui/ui/button"
import { useNavigate } from 'react-router-dom'
import PostExercise from '../workout-components/ejercicio/PostExercise';

import fitNexusLogo from "../../images/fit-nexus-logo.jpeg"

import { Card, CardContent } from '../../components_ui/ui/card';
import { apiClient } from '../utils/client';
import React, { useEffect, useState } from 'react';
import { mockClients } from '../../mocks/mockData'
import PostProfileExtra from '../users/client/PostProfileExtra';
import { BrickWall, Drumstick, EyeIcon } from 'lucide-react';

export function HomePage({ role, userEmail }) {

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
		  <h1>Bienvenido: {mockClients[0].nombre} :)</h1>
		  <div className="flex flex-1 flex-col gap-4 p-4">
			{role === 'admin' ?  (
			  <div className="grid auto-rows-min gap-4 md:grid-cols-2">
				<div className="aspect-video rounded-xl bg-muted/50">
				  <Card className="h-full">
					<CardContent className="flex items-center justify-center p-6 h-full">
					  <img
						src={fitNexusLogo}
						alt="fitNexusLogo"
						className="h-full w-full object-cover"
					  />
					</CardContent>
				  </Card>
				</div>
				<div className="aspect-video rounded-xl bg-muted/50">
				  <Card className="h-full">
					<CardContent className="flex flex-col items-center justify-center p-6 h-full">
					  <span className="text-xl font-bold mb-2">¿Quieres crear un ejercicio?</span>
					  <div className="relative flex items-center justify-center">
						Créalo ahora mismo pulsando el botón:
					  </div>
					  <span className="text-sm mt-2 text-center"></span>
					  <span className="text-sm mt-2 text-center"></span>
					  <PostExercise />
					  <div className="relative flex items-center justify-center">
						¡O accede directamente al Workout Builder!
					  </div>
					  <span className="text-sm mt-2 text-center"></span>
					  <Button className="h-10 gap-1" onClick={() => navigate("/workout-builder")}>
						Workout builder
						<BrickWall className="h-3.5 w-3.5" />
					  </Button>
					</CardContent>
				  </Card>
				</div>
			  </div>
			) : (
				<div className="grid auto-rows-min gap-4 md:grid-cols-2">
					<div className="aspect-video rounded-xl bg-muted/50">
						<Card className="h-full">
						<CardContent className="flex items-center justify-center p-6 h-full">
							<img
							src={fitNexusLogo}
							alt="fitNexusLogo"
							className="h-full w-full object-cover"
							/>
						</CardContent>
						</Card>
				  </div>
				  <div className="aspect-video rounded-xl bg-muted/50">
					<Card className="h-full">
					  <CardContent className="flex flex-col items-center justify-center p-6 h-full">
						<span className="text-xl font-bold mb-2">¿Quieres ver tu plan nutricional?</span>
						<div className="relative flex items-center justify-center">
						  Accede ahora mismo pulsando el botón:
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<Button className="h-10 gap-1" onClick={() => navigate("/nutri")}>
						  Ver plan nutricional
						  <Drumstick className="h-3.5 w-3.5" />
						</Button>
						<div className="relative flex items-center justify-center">
						  O consulta tus ejercicios:
						</div>
						<span className="text-sm mt-2 text-center"></span>
						<Button className="h-10 gap-1" onClick={() => navigate("/ejercicios")}>
						  Ejercicios
						  <EyeIcon className="h-3.5 w-3.5" />
						</Button>
						<span className="text-sm mt-2 text-center"></span>
					  </CardContent>
					</Card>
				  </div>
				</div>
			  )}
		  </div>
		</div>
	  );
}

export default HomePage;
