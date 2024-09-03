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

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function CreateExercise() {

/*     

    const handleChange = (e) => {
        const value = e.target.value;
        setData({
            ...data,
            [e.target.name]: value
        });
    }

     */


//    const api = axios.create({
//        baseURL: "http://localhost:8080/api/",
//        headers: {
//            "Content-type": "application/json"
//        }
//    });
//
//    const fetchData = () => {
//        axios.get(baseURL)
//            .then(response => {
//                setData(response.data);
//            })
//            .catch(error => {
//                console.log(error);
//            });
//    }
//
//    useEffect( () => {
//        fetchData();
//    }, []) //empty array ensures that the effect only runs once

      const printEFE = (e) => {
        console.log('hola aAsfsdf');
        
      }

      useState ({});
      const [data, setData] = useState({ //useState to store data from server
        nombreEjercicio: "",
        repeticion: "",
        serie:"",
        peso: "",
        cardioRealizado: ""
    });

      const onSubmit = (e) => {
        e.preventDefault();
        const userData = {
            nombreEjercicio: data.nombreEjercicio,
            repeticion: data.repeticion,
            serie: data.serie,
            peso: data.peso ,
            cardioRealizado: data.cardioRealizado
        };
        axios.post("http://localhost:8080/api/ejercicios", userData)
        .then((response) => {
          console.log(response.status, response.data.token);
        }).catch(console.error("Axios post error"));
      };

  return (

  //    <ul>
  //        {user && user.length > 0 && user.map ( (userObj,index) => (
  //        <li key = {userObj._id}> {userObj.email} </li>
  //        <div key={ejercicio.id}>
  //        <div>
  //            Ejercicio: {ejercicio.nombreEjercicio}
  //        </div>
  //        ))}
  //    </ul>
  //    <div>
  //        {data.map(item => (
  //            <p key={item.id}> {item.title} </p>
  //        ))}
  //    </div>
    <Dialog>
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
                id="name"
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
                  defaultValue="30"
                  className="col-span-3"
                />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cardioRealizado" className="text-right">
                  Cardio (Si, no)
                </Label>
                <Input
                  id="cardioRealizado"
                  defaultValue="No"
                  className="col-span-3"
                />
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onSubmit} type="submit">Guardar cambios</Button>
          </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default CreateExercise
