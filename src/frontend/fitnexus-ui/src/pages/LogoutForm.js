import { useNavigate } from 'react-router-dom';
import React from "react";
import {
  Card,
  CardContent,
} from "../components_ui/ui/card";
import { Button } from "../components_ui/ui/button";
import fitNexusLogo from "../assets/images/fit-nexus-logo.jpeg"


export function LogoutForm() {
  const navigate = useNavigate();

  const goBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-muted p-6 lg:p-10">
      <div className="grid w-full max-w-3xl grid-cols-1 lg:grid-cols-2">
        <Card className="mx-auto max-w-sm">
          <CardContent>
          <div className="p-6 md:p-8">
              <div className="flex flex-col gap-6">
                <div className="flex flex-col items-center text-center">
                  <h1 className="text-2xl font-bold">Gracias por utilizar FitNexus</h1>
                </div>
              <Button onClick={goBackToLogin} type="submit" className="w-full">
                Iniciar sesión
              </Button>
  
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

export default LogoutForm;