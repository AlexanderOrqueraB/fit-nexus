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


export function HomePage() {

	return (
		<div>
		<h1>Bienvenido: {CLIENTE.nombre}</h1>
		</div>
	);
}

export default HomePage;
