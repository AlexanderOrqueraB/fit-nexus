import React, { useState, useContext } from "react";
import {
  ListFilter,
  RefreshCcwIcon,
} from "lucide-react";
import { Badge } from "../components_ui/ui/badge";
import { Button } from "../components_ui/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components_ui/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components_ui/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components_ui/ui/tabs";
import { UserContext } from "../components/global/UserContext";
import { formatObjetivo } from "../utils/utilsMethod";
import { useClientData } from "../components/global/ClientDataContext";
import ProgressCustom from "../components/common/ProgressCustom";
import customToast from "../utils/customToast";

export function ClientsList() {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const { clients, fetchClientDataOnce, loading } = useClientData();

  const refreshData = async () => {
    await fetchClientDataOnce(fitNexusId);
  }

  //Alternamos entre datos reales y datos de prueba
  const displayedClients = clients || [];

  const [visibleColumns, setVisibleColumns] = useState([
    "nombre",
    "apellido",
    "fitNexusId",
    "email",
    "objetivo",
    "genero",
    "clienteDesde",
  ]);

  //Para el filtro de objetivo
  const [selectedObjective, setSelectedObjective] = useState("Todos");

  const filteredClients = displayedClients.filter(
    (client) =>
      selectedObjective === "Todos" || client.objetivo === selectedObjective
  );

  if (loading) return <ProgressCustom />;

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="mx-auto grid max-w-[99rem] flex-1 auto-rows-max gap-4">
            <Tabs defaultValue="all">
              <div className="flex items-center">
                <TabsList className="flex items-center space-x-4">
                  <TabsTrigger value="all">Clientes</TabsTrigger>
                  <div className="ml-auto">
                    <Button onClick={refreshData}>
                      <RefreshCcwIcon className="h-3.5 w-3.5 mr-2" />
                      Refrescar datos
                    </Button>
                  </div>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" size="sm" className="h-8 gap-1">
                        <ListFilter className="h-3.5 w-3.5 mr-2" />
                        <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                          Filtro
                        </span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Mostrar columnas</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {[
                        "nombre",
                        "apellido",
                        "fitNexusId",
                        "email",
                        "objetivo",
                        "genero",
                        "edad",
                        "peso",
                        "altura",
                        "clienteDesde",
                      ].map((column) => (
                        <DropdownMenuCheckboxItem
                          key={column}
                          checked={visibleColumns.includes(column)}
                          onCheckedChange={() => {
                            setVisibleColumns((prev) =>
                              prev.includes(column)
                                ? prev.filter((col) => col !== column)
                                : [...prev, column]
                            );
                          }}
                        >
                          {column.charAt(0).toUpperCase() + column.slice(1)}
                        </DropdownMenuCheckboxItem>
                      ))}
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>
                        Filtrar por objetivo
                      </DropdownMenuLabel>
                      <DropdownMenuRadioGroup
                        value={selectedObjective}
                        onValueChange={setSelectedObjective}
                      >
                        <DropdownMenuRadioItem value="Todos">
                          Todos
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value={formatObjetivo("PERDER_GRASA")}>
                        {formatObjetivo("PERDER_GRASA")}
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value={formatObjetivo("GANAR_MUSCULO")}>
                        {formatObjetivo("GANAR_MUSCULO")}
                        </DropdownMenuRadioItem>
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
                          {visibleColumns.includes("nombre") && (
                            <TableHead>Nombre</TableHead>
                          )}
                          {visibleColumns.includes("apellido") && (
                            <TableHead>Apellido</TableHead>
                          )}
                          {visibleColumns.includes("fitNexusId") && (
                            <TableHead className="hidden md:table-cell">
                              FitNexusID
                            </TableHead>
                          )}
                          {visibleColumns.includes("email") && (
                            <TableHead className="hidden md:table-cell">
                              Email
                            </TableHead>
                          )}
                          {visibleColumns.includes("objetivo") && (
                            <TableHead className="hidden md:table-cell">
                              Objetivo
                            </TableHead>
                          )}
                          {visibleColumns.includes("genero") && (
                            <TableHead className="hidden md:table-cell">
                              Género
                            </TableHead>
                          )}
                          {visibleColumns.includes("edad") && (
                            <TableHead className="hidden md:table-cell">
                              Edad
                            </TableHead>
                          )}
                          {visibleColumns.includes("peso") && (
                            <TableHead className="hidden md:table-cell">
                              Peso (kg)
                            </TableHead>
                          )}
                          {visibleColumns.includes("altura") && (
                            <TableHead className="hidden md:table-cell">
                              Altura (cm)
                            </TableHead>
                          )}
                          {visibleColumns.includes("clienteDesde") && (
                            <TableHead className="hidden md:table-cell">
                              Cliente desde
                            </TableHead>
                          )}
                        </TableRow>
                      </TableHeader>

                      <TableBody>
                        {filteredClients.map((client) => (
                          <TableRow key={client.id}>
                            {visibleColumns.includes("nombre") && (
                              <TableCell className="font-medium">
                                {client.nombre}
                              </TableCell>
                            )}
                            {visibleColumns.includes("apellido") && (
                              <TableCell className="font-medium">
                                {client.apellido}
                              </TableCell>
                            )}
                            {visibleColumns.includes("fitNexusId") && (
                              <TableCell className="font-medium">
                              <div
                                className="flex items-center gap-2 cursor-pointer"
                                onClick={() => {
                                  navigator.clipboard.writeText(client.fitNexusId);
                                  customToast({ message: "FitNexusID copiado al portapapeles", type: "success" });
                                }}
                                title="Haz clic para copiar"
                              >
                                {client.fitNexusId}
                                <Button variant="ghost" size="xs" className="p-0">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M8 16h8M8 12h8m-6 8h6a2 2 0 002-2V6a2 2 0 00-2-2H8a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                  </svg>
                                </Button>
                              </div>
                            </TableCell>
                            )}
                            {visibleColumns.includes("email") && (
                              <TableCell className="font-medium">
                                {client.email}
                              </TableCell>
                            )}
                            {visibleColumns.includes("objetivo") && (
                              <TableCell>
                                <Badge variant="outline">
                                    {formatObjetivo(client.objetivo)}
                                </Badge>
                              </TableCell>
                            )}
                            {visibleColumns.includes("genero") && (
                              <TableCell>
                                <Badge variant="secondary">
                                  {client.genero}
                                </Badge>
                              </TableCell>
                            )}
                            {visibleColumns.includes("edad") && (
                              <TableCell className="hidden md:table-cell">
                                {client.edad}
                              </TableCell>
                            )}
                            {visibleColumns.includes("peso") && (
                              <TableCell className="hidden md:table-cell">
                                {client.peso}
                              </TableCell>
                            )}
                            {visibleColumns.includes("altura") && (
                              <TableCell className="hidden md:table-cell">
                                {client.altura}
                              </TableCell>
                            )}
                            {visibleColumns.includes("clienteDesde") && (
                              <TableCell className="hidden md:table-cell">
                                {client.usuarioDesde}
                              </TableCell>
                            )}
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
