import { CLIENTE } from '../utils/hardcodedModelDtos';
import ProgressCustom from "../to-double-check/Progress";
import EditProfileExtra from './EditProfileExtra';
import EditProfile from "./EditProfile";
import ChangePassword from './ChangePassword';
import { Toaster, toast } from 'sonner'
import { Button } from "../../components_ui/ui/button"
import ExercisePost from './ExercisePost';
import{ RutinaPost } from './RutinaPost';
import{ PlanEntrenamientoFechaPost } from './PlanEntrenamientoFechaPost';
import{ PlanEntrenamientoPost } from './PlanEntrenamientoPost';

export function HomePage() {

	const confirmationToast = () => {
        toast.success('My first toast')
      }

      const errorToast = () => {
        toast.error('My first toast')
      }

	return (
		<div>
		<h1>Bienvenido: {CLIENTE.nombre}</h1>
		
			<div >
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
					<PlanEntrenamientoPost/>
					<PlanEntrenamientoFechaPost/>
					<RutinaPost/>
					<ExercisePost/>
				</div>
			</div>
		</div>
	);
}

export default HomePage;
