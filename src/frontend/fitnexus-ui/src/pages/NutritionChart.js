
"use client"

import React, { useState, useEffect, useContext } from "react";
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card"

import {
  ChartContainer,
  ChartTooltip,
} from "../components_ui/ui/chart"
import { CustomAlertDialog } from "../components/common/CustomAlertDialog"
import PostProfileExtra from "../components/users/client/PostProfileExtra"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "../components_ui/ui/select"
import { Button } from "../components_ui/ui/button"
import { UserContext } from "../components/global/UserContext";
import { createNutritionPlan, fetchClientData, fetchExtraData, fetchNutriData } from "../utils/api";
import ProgressCustom from "../components/common/ProgressCustom";
import customToast from "../utils/customToast";
import { useClientData } from "../components/global/ClientDataContext";
import { set } from "react-hook-form";

const chartConfig = {
  porcentajes: {
    label: "Porcentajes",
  },
  colorOne: {
    label: "ColorOne",
    color: "hsl(var(--chart-4))",
  },
  colorTwo: {
    label: "ColorTwo",
    color: "hsl(var(--chart-6))",
  },
  colorThree: {
    label: "ColorThree",
    color: "hsl(var(--chart-2))",
  },
}

const planNutriMoreInfo = "Los porcentajes vienen fijados de la siguiente forma: 30% proteínas, 30% hidratos de carbono y 40% grasas para " +
  "favorecer la pérdida de grasa, 30% proteínas, 50% hidratos de carbono y 20% grasas para " +
  "favorecer la ganancia de masa muscular y, 30% proteínas, 40% hidratos de carbono y 40% grasas para mantener la forma."

const planNutriMoreInfo2 = "Los gramos se calculan con el total de kcal y teniendo en cuenta que la grasa aporta 9kcal por gramo, " +
"mientras que los hidratos y las proteínas aportan 4 kcal por gramo."

const kcalMoreInfo = "Para el cálculo de kcal se utiliza en primer lugar la fórmula de Harris-Benedict que utiliza: la edad, la altura, " +
  "el peso y el género para calcular la tasa de metabolismo basal (la energía que quemamos en reposo)."

const kcalMoreInfo2 = "A continuación se calculan las kcal de " +
"mantenimiento agregando un factor de actividad según la frecuencia de ejercicio semanal que modifica esas kcal. Por último, " +
"y en función del objetivo se añaden (300 kcal) para ganar músculo de forma eficiente o se restan (400kcal) para perder grasa de forma saludable."

