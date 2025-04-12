
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
import { Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue } from "../components_ui/ui/select"
import { Button } from "../components_ui/ui/button"
import { UserContext } from "../components/global/UserContext";
import { createNutritionPlan, fetchClientData, fetchNutriData } from "../utils/api";
import ProgressCustom from "../components/common/ProgressCustom";
import customToast from "../utils/customToast";

const chartConfig = {
  porcentajes: {
    label: "Porcentajes",
  },
  chrome: {
    label: "Chrome",
    color: "hsl(var(--chart-4))",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-6))",
  },
  firefox: {
    label: "Firefox",
    color: "hsl(var(--chart-2))",
  },
}

const planNutriMoreInfo = "Los porcentajes vienen fijados de la forma 30% proteínas, 30% hidratos de carbono y 40% grasas para" +
"favorecer la pérdida de grasa. Los gramos se calculan con el total de kcal y teniendo en cuenta que la grasa aporta 9kcal por gramo, " +
"mientras que los hidratos y las proteínas aportan 4 kcal."

const kcalMoreInfo = "Para el cálculo de kcal se utiliza en primer lugar la fórmula de Harris-Benedict que utiliza: la edad, la altura, " +
"el peso y el género para calcular la tasa de metabolismo basal (la energía que quemamos en reposo). A continuación se calculan las kcal de " +
"mantenimiento agregando un factor de actividad según la frecuencia de ejercicio semanal que modifica esas kcal. Por último, " +
"y en función del objetivo se añaden (300 kcal) para ganar músculo de forma eficiente o se restan (400kcal) para perder grasa de forma saludable."


const mockChartNutri = [
  { macronutriente: "Proteínas", porcentajes: 30, gramos:120, kcal: 800, fill: "var(--color-chrome)" },
  { macronutriente: "Hidratos de carbono", porcentajes: 30, gramos:150, kcal: 720, fill: "var(--color-safari)" },
  { macronutriente: "Grasas", porcentajes: 40, gramos:70, kcal: 520, fill: "var(--color-firefox)" },
];

export function NutritionChart() {

  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { role, fitNexusId, email } = user; // Desestructurar el objeto user

  const [selectedClient, setSelectedClient] = useState(null);
  const [clients, setClients] = useState([]); // uncomment this line and comment the next one to use backend data
  //const [clients, setClients] = useState(mockClients); // uncomment this line and comment the previous one to use mock data
  const [extraData, setExtraData] = useState(null);

  const [loading, setLoading] =useState(true);
  const [error, setError] =useState(null);

  const totalKcal = React.useMemo(() => {
    return mockChartNutri.reduce((acc, curr) => acc + curr.kcal, 0)
  }, [])

  const fetchData = async (fitNexusId) => {
    setLoading(true);
    try {
      //uncomment this lines to use backend data
      const [clientsData] = await fetchClientData(fitNexusId);
      console.log("Datos de cliente: ", clientsData);
      if (clientsData && clientsData.clients && clientsData.clients.length > 0) {
        setClients(clientsData.clients);
        customToast({ message: "Datos de cliente cargados correctamente", type: "success" });
        console.log("Datos de cliente cargados correctamente desde NutritionChart.js");
      } else if (clientsData && clientsData.clients && clientsData.clients.length === 0) {
        setClients([]);
        customToast({ message: "No se encontraron clientes", type: "warning" });
      } else {
        setClients([]);
        customToast({ message: "Hubo un error al cargar los datos de cliente", type: "error" });
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchExtraData = async (fitNexusId) => {
    setLoading(true);
    try {
      //uncomment this lines to use backend data
      const data = await fetchExtraData(fitNexusId);
      if (data !== null) {
        setExtraData(data);
        customToast({ message: "Datos de cliente cargados correctamente", type: "success" });
      } else {
        setExtraData(null);
        customToast({ message: "Hubo un error al cargar los datos de cliente", type: "error" });
      }
      
      //uncomment this lines to use mock data
      //const client = mockClients.find(client => client.fitNexusId === fitNexusId);
      //setExtraData(client ? client : null);
    } catch (error) {
      setExtraData(null);
    } finally {
      setLoading(false);
    }
  };

  const createPlan = async (email) => {
    setLoading(true);
    try {
      //uncomment this lines to use backend data
      await createNutritionPlan(email);
      fetchData(fitNexusId);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log ("El rol con el que cargas los datos de NutritionChart es: " + role)
    if (role === 'ADMIN') {
      const fetchAdminData = async () => {
          await fetchData(fitNexusId); //Cargar datos de clientes (para mostrar en el select)
          console.log("Ejecutando fetchData y fetchNutriData para ADMIN");
          const { gramos, porcentajes, kcal } = await fetchNutriData(fitNexusId); //Cargar datos del plan nutricional
      };
      fetchAdminData();
    }
    if (role === 'USER') {
      console.log ("Ejecutando fetchData y fetchNutriData para ADMIN");
      fetchExtraData(fitNexusId); //Cargar datos extra del cliente (para mostrar Crear Plan Nutricional)
    }
  }, []);

  if (loading) return <ProgressCustom />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-4">
      {role === 'ADMIN' ? (
        <Select onValueChange={(value) => {
          const client = clients.find(client => client.fitNexusId === value);
          setSelectedClient(client);
        }}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Selecciona un cliente" />
        </SelectTrigger>
        <SelectContent>
          {clients.map(client => (
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
      <Card className="flex flex-col w-1/2">
        <CardHeader className="items-center pb-0">
          <CardTitle>Plan nutricional personalizado</CardTitle>
          <CardDescription>Desde {selectedClient.fechaInicio} hasta {selectedClient.fechaFinal}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[250px]">
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
              <Pie
                data={selectedClient.macros}
                dataKey="porcentajes"
                nameKey="macronutriente"
                innerRadius={70}
                outerRadius={110}
                strokeWidth={5}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {totalKcal.toLocaleString()}kcal
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Mueve el cursor
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-center gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
          Macronutrientes:
          </div>
          <div className="flex items-center gap-2 font-medium leading-none">
          Proporción en porcentaje, cantidad en gramos y en kcal y en gramos
          </div>
          <div className="leading-none text-muted-foreground">
            Prueba a mover el cursor sobre el gráfico para ver los datos de cada macronutriente
          </div>
          <div className="flex space-x-4">
          <CustomAlertDialog
            messageButton = "¿De dónde salen estos datos?"
            title = "Macronutrientes en % y en gramos"
            description = {planNutriMoreInfo}
          />
          <CustomAlertDialog
            messageButton = "De dónde salen estos datos?"
            title = "Cantidad de kilocalorías"
            description = {kcalMoreInfo} 
          />
          </div>
          {role === 'USER' && !extraData && (
            <PostProfileExtra />
            )}
            {role === 'ADMIN' && selectedClient && !extraData && (
              <Button onClick={() => createPlan(selectedClient.email)}>Crear Plan Nutricional</Button>
            )}
        </CardFooter>
      </Card>
      </div>
      ) : 
      (
        <div className="flex justify-center items-center space-x-4">
        <Card className="flex flex-col w-1/2">
          <CardHeader className="items-center pb-0">
            <CardTitle>Plan nutricional personalizado</CardTitle>
            <CardDescription>Selecciona un cliente para visualizar</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-0">
          </CardContent>
          </Card>
          </div>
      )}
    </div>
  )
}

export default NutritionChart;