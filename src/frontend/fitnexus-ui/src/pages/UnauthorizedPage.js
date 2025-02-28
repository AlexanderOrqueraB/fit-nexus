import React from "react";
import { Button } from "../components_ui/ui/button";
import AlertDestructive from "../components/common/AlertDestructive"

const UnauthorizedPage = () => {
  const returnBack = () => {
    window.history.back();
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted p-6 lg:p-10">
      <div className="w-full max-w-lg rounded-lg bg-white p-8 shadow-sm">
      <AlertDestructive
          messageTitle = "Acceso Denegado"
          message = "No tienes permisos para acceder a esta página" 
      />
      <Button onClick={returnBack} className="mt-4 w-full rounded-md bg-primary py-2 text-white hover:bg-primary-dark">
            Volver atrás
      </Button>
    </div>
    </div>
  );
};

export default UnauthorizedPage;
