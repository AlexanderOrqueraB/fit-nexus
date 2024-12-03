import { Button } from "../../components_ui/ui/button"
import React, { useRef, useState } from "react"; 
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components_ui/ui/dialog"
import { Input } from "../../components_ui/ui/input"
import { Label } from "../../components_ui/ui/label"
import { useNavigate } from "react-router-dom";
import { Toaster, toast } from 'sonner'
import { apiClient } from "../utils/client";

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
            const res = await apiClient.get("/test");
            //apiClient.get("/tutorials");

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
                const res = await apiClient.get("/test");
                //apiClient.get(`/tutorials/${id}`);

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
                const res = await apiClient.get("/test");
                //apiClient.get("/tutorials", {
                  //  params: {
                      //  title: title,
                   // },
               // });

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
        //        return apiClient.post(EMPLOYEE_API_BASE_URL, employee);
        //    }

        //TODO: Review example 1 getEmployeeById(employeeId){
        //        return apiClient.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
        //    }

        //TODO: Review example 2 export const getProductById = async (id) => {
        //  try {
        //    const response = await apiClient.get(`${apiUrl}/${id}`);
        //    return response.data;
        //  } catch (error) {
        //    throw error;
        //  }
        //}

        apiClient.post("/api/v1/ejercicios", userData)
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
      <h1>Refactor, a lot of logic unused in this component</h1>
 </Dialog>
  )
}


export default CreateExercise
