import React, { useState, useEffect } from "react"; //(2)
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components_ui/ui/table"
import { Button } from "../../components_ui/ui/button";
import { apiClient } from "../utils/client";
import { mockExercises } from '../../mocks/mockData'


export function ExerciseComponent() {

  useState ({});
  const [data, setData] = useState({});

  const handleClick = () => {
    apiClient
      .get("http://localhost:8080/api/v1/ejercicios")
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
  <Table>
    <TableCaption>Lista de ejercicios</TableCaption>
    <TableHeader>
      <TableRow>
        <TableHead className="w-[200px]">Nombre de ejercicio</TableHead>
        <TableHead className="w-[200px]">Repeticiones</TableHead>
        <TableHead className="w-[200px]">Series</TableHead>
        <TableHead className="w-[200px]">Peso</TableHead>
        <TableHead className="w-[200px]">Ejercicio de cardio</TableHead>
      </TableRow>
    </TableHeader>

     <TableBody>
        {mockExercises.map((exercise) => (
          <TableRow key={exercise.nombreEjercicio}>
            <TableCell className="font-medium">{exercise.nombreEjercicio}</TableCell>
            <TableCell className="w-[200px]">{exercise.repeticion}</TableCell>
            <TableCell className="w-[200px]">{exercise.serie}</TableCell>
            <TableCell className="w-[200px]">{exercise.peso}</TableCell>
            <TableCell className="w-[200px]">{exercise.cardio}</TableCell>
          </TableRow>
        ))}
      </TableBody>

      <TableBody>
        {mockExercises.map((data) => (
          <TableRow key={data.nombreEjercicio}>
            <TableCell className="font-medium">{data.nombreEjercicio}</TableCell>
            <TableCell className="w-[200px]">{data.repeticion}</TableCell>
            <TableCell className="w-[200px]">{data.serie}</TableCell>
            <TableCell className="w-[200px]">{data.peso}</TableCell>
            <TableCell className="w-[200px]">{data.cardio}</TableCell>
          </TableRow>
        ))}
      </TableBody>

    <Button onClick={handleClick}>Click para obtener ejercicios</Button>
  </Table>
)
}

export default ExerciseComponent
