import axios from "axios";
import { Link, useNavigate} from 'react-router-dom'
import { Button } from "../components_ui/ui/button"
import dumbbell from "../images/db2.PNG"
import React, { useRef, useState, useEffect } from "react"; //(2)

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card"
import { Input } from "../components_ui/ui/input"
import { Label } from "../components_ui/ui/label"
import { Toaster, toast } from 'sonner'

export function LoginForm() {
  
  useState ({});
  const [data, setData] = useState({ //useState to store data from server
    email: "",
    password: "",
    });
    
    const confirmationToast = () => {
      toast.success('My first toast')
    }

    const errorToast = () => {
      toast.error('My first toast')
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

  const navigate = useNavigate();
  const sendToAdminPage = () => {
    navigate('/adminpage')
  }
  const sendToNormalPage = () => {
    navigate('/normalpage')
  }

  const onSubmit = (e) => {
    e.preventDefault(); //prevent refresh on page
    const userData = {
        email: data.email,
        password: data.password
      };

    console.log("Datos de login: ", userData);

      axios.post("http://localhost:8080/api/v1/login", userData)
      .then((response) => {
        console.log("Respuesta del servidor: ", response.data);
        console.log("Status: ", response.status);
        if (response.status === 200) {
          const userRole = response.data.role;
          localStorage.setItem("userRole", userRole);
          console.log("Mostrando Toast de Login Okay...")
          confirmationToast();
          if (userRole === "ADMIN") {
            console.log("Redireccionando a pagina admin");
            sendToAdminPage();
          }
          else if (userRole === "USER") {
            sendToNormalPage ();
            console.log("Redireccionando a pagina admin");
          }
        }
      })
      .catch((error) => {
        console.error("Error en la autenticación: ", error);
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
        </div>
        <div className="mt-4 text-center text-sm">
          No tienes una cuenta?{" "}
          <Link to="http://localhost:8000/signup" className="underline">
            Regístrate 3000
          </Link>
          <Link to="http://localhost:8080/signup" className="underline">
          Regístrate 8080
          </Link>
        </div>
      </CardContent>
    </Card>
    <div className="hidden bg-muted lg:block">
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