export function NutritionChart() {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { role, fitNexusId } = user; // Desestructurar el objeto user

  const { clients } = useClientData(); // Cargar datos de clientes (para mostrar en el select)

  const [selectedClient, setSelectedClient] = useState(clients.length > 0 ? clients[0] : null);
  const [extraData, setExtraData] = useState(null);
  const [nutriData, setNutriData] = useState(null);
  const [nutriDataDate, setNutriDataDate] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const totalKcal = React.useMemo(() => {
    return nutriData ? nutriData.reduce((acc, curr) => acc + curr.kcal, 0) : 0;
  }, [nutriData]);

  useEffect(() => {
    console.log("El rol con el que cargas los datos de NutritionChart es: " + role);
    console.log("Datos de los clientes: ", clients);

    if (role === "ADMIN" && selectedClient) {
      console.log("El cliente seleccionado es: ", selectedClient);
      console.log(`Ejecutando fetchNutriData para obtener gramos, porcentajes y kcal para el cliente: ${selectedClient.nombre}`);
      const fetchDataForClient = async () => {
        setLoading(true);

        // Reseteamos los datos extra y nutricionales al cambiar de cliente
        setExtraData(null);
        setNutriData(null);

        try {

          // Obtenemos los datos extra del cliente seleccionado
          const extraDataResponse = await fetchExtraData(selectedClient.fitNexusId);
          if (extraDataResponse && Object.values(extraDataResponse).some((value) => value !== null)) {
            console.log("Datos extra del cliente: ", extraDataResponse);
            console.log("Datos del usuario JSON: ", JSON.stringify(extraDataResponse));
            setExtraData(extraDataResponse);
          } else {
            console.log("Error al cargar datos extra del usuario: ");
            customToast({
              message: "El cliente no tiene aún datos extra. Por favor, pídele que actualice sus datos en el apartado: Datos extra",
              type: "info",
            });
          }

          const { gramos, porcentajes, kcal } = await fetchNutriData(selectedClient.fitNexusId);

          if (gramos && porcentajes && kcal) {
            console.log("Gramos, porcentajes y kcal cargados correctamente: ", gramos, porcentajes, kcal);

            const chartNutri = [
              { macronutriente: "Proteínas", porcentajes: porcentajes.proteina, gramos: gramos.proteina, kcal: kcal.proteina, fill: "var(--color-colorOne)" },
              { macronutriente: "Hidratos de carbono", porcentajes: porcentajes.hidratoDeCarbono, gramos: gramos.hidratoDeCarbono, kcal: kcal.hidratoDeCarbono, fill: "var(--color-colorTwo)" },
              { macronutriente: "Grasas", porcentajes: porcentajes.grasa, gramos: gramos.grasa, kcal: kcal.grasa, fill: "var(--color-colorThree)" },
            ];
            setNutriData(chartNutri);
            setNutriDataDate({ fechaInicio: gramos.fechaInicio, fechaFinal: gramos.fechaFinal });
          } else {
            setNutriData(null);
            setNutriDataDate(null);
            console.error("Error: Datos nutricionales no encontrados para el cliente con fitNexusId: ", selectedClient.fitNexusId);
            customToast({ message: "Error: Datos nutricionales no encontrados", type: "error" });
          }
        } catch (error) {
          console.error("Error al cargar datos nutricionales: ", error);
          customToast({ message: "Error al cargar los datos nutricionales", type: "error" });
        } finally {
          console.log("Set loading a false en fetchDataForClient");
          setLoading(false);
        }
      };
      fetchDataForClient();
    }
    if (role === "USER") {
      console.log("Ejecutando fetchData y fetchNutriData para ADMIN");
      const fetchExtraDataForUser = async () => {
        try {
          const extraDataResponse = await fetchExtraData(fitNexusId);
          if (!extraDataResponse) {
            customToast({ message: "El cliente no tiene datos extra configurados.", type: "warning" });
          }
          setExtraData(extraDataResponse);
        } catch (error) {
          console.error("Error al cargar datos extra del cliente: ", error);
          customToast({ message: "Error al cargar datos extra del cliente", type: "error" });
        }
      };
      fetchExtraDataForUser();
    }
  }, [selectedClient, clients]);

  console.log("Datos extra del cliente: ", extraData);
  console.log("Datos nutricionales del cliente: ", nutriData);

  const tieneExtraData = extraData !== null;
  const tieneNutriPlan = nutriData !== null;

  const shouldShowCreatePlanButton = role === "ADMIN" && selectedClient && tieneExtraData && !tieneNutriPlan;

  if (loading) return <ProgressCustom />;
  if (error) return customToast({ message: "Error: " + error, type: "error" });

  return (
    <div className="flex flex-col gap-4">
      {role === "ADMIN" ? (
        <Select
          onValueChange={(value) => {
            const client = clients.find((client) => client.fitNexusId === value);
            setSelectedClient(client);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder={selectedClient ? selectedClient.nombre : "Selecciona un cliente"} />
          </SelectTrigger>
          <SelectContent>
            {clients.map((client) => (
              <SelectItem key={client.fitNexusId} value={client.fitNexusId}>
                {client.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold">Tu plan nutricional</h1>
        </div>
      )}


      {selectedClient ? (
        <div className="flex justify-center items-center space-x-4">

          {tieneExtraData && tieneNutriPlan ? (
            <Card className="flex flex-col w-1/2">
              <CardHeader className="items-center pb-0">
                <CardTitle>Plan nutricional personalizado</CardTitle>
                <CardDescription>Desde {nutriDataDate?.fechaInicio || "N/A"} hasta {nutriDataDate?.fechaFinal || "N/A"}</CardDescription>
                <CardDescription>Mueve el cursor sobre el gráfico para ver los datos de cada macronutriente</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={({ payload }) => {
                        if (!payload || payload.length === 0) return null;
                        const { macronutriente, porcentajes, gramos, kcal } = payload[0].payload;
                        return (
                          <div className="p-2 bg-white shadow-md rounded-md">
                            <strong>{macronutriente}</strong>
                            <div>Porcentaje: {porcentajes}%</div>
                            <div>Gramos: {gramos}g</div>
                            <div>Kcal: {kcal}</div>
                          </div>
                        );
                      }}
                    />
                    <Pie data={nutriData || []}
                      dataKey="porcentajes"
                      nameKey="macronutriente"
                      innerRadius={70}
                      outerRadius={110}
                      strokeWidth={5}>
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                                  {totalKcal.toLocaleString()}kcal
                                </tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
                                  Mueve el cursor
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
              <CardFooter className="flex-col items-center gap-2 text-sm">
            <div className="flex items-center gap-2 font-medium leading-none">
              Proporción de macronutrientes en porcentajes
            </div>
            <div className="flex items-center gap-2 font-medium leading-none">
              Cantidad de macronutrientes en gramos y sus respectivas en kcal
            </div>
            <div className="flex space-x-4">
              <CustomAlertDialog
                messageButton="¿De dónde salen estos porcentajes?"
                title="Macronutrientes en % y en gramos"
                description={planNutriMoreInfo}
                description2={planNutriMoreInfo2}
              />
              <CustomAlertDialog
                messageButton="¿Cómo se calculan las kcal?"
                title="Cantidad de kilocalorías"
                description={kcalMoreInfo}
                description2={kcalMoreInfo2}
              />
            </div>
            {role === 'USER' && !extraData && (<PostProfileExtra />)}
          </CardFooter>
            </Card>
          ) : shouldShowCreatePlanButton ? (
            <Card className="flex flex-col w-1/2">
              <CardHeader className="items-center pb-0">
                <CardTitle>Crea el plan nutricional personalizado</CardTitle>
                <CardDescription>No hay plan nutricional creado para este cliente</CardDescription>
                <CardDescription>Pulsa el botón crear plan nutricional</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pb-0">
                <div className="text-center">
                  <p></p>
                  <Button onClick={() => createNutritionPlan(selectedClient.email)}>Crear Plan Nutricional</Button>
                  <p></p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="text-center">
              <p>El cliente no tiene datos extra configurados.</p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center space-x-4">
          <Card className="flex flex-col w-1/2">
            <CardHeader className="items-center pb-0">
              <CardTitle>Plan nutricional personalizado</CardTitle>
              <CardDescription>Selecciona un cliente para visualizar</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0"></CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

export default NutritionChart;