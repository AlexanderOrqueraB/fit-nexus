import {
	File,
	ListFilter,
	MoreHorizontal,
	PlusCircle
} from 'lucide-react';
import { Badge } from '../../components_ui/ui/badge';
import { Button } from '../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { CLIENTE } from '../utils/hardcodedModelDtos';
import ProgressCustom from "../to-double-check/Progress";
import EditProfileExtra from './EditProfileExtra';



export function HomePage() {

	return (
		<div>
		<h1>Bienvenido: {CLIENTE.nombre}</h1>
		
			<div >
				<ProgressCustom />
			</div>
			<h3>No tienes aun añadidos tus datos extra para poder calcular tu dieta! Añadelos pulsando el botón</h3>
			<div>
				<EditProfileExtra />
			</div>
		</div>
	);
}

export default HomePage;
