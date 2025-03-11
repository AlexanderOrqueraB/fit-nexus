import { Button } from "../components_ui/ui/button"
import { useNavigate } from 'react-router-dom'
import PostExercise from '../components/workout-components/ejercicio/PostExercise';

import fitNexusLogo from "../assets/images/fit-nexus-logo.jpeg"

import { Card, CardContent } from '../components_ui/ui/card';
import React, { useContext } from 'react';
import { BrickWall, Drumstick, EyeIcon } from 'lucide-react';
import { UserContext } from '../components/global/UserContext';

export function HomePage() {	

	const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
	const navigate = useNavigate();

	return (
		<React.Fragment>
		  <h1>Hola :)</h1>
		  <div className="flex flex-1 flex-col gap-4 p-4">
			{user.role === 'ADMIN' ?  (
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
		</React.Fragment>
	  );
}

export default HomePage;
