import React, { useRef, useState, useEffect } from "react"; //(2)
import axios from "axios";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components_ui/ui/table"
import { Button } from "../components_ui/ui/button";

const exercisesHardCoded = [
  {
    "nombreEjercicio": "Press banca 1",
    "repeticion": 5,
    "serie": 5,
    "peso": 10,
  },
  {
    "nombreEjercicio": "Press banca 2",
    "repeticion": 10,
    "serie": 10,
    "peso": 10,
  },
  {
    "nombreEjercicio": "Press banca 3",
    "repeticion": 15,
    "serie": 15,
    "peso": 10,
  },
]

export function ExerciseComponent() {

  useState ({});
  const [data, setData] = useState({});

  const handleClick = () => {
    axios
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
        <TableHead className="w-[200px]">Cardio realizado</TableHead>
      </TableRow>
    </TableHeader>

     <TableBody>
        {exercisesHardCoded.map((exercise) => (
          <TableRow key={exercise.nombreEjercicio}>
            <TableCell className="font-medium">{exercise.nombreEjercicio}</TableCell>
            <TableCell className="w-[200px]">{exercise.repeticion}</TableCell>
            <TableCell className="w-[200px]">{exercise.serie}</TableCell>
            <TableCell className="w-[200px]">{exercise.peso}</TableCell>
            <TableCell className="w-[200px]">truelol</TableCell>
          </TableRow>
        ))}
      </TableBody>

    <Button onClick={handleClick}>Click para obtener ejercicios</Button>
  </Table>
)
}

export default ExerciseComponent
