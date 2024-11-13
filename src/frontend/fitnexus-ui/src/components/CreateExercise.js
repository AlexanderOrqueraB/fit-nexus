import axios from "axios";
import { Button } from "../components_ui/ui/button"
import React, { useRef, useState, useEffect } from "react"; //(2)
import apiClient from "../api/http-common"

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
import { Toaster, toast } from 'sonner'

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
      
      const confirmationToast = () => {
        toast.success('My first toast')
      }

      const errorToast = () => {
        toast.error('My first toast')
      }

    // Handle changes on inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setData({
          ...data,
          [name]: value,
        });
      };

    //TODO: Example to get all, get by id and get by title
    const get_id = useRef(null);
    const get_title = useRef(null);

    const [getResult, setGetResult] = useState(null);

    const fortmatResponse = (res) => {
        return JSON.stringify(res, null, 2);
    };

    //TODO: Examples, not tested yet
    async function getAllData () {
        try {
            const res = await apiClient.get("/tutorials");

            const result = {
                status: res.status + "-" + res.statusText,
                headers: res.headers,
                data: res.data,
            };

            setGetResult(fortmatResponse(result));
        } catch (err) {
            setGetResult(fortmatResponse(err.response?.data || err));
        }
    }
    //TODO: Examples, not tested yet
    async function getDataById() {
        const id = get_id.current.value;

        if (id) {
            try {
                const res = await apiClient.get(`/tutorials/${id}`);

                const result = {
                    data: res.data,
                    status: res.status,
                    statusText: res.statusText,
                    headers: res.headers,
                };

                setGetResult(fortmatResponse(result));
            } catch (err) {
                setGetResult(fortmatResponse(err.response?.data || err));
            }
        }
    }

    //TODO: Examples, not tested yet
    async function getDataByTitle() {
        const title = get_title.current.value;

        if (title) {
            try {
                // const res = await instance.get(`/tutorials?title=${title}`);
                const res = await apiClient.get("/tutorials", {
                    params: {
                        title: title,
                    },
                });

                const result = {
                    status: res.status + "-" + res.statusText,
                    headers: res.headers,
                    data: res.data,
                };

                setGetResult(fortmatResponse(result));
            } catch (err) {
                setGetResult(fortmatResponse(err.response?.data || err));
            }
        }
    }
    //TODO: Examples, not tested yet
    const clearGetOutput = () => {
        setGetResult(null);
    };

    //TODO example in return () <input type="text" ref={get_title} className="form-control ml-2" placeholder="Title" />
    //  <div className="input-group-append">
    //  <button className="btn btn-sm btn-primary" onClick={getDataByTitle}>Find By Title</button>
    //  </div>

    // <button className="btn btn-sm btn-warning ml-2" onClick={clearGetOutput}>Clear</button>

    const onSubmit = (e) => {
      e.preventDefault(); //prevent refresh on page
      const userData = {
          nombreEjercicio: data.nombreEjercicio,
          repeticion: data.repeticion,
          serie: data.serie,
          peso: data.peso ,
          cardioRealizado: data.cardioRealizado
        };

      console.log("Enviando los siguientes datos: ", userData);

        //TODO: Review createEmployee(employee){
        //        return axios.post(EMPLOYEE_API_BASE_URL, employee);
        //    }

        //TODO: Review example 1 getEmployeeById(employeeId){
        //        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
        //    }

        //TODO: Review example 2 export const getProductById = async (id) => {
        //  try {
        //    const response = await axios.get(`${apiUrl}/${id}`);
        //    return response.data;
        //  } catch (error) {
        //    throw error;
        //  }
        //}

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
      <Toaster expand={false} position="top-right" richColors closeButton  />
      <Button onClick={confirmationToast} type="submit">Confirmation</Button>
      <Button onClick={errorToast} type="submit">Error</Button>
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
                placeholder="Press banca"
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
                placeholder="5"
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
                  placeholder="5"
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
                  placeholder="30"
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
                  placeholder="false"
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
