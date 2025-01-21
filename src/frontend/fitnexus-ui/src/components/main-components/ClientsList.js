import React, { useState, useEffect } from "react";
import {
	ListFilter, LucideRefreshCcw, RefreshCcw, RefreshCcwDotIcon, RefreshCcwIcon
} from 'lucide-react';
import { Badge } from '../../components_ui/ui/badge';
import { Button } from '../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { customToast } from '../utils/customToast'
import { fetchClientData } from '../utils/api';
import { mockClients } from '../../mocks/mockData'

export function ClientsList() {

	const [clients, setClients] = useState([]);
	const [selectedClient, setselectedClient] = useState(null);

	//estado booleando para "test mode"
	const [isTestMode, setIsTestMode] = useState(false);

	//Alternamos entre datos reales y datos de prueba
	const displayedClients = (isTestMode ? mockClients : clients) || [];

	const [visibleColumns, setVisibleColumns] = useState([
		'nombre', 
		'apellido', 
		'email', 
		'objetivo',
		'genero',
		'clienteDesde'
	  ]);

	//Para el filtro de objetivo
	const [selectedObjective, setSelectedObjective] = useState('Todos');

	const filteredClients = displayedClients.filter((client) =>
	selectedObjective === 'Todos' || client.objetivo === selectedObjective
	);

	// Cargar datos desde varias fuentes simultáneamente
	const loadData = async () => {
		try {
		// Ejecutar todas las solicitudes en paralelo
		const clients = await fetchClientData();

		// Actualizar los estados con los datos obtenidos
		setClients(clients);

		} catch (error) {
		console.error('Error al cargar datos:', error);
		console.log('Disparando customToast');
		customToast({message : "Hubo un error al cargar los datos de planes/rutinas/ejercicios", type : "error"});
		}
	};
	
	useEffect(() => {
	loadData();
	}, []); // Llama a loadData solo al montar el componente
 	
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[99rem] flex-1 auto-rows-max gap-4">
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList className="flex items-center space-x-4">
								<TabsTrigger value="all">Clientes</TabsTrigger>
								<Button onClick={() => setIsTestMode(!isTestMode)}>
                      				{isTestMode ? 'Usar Datos Reales' : 'Usar Datos de Prueba'}
                    			</Button>
								<div className="ml-auto">
									<Button onClick={() => loadData()}>
										<RefreshCcwIcon className="h-3.5 w-3.5" />
											Refrescar datos
									</Button>
								</div>
							</TabsList>
							<div className="ml-auto flex items-center gap-2">
								<DropdownMenu>
									<DropdownMenuTrigger asChild>
										<Button variant="outline" size="sm" className="h-8 gap-1">
											<ListFilter className="h-3.5 w-3.5" />
											<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filtro</span>
										</Button>
									</DropdownMenuTrigger>


									<DropdownMenuContent align="end">
	<DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
    <DropdownMenuSeparator />
    {['nombre', 'apellido', 'email', 'objetivo', 'genero', 'edad', 'peso', 'altura', 'clienteDesde'].map((column) => (
      <DropdownMenuCheckboxItem
        key={column}
        checked={visibleColumns.includes(column)}
        onCheckedChange={() => {
          setVisibleColumns((prev) =>
            prev.includes(column)
              ? prev.filter((col) => col !== column)
              : [...prev, column]
          );
        }}>
        {column.charAt(0).toUpperCase() + column.slice(1)}
      </DropdownMenuCheckboxItem>
    ))}
    <DropdownMenuSeparator />
    <DropdownMenuLabel>Filtrar por objetivo</DropdownMenuLabel>
    <DropdownMenuRadioGroup value={selectedObjective} onValueChange={setSelectedObjective}>
      <DropdownMenuRadioItem value="Todos">Todos</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="PERDER_GRASA">Perder grasa</DropdownMenuRadioItem>
      <DropdownMenuRadioItem value="GANAR_MUSCULO">Ganar músculo</DropdownMenuRadioItem>
    </DropdownMenuRadioGroup>


	</DropdownMenuContent>
								</DropdownMenu>
							</div>
						</div>


						
						<TabsContent value="all">
							<Card x-chunk="dashboard-06-chunk-0">
								<CardHeader>
									<CardTitle>Clientes</CardTitle>
									<CardDescription>
										A continuación puedes ver tu lista actual de clientes.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Table>
										<TableHeader>
											<TableRow>
											{visibleColumns.includes('nombre') && <TableHead>Nombre</TableHead>}
      										{visibleColumns.includes('apellido') && <TableHead>Apellido</TableHead>}
											{visibleColumns.includes('email') && <TableHead className="hidden md:table-cell">Email</TableHead>}
											{visibleColumns.includes('objetivo') && <TableHead className="hidden md:table-cell">Objetivo</TableHead>}
											{visibleColumns.includes('genero') && <TableHead className="hidden md:table-cell">Genero</TableHead>}
											{visibleColumns.includes('edad') && <TableHead className="hidden md:table-cell">Edad</TableHead>}
											{visibleColumns.includes('peso') && <TableHead className="hidden md:table-cell">Peso</TableHead>}
											{visibleColumns.includes('altura') && <TableHead className="hidden md:table-cell">Altura</TableHead>}
											{visibleColumns.includes('clienteDesde') && <TableHead className="hidden md:table-cell">Cliente desde</TableHead>}
											</TableRow>
										</TableHeader>

										<TableBody>
										{filteredClients.map((client) => (
											<TableRow key={client.id}>
        {visibleColumns.includes('nombre') && <TableCell className="font-medium">{client.nombre}</TableCell>}
        {visibleColumns.includes('apellido') && <TableCell className="font-medium">{client.apellido}</TableCell>}
        {visibleColumns.includes('email') && <TableCell className="font-medium">{client.email}</TableCell>}
        {visibleColumns.includes('objetivo') && <TableCell><Badge variant="outline">{client.objetivo}</Badge></TableCell>}
        {visibleColumns.includes('genero') && <TableCell><Badge variant="secondary">{client.genero}</Badge></TableCell>}
        {visibleColumns.includes('edad') && <TableCell className="hidden md:table-cell">{client.edad}</TableCell>}
        {visibleColumns.includes('peso') && <TableCell className="hidden md:table-cell">{client.peso}</TableCell>}
        {visibleColumns.includes('altura') && <TableCell className="hidden md:table-cell">{client.altura}</TableCell>}
        {visibleColumns.includes('clienteDesde') && <TableCell className="hidden md:table-cell">{client.clienteDesde}</TableCell>}

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
	);
}

export default ClientsList;
