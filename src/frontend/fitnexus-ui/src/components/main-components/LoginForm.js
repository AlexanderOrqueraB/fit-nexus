import { Link, useNavigate } from 'react-router-dom'
import { Button } from "../../components_ui/ui/button"
import dumbbell from "../../images/db2.PNG"
import React, { useContext, useState } from "react"; 

import { UserContext } from "./UserContext";


import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components_ui/ui/card"
import { Input } from "../../components_ui/ui/input"
import { Label } from "../../components_ui/ui/label"
import { toast } from 'sonner'
import {apiClient, FITNEXUS_URL} from "../utils/client";

export function LoginForm() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email: "",
    password: "",
    });
    
    const confirmationToast = () => {
      toast.success('My first toast')
    }

    const errorToast = ({message}) => {
      toast.error(message)
    }

  // Handle changes on inputs
  //...data: make a duplicate of a previous state everytime the data change to avoid overwriting
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
        email: data.email,
        password: data.password
      };

    if (!userData.email || !userData.password) {
      errorToast('Por favor introduce ambos campos...');
      throw new Error('Por favor introduce ambos campos...');
    }

    console.log("Datos de login: ", userData);

      apiClient.post("/api/v1/login", userData)
      .then((response) => {
        console.log("Respuesta del servidor: ", response.data);
        console.log("Status: ", response.status);
        
        const { token, role } = response.data;
        
        //Guardamos token y rol en el contexto
        setUser({ token, role });
        //Guardamos token y rol 
        localStorage.setItem("authToken", token); //check if needed
        localStorage.setItem("userRole", role);

        if((response.status === 401)){
          errorToast ('Error 401, (change message error)')
        }
        if (response.status === 200) {
          console.log("Rol del usuario:", role);
          console.log("Mostrando Toast de Login Okay...")
          //TODO: Toast de confirmacion
          confirmationToast();

          if (role === "ADMIN") {
            console.log("Redireccionando a pagina admin");
            navigate('/dashboard', { state: { isAdminProp: true } });
          }
          else if (role === "USER") {
            console.log("Redireccionando a pagina admin");
            navigate('/dashboard', { state: { isAdminProp: false } });
          }
        }
      })
      .catch((error) => {
        console.error("Error en la autenticación: ", error);
        errorToast('Error en la autenticacion');
      });
    };


  return (
  <div className="w-full lg:grid lg:min-h lg:grid-cols-2 xl:min-h-[800px]">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Introduce tu email para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="mi.email@ejemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input
              id="password"
              name="password"
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Introduce tu contraseña"
              required
            />          
          </div>
          <Button onClick= {onSubmit} type="submit" className="w-full">
              Iniciar sesión
          </Button>
          
          <div className="mt-2 text-center text-sm">
          SOY ADMIN o USER:
            <Button onClick={()=> navigate("/dashboard")} className="underline">
              IR
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            SOY Unauthorized:
            <Button onClick={()=> navigate("/unauthorized")} className="underline">
              IR
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            No tienes una cuenta?
            <Button onClick={()=> navigate("/signup")} className="underline">
            Regístrate!
            </Button>
          </div>
        </div>

      </CardContent>
    </Card>
    <div className="relative flex-1 hidden lg:flex items-center justify-center bg-muted">
        <img
          src={dumbbell}
          alt="dumbbell"
          width="1920"
          height="1080"
          className="h-50 w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
    </div>
  </div>
  )
}

export default LoginForm