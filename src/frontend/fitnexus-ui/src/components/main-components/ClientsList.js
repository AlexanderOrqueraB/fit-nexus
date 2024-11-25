import React, { useState, useEffect } from "react";
import {
	ListFilter,
	MoreHorizontal,
	UserCheck
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
import {CLIENTES} from "../utils/hardcodedModelDtos"
import {apiClient} from "../utils/client"

export function ClientsList() {

	useState ({});
	const [data, setData] = useState({});
  
	const handleClick = () => {
	  apiClient
		.get("/api/v1/ejercicios")
		//.delete(URL)
		.then ((response) => {
		  setData(response.data);
		  console.log("Respuesta del servidor: ", response.data);
		  console.log("Status: ", response.status);
		})
		.catch((error) => {
		  console.log(error.message)
		})
	}
	 useEffect( () => {
	  handleClick();
	 }, []) //empty array ensures that the effect only runs once
	
	return (
		<div className="flex min-h-screen w-full flex-col bg-muted/40">
			<div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
				<main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
					<Tabs defaultValue="all">
						<div className="flex items-center">
							<TabsList>
								<TabsTrigger value="all">Clientes</TabsTrigger>
								<TabsTrigger value="fat">Perder grasa</TabsTrigger>
								<TabsTrigger value="muscle">Ganar músculo</TabsTrigger>
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
								<Button onClick={handleClick} size="sm" className="h-8 gap-1">
									<UserCheck className="h-3.5 w-3.5" />
									<span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Get/Refresh Clientes</span>
								</Button>
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
												<TableHead className="hidden md:table-cell">
													Cliente desde
												</TableHead>
												<TableHead className="hidden md:table-cell">
													<span className="sr-only">Acciones</span>
													Acciones
												</TableHead>
											</TableRow>
										</TableHeader>

										<TableBody>
										{CLIENTES.map((data) => (
											<TableRow key={data.nombre}>
												<TableCell className="font-medium">{data.nombre}</TableCell>
												<TableCell className="font-medium">{data.apellido}</TableCell>
												<TableCell className="font-medium">{data.email}</TableCell>
												<TableCell>
													<Badge variant="outline">{data.objetivo}</Badge>
												</TableCell>
												<TableCell>
													<Badge variant="secondary">{data.genero}</Badge>
												</TableCell>
												<TableCell className="hidden md:table-cell">{data.edad}</TableCell>
												<TableCell className="hidden md:table-cell">{data.peso}</TableCell>
												<TableCell className="hidden md:table-cell">{data.altura}</TableCell>
												<TableCell className="hidden md:table-cell">
													{data.clienteDesde}
												</TableCell>
												<TableCell>
													<DropdownMenu>
														<DropdownMenuTrigger asChild>
															<Button aria-haspopup="true" size="icon" variant="ghost">
																<MoreHorizontal className="h-4 w-4" />
																<span className="sr-only">Toggle menu</span>
															</Button>
														</DropdownMenuTrigger>
														<DropdownMenuContent align="end">
															<DropdownMenuLabel>Acciones</DropdownMenuLabel>
															<DropdownMenuItem>Editar</DropdownMenuItem>
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
										Mostrando <strong>1-5</strong> de <strong>12</strong> clientes
									</div>
								</CardFooter>
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
