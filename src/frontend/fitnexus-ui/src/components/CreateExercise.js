import { waitFor } from "@testing-library/react";
import axios from "axios";
import { Button } from "../components_ui/ui/button"
import React, { useRef, useState, useEffect } from "react"; //(2)


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components_ui/ui/dialog"
import { Input } from "../components_ui/ui/input"
import { Label } from "../components_ui/ui/label"
import { useNavigate } from "react-router-dom";
import { useToast } from "../components_ui/ui/use-toast";
import { ToastAction } from "../components_ui/ui/toast";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function CreateExercise() {

    

    useState ({});
    const [data, setData] = useState({ //useState to store data from server
      nombreEjercicio: "",
      repeticion: "",
      serie:"",
      peso: "",
      cardioRealizado: ""
      });

      const { toast } = useToast()
      
      const confirmationToast = () => {
        console.log("toast sdfsd")
        const hola = "ff";
        toast ({
             title: "Ejercicio guardado",
                  description: "Correctamente",
                })
            }

    // Handle changes on inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };

    const onSubmit = (e) => {
      e.preventDefault(); //prevent refresh on page
      const userData = {
          nombreEjercicio: data.nombreEjercicio,
          repeticion: data.repeticion,
          serie: data.serie,
          peso: data.peso ,
          cardioRealizado: data.cardioRealizado
        };

      console.log("Enviando datos: ", userData);

        axios.post("http://localhost:8080/api/v1/ejercicios", userData)
        //.put(URL, userData)
        .then((response) => {
          console.log("Respuesta del servidor: ", response.data);
          console.log("Status: ", response.status);
          if (response.status === 201) {
            console.log("Mostrando Toast de Ejercicio Guardado...")
            confirmationToast();
          }
        })
        .catch((error) => {
          console.error("Error en la petición: ", error);
        });
      };
    
      const navigate = useNavigate();
      const handleClick = () => {
        navigate('/ejercicios')
      }

  return (
    <Dialog>
      <Button onClick={confirmationToast} type="submit">Ver toast</Button>
      <Button
      variant="outline"
      onClick={() => {
        toast({
          title: "Scheduled: Catch up ",
          description: "Friday, February 10, 2023 at 5:57 PM",
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        })
      }}
    >
      Add to calendarsdf
    </Button>
      <Button onClick={handleClick} type="submit">Ver ejercicios</Button>
      <DialogTrigger asChild>
        <Button variant="outline">Crear ejercicio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]"> 
          <DialogHeader>
            <DialogTitle>Crear ejercicio </DialogTitle>
            <DialogDescription>
              Crea un ejercicio aquí.
            </DialogDescription>
            <DialogDescription>
              Haz click en Guardar cuando hayas terminado.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre del ejercicio
              </Label>
              <Input
                id="nombreEjercicio"
                name="nombreEjercicio"
                value={data.nombreEjercicio}
                onChange={handleChange}
                defaultValue="Press banca"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="repeticion" className="text-right">
                Repeticiones
              </Label>
              <Input
                id="repeticion"
                name="repeticion"
                type="number"
                value={data.repeticion}
                onChange={handleChange}
                defaultValue="5"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="serie" className="text-right">
                  Series
                </Label>
                <Input
                  id="serie"
                  name="serie"
                  type="number"
                  value={data.serie}
                  onChange={handleChange}
                  defaultValue="5"
                  className="col-span-3"

                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="peso" className="text-right">
                  Peso (kg)
                </Label>
                <Input
                  id="peso"
                  name="peso"
                  type="number"
                  value={data.peso}
                  onChange={handleChange}
                  defaultValue="30"
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardioRealizado" className="text-right">
                  Cardio (TRUE, FALSE)
                </Label>
                <Input
                  id="cardioRealizado"
                  name="cardioRealizado"
                  value={data.cardioRealizado}
                  onChange={handleChange}
                  defaultValue="false"
                  className="col-span-3"
                />
            </div>
          </div>
          <DialogFooter>
            <Button onClick= {onSubmit} type="submit">Guardar cambios</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}


export default CreateExercise
