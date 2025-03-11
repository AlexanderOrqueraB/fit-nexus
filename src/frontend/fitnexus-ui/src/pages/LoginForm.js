import { useNavigate } from "react-router-dom";
import { Button } from "../components_ui/ui/button";
import fitNexusLogo from "../assets/images/fit-nexus-logo.jpeg";
import React, { useContext, useState } from "react";

import { UserContext } from "../components/global/UserContext";
import { isEmailValid } from "../utils/utilsMethod";

import { Card, CardContent } from "../components_ui/ui/card";

import { Input } from "../components_ui/ui/input";
import { Label } from "../components_ui/ui/label";
import { apiClient } from "../utils/client";
import { customToast } from "../utils/customToast";

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
      password: data.password,
    };

    if (!userData.email || !userData.password) {
      customToast({ message: "Introduce ambos campos!", type: "warning" });
    } else if (!isEmailValid(userData.email)) {
      customToast({
        message: "El email no tiene un formato válido nombre@email.com",
        type: "warning",
      });
    }

    //TESTING PURPOSE FOR UI CHANGES
    else if ((userData.email === "admin@email.com") && (userData.password === "1234")) {
      const role = "ADMIN";
      const email = userData.email;
      const fitNexusId = "123456789";

      //Guardamos email y rol en el contexto
      setUser({ role, email, fitNexusId });
      //Guardamos  rol, fitNexusId y email en local storage
      localStorage.setItem("userRole", role);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("fitNexusId", fitNexusId);

      customToast({
        message: "Login efectuado correctamente como administrador!",
        type: "success",
      });
      navigate("/dashboard", { state: { isAdminProp: true } });
      //TESTING PURPOSE FOR UI CHANGES

    } else {
        console.log("Datos de login: ", userData);

        apiClient
          .post("/api/v1/login", userData)
          .then((response) => {
            console.log("Respuesta del servidor: ", response.data);
            console.log("Status: ", response.status);

            const { role, email, fitNexusId } = response.data;
            console.log("El rol del usuario es: ", role +
            " y su email es: ", email + " y su fitNexusId es: ",fitNexusId);

            //Guardamos email y rol en el contexto
            setUser({ role, email, fitNexusId });
            //Guardamos  rol, fitNexusId y email en local storage
            localStorage.setItem("userRole", role);
            localStorage.setItem("userEmail", email);
            localStorage.setItem("fitNexusId", fitNexusId);

            if (response.status === 401) {
              customToast({
                message: "Error 401 usuario no autorizado",
                type: "error",
              });
            }
            if (response.status === 200) {
              console.log("Rol del usuario:", role);
              if (role === "ADMIN") {
                console.log("Redireccionando a pagina admin");
                customToast({
                  message: "Login efectuado correctamente con rol administrador!",
                  type: "success",
                });
                navigate("/dashboard", { state: { isAdminProp: true } });
              } else if (role === "USER") {
                console.log("Redireccionando a pagina usuario");
                customToast({
                  message: "Login efectuado correctamente!",
                  type: "success",
                });
                navigate("/dashboard", { state: { isAdminProp: false } });
              }
            }
        })
          .catch((error) => {
          console.error("Error en la autenticación: ", error);
          customToast({ message: "Error en la autenticacion", type: "error" });
        });
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
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="email@ejemplo.com"
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
                <Button onClick={onSubmit} type="submit" className="w-full">
                  Iniciar sesión
                </Button>

                <div className="text-center text-sm">
                  No tienes una cuenta?{" "}
                  <Button
                    onClick={() => navigate("/signup")}
                    className="w-full"
                  >
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
    </div>
  );
}

export default LoginForm;
