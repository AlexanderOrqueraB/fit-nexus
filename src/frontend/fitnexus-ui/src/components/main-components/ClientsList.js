import React, { useState, useEffect } from "react";
import {
	ListFilter
} from 'lucide-react';
import { Badge } from '../../components_ui/ui/badge';
import { Button } from '../../components_ui/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components_ui/ui/card';
import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '../../components_ui/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components_ui/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components_ui/ui/tabs';
import { Toaster, toast } from 'sonner';
import { fetchClientData } from '../utils/api';

export function ClientsList() {

	const [clients, setClients] = useState([]);
	const [selectedClient, setselectedClient] = useState(null);

	  //estado booleando para "test mode"
	  const [isTestMode, setIsTestMode] = useState(false);

	const testClients = [
		{
			"nombre": "Luke",
			"apellido": "Skywalker",
			"email": "luke@skywalker.com",
			"objetivo": "PERDER_GRASA",
			"genero": "HOMBRE",
			"frecuenciaEjercicioSemanal": "LIGERO",
			"edad": 25,
			"peso": 80,
			"altura": 175,
			"clienteDesde": "2023-07-12"
		},
		{
			"nombre": "Leia",
			"apellido": "Skywalker",
			"email": "leia@skywalker.com",
			"objetivo": "PERDER_GRASA",
			"genero": "MUJER",
			"frecuenciaEjercicioSemanal": "LIGERO",
			"edad": 25,
			"peso": 80,
			"altura": 175,
			"clienteDesde": "2023-07-12"
		}
	]

	//Alternamos entre datos reales y datos de prueba
	const displayedClients = isTestMode ? testClients : clients;

	useEffect(() => {
		// Cargar datos desde varias fuentes simultáneamente
		const loadData = async () => {
		  try {
			// Ejecutar todas las solicitudes en paralelo
			const clients = await fetchClientData();
	
			// Actualizar los estados con los datos obtenidos
			setClients(clients);

		  } catch (error) {
			console.error('Error al cargar datos:', error);
			toast.error('Hubo un error al cargar los datos.');
		  }
		};
		loadData();
	  }, []); // Llama a loadData solo al montar el componente
 	
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[99rem] flex-1 auto-rows-max gap-4">
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">Clientes</TabsTrigger>
								<TabsTrigger value="fat">Perder grasa</TabsTrigger>
								<TabsTrigger value="muscle">Ganar músculo</TabsTrigger>
								<Button onClick={() => setIsTestMode(!isTestMode)}>
                      				{isTestMode ? 'Usar Datos Reales' : 'Usar Datos de Prueba'}
                    			</Button>
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
										<DropdownMenuLabel>Filtrar por</DropdownMenuLabel>
										<DropdownMenuSeparator />
										<DropdownMenuCheckboxItem checked>Todos</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Perder grasa</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Ganar músculo</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Edad</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Peso</DropdownMenuCheckboxItem>
										<DropdownMenuCheckboxItem>Altura</DropdownMenuCheckboxItem>
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
												<TableHead>Nombre</TableHead>
												<TableHead>Apellido</TableHead>
												<TableHead className="hidden md:table-cell">Email</TableHead>
												<TableHead className="hidden md:table-cell">Objetivo</TableHead>
												<TableHead className="hidden md:table-cell">Genero</TableHead>
												<TableHead className="hidden md:table-cell">Edad</TableHead>
												<TableHead className="hidden md:table-cell">Peso</TableHead>
												<TableHead className="hidden md:table-cell">Altura</TableHead>
												<TableHead className="hidden md:table-cell">Cliente desde</TableHead>
											</TableRow>
										</TableHeader>

										<TableBody>
										{displayedClients.map((client) => (
											<TableRow key={client.id}>
												<TableCell className="font-medium">{client.nombre}</TableCell>
												<TableCell className="font-medium">{client.apellido}</TableCell>
												<TableCell className="font-medium">{client.email}</TableCell>
												<TableCell>
													<Badge variant="outline">{client.objetivo}</Badge>
												</TableCell>
												<TableCell>
													<Badge variant="secondary">{client.genero}</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">{client.edad}</TableCell>
												<TableCell className="hidden md:table-cell">{client.peso}</TableCell>
												<TableCell className="hidden md:table-cell">{client.altura}</TableCell>
												<TableCell className="hidden md:table-cell">
													{client.clienteDesde}
												</TableCell>
											</TableRow>
											))}
										</TableBody>
									</Table>
								</CardContent>
							</Card>
						</TabsContent>

						<TabsContent value="fat">
							<Card x-chunk="dashboard-06-chunk-0"></Card>
							<CardHeader>
									<CardTitle>Perder grasa</CardTitle>
									<CardDescription>
										Lista de clientes que quieren perder grasa
									</CardDescription>
								</CardHeader>
						</TabsContent>
						<TabsContent value="muscle">
							<Card x-chunk="dashboard-06-chunk-0"></Card>
							<CardHeader>
									<CardTitle>Ganar músculo</CardTitle>
									<CardDescription>
										Lista de clientes que quieren ganar músculo
									</CardDescription>
								</CardHeader>
						</TabsContent>
					</Tabs>
          </div>
				</main>
      </div>    
    </div>
	);
}

export default ClientsList;
