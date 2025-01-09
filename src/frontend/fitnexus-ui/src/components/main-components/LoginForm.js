import { useNavigate } from 'react-router-dom'
import { Button } from "../../components_ui/ui/button"
import fitNexusLogo from "../../images/fit-nexus-logo.jpeg"
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
import {apiClient, FITNEXUS_URL} from "../utils/client";
import { customToast } from '../utils/customToast'

export function LoginForm() {

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();
  
  const [data, setData] = useState({
    email: "",
    password: "",
    });

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
      customToast({message : "Introduce ambos campos!", type : "warning"});
    }

    else {
      console.log("Datos de login: ", userData);

      apiClient.post("/api/v1/login", userData)
      .then((response) => {
        console.log("Respuesta del servidor: ", response.data);
        console.log("Status: ", response.status);
        
        const { role } = response.data;
        
        //Guardamos y rol en el contexto
        setUser({ role });
        //Guardamos  rol 
        localStorage.setItem("userRole", role);

        if((response.status === 401)){
          customToast({message : "Error 401 usuario no autorizado", type : "error"});
        }
        if (response.status === 200) {
          console.log("Rol del usuario:", role);
          console.log("Mostrando Toast de Login Okay...")
          customToast({message : "Login efectuado correctamente!", type : "success"});

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
        customToast({message : "Error en la autenticacion", type : "error"});
      });
    }
    };

  const onSubmitTest = (role) => {
    if (!data.email || !data.password) {
      customToast({message : "Por favor introduce ambos campos...", type : "success"});
      return;
    }

    const validCredentials = {
      admin: {
        email: "admin",
        password: "1234",
      },
      user: {
        email: "user",
        password: "5678",
      },
    };

    // Simula la validación de credenciales y asigna el rol
    if (role === "admin") {
      if (data.email === validCredentials.admin.email && data.password === validCredentials.admin.password) {
        setUser({ role: "ADMIN" });
        localStorage.setItem("userRole", "ADMIN");
        customToast({message : "Login efectuado correctamente como administrador!", type : "success"});
        navigate('/dashboard', { state: { isAdminProp: true } });
      } else {
        customToast({message : "Credenciales incorrectas para administrador.", type : "error"});
      }
    } else if (role === "user") {
      if (data.email === validCredentials.user.email && data.password === validCredentials.user.password) {
        setUser({ role: "USER" });
        localStorage.setItem("userRole", "USER");
        customToast({message : "Login efectuado correctamente como usuario!", type : "success"});
        navigate('/dashboard', { state: { isAdminProp: false } });
      } else {
        customToast({message : "Credenciales incorrectas para usuario.", type : "error"});
      }
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 lg:p-10">
        <div className="grid w-full max-w-3xl grid-cols-1 lg:grid-cols-2">
    <Card className="mx-auto max-w-sm">
      <CardContent>
      <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
              <h1 className="text-2xl font-bold">Iniciar sesión</h1>
                <p className="text-muted-foreground">
                  Introduce tu email para acceder a tu cuenta
                </p>
                </div>
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
            <Button onClick={() => onSubmitTest('admin')}>
              Iniciar como Admin
            </Button>
          </div>
          <div className="mt-2 text-center text-sm">
            <Button onClick={() => onSubmitTest('user')}>
              Iniciar como Usuario
            </Button>
          </div>
          <div className="text-center text-sm">
            No tienes una cuenta? {" "}
            <Button onClick={()=> navigate("/signup")}  className="w-full">
            Regístrate!
            </Button>
          </div>
        </div>
        </div>
      </CardContent>
    </Card>
    <div className="relative hidden bg-muted lg:flex">
        <img
          src={fitNexusLogo}
          alt="fitNexusLogo"
          width="1920"
          height="1080"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
    <div className="mt-4 text-center text-xs text-muted-foreground">
      Al continuar, aceptas nuestros{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Términos de servicio
          </a>{" "}
      y nuestra{" "}
      <a href="#" className="underline underline-offset-4 hover:text-primary">
        Política de privacidad
      </a>.
    </div>
  </div>
  );
}

export default LoginForm