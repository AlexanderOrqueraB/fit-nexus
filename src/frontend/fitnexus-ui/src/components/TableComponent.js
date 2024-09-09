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
        <TableHead className="w-[200px]">Serie</TableHead>
        <TableHead className="w-[200px]">Peso</TableHead>
        <TableHead className="w-[200px]">Cardio realizado</TableHead>
      </TableRow>
    </TableHeader>

    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Press banca</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">30</TableCell>
        <TableCell className="w-[200px]">FALSE</TableCell>
      </TableRow>
    </TableBody>

    <TableBody>
              {response.results.map((row, i) => (
                <TableRow key={i}>
                  {row.map((cell, j) => (
                    <TableCell className="max-w-[220px]" key={j}>
                      {cell}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
    </TableBody>

    <TableBody>
      <TableRow>
        <TableCell className="font-medium">Press banca</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">5</TableCell>
        <TableCell className="w-[200px]">30</TableCell>
        <TableCell className="w-[200px]">FALSE</TableCell>
      </TableRow>
    </TableBody>

    <Button onClick={handleClick}>Click para obtener ejercicios</Button>
  </Table>
)
}

export default ExerciseComponent
