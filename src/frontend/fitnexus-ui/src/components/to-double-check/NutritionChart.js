
"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components_ui/ui/card"

import {
  ChartContainer,
  ChartTooltip,
} from "../../components_ui/ui/chart"
import { CustomAlertDialog } from "./CustomAlertDialog"
import { mockChartMacros, mockChartKcal } from '../../mocks/mockData'

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

const pautaMoreInfo = "Los porcentajes vienen fijados de la forma 30% proteínas, 30% hidratos de carbono y 40% grasas para" + 
"favorecer la pérdida de grasa. Los gramos se calculan con el total de kcal y teniendo en cuenta que la grasa aporta 9kcal por gramo, " +
"mientras que los hidratos y las proteínas aportan 4 kcal."

const kcalMoreInfo = "Para el cálculo de kcal se utiliza en primer lugar la fórmula de Harris-Benedict que utiliza: la edad, la altura, " +
"el peso y el género para calcular la tasa de metabolismo basal (la energía que quemamos en reposo). A continuación se calculan las kcal de " +
"mantenimiento agregando un factor de actividad según la frecuencia de ejercicio semanal que modifica esas kcal. Por último, " +
"y en función del objetivo se añaden (300 kcal) para ganar músculo de forma eficiente o se restan (400kcal) para perder grasa de forma saludable."


export function NutritionChart() {
  const totalPorcentajes = React.useMemo(() => {
    return mockChartMacros.reduce((acc, curr) => acc + curr.porcentajes, 0)
  }, [])

  const totalKcal = React.useMemo(() => {
    return mockChartKcal.reduce((acc, curr) => acc + curr.kcal, 0)
  }, [])

  return (
    <div className="flex space-x-4">

    <Card className="flex flex-col w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Pauta nutricional personalizada</CardTitle>
        <CardDescription>Enero - Mayo 2024</CardDescription>
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
              const { macronutriente, porcentajes, gramos } = payload[0].payload;
              return (
                <div className="p-2 bg-white shadow-md rounded-md">
                  <strong>{macronutriente}</strong>
                  <div>Porcentaje: {porcentajes}%</div>
                  <div>Gramos: {gramos}g</div>
                </div>
              );
            }}
          />
            <Pie
              data={mockChartMacros}
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
                          {totalPorcentajes.toLocaleString()}%
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
        Macronutrientes (en % y en gramos)
        </div>
        <div className="leading-none text-muted-foreground">
          Si mueves el cursor sobre el gráfico, podrás ver la cantidad de gramos y el porcentajes
          de cada macronutriente
        </div>
        <CustomAlertDialog
          messageButton = "De dónde salen estos datos?"
          title = "Macronutrientes en % y en gramos"
          description = {pautaMoreInfo} 
        />
      </CardFooter>
    </Card>

    <Card className="flex flex-col w-1/2">
      <CardHeader className="items-center pb-0">
        <CardTitle>Kcal</CardTitle>
        <CardDescription>Enero - Mayo 2024</CardDescription>
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
              const { macronutriente, kcal } = payload[0].payload;
              return (
                <div className="p-2 bg-white shadow-md rounded-md">
                  <strong>{macronutriente}</strong>
                  <div>Kcal: {kcal}</div>
                </div>
              );
            }}
          />
            <Pie
              data={mockChartKcal}
              dataKey="kcal"
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
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Total de kilocalorías
        </div>
        <div className="leading-none text-muted-foreground">
          Si mueves el cursor sobre el gráfico, podrás ver la cantidad de kcal para cada macronutriente
        </div>
        <CustomAlertDialog
          messageButton = "De dónde salen estos datos?"
          title = "Cantidad de kilocalorías"
          description = {kcalMoreInfo} 
        />
      </CardFooter>
    </Card>
    
    </div>
  )
}

export default NutritionChart;