import { useContext, useEffect, useState } from 'react';
import EditProfile from "../components/users/user-actions/EditProfile";
import EditProfileExtra from '../components/users/client/PutProfileExtra';
import ChangePassword from '../components/users/user-actions/ChangePassword';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card";
import { Label } from '../components_ui/ui/label';
import { mockClients } from '../mocks/mockData';
import { UserContext } from '../components/global/UserContext';
import customToast from '../utils/customToast';
import { fetchMyData } from '../utils/api';

export function Settings () {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId } = user; // Desestructurar el objeto user

  const [selectedSection, setSelectedSection] = useState("general");
  const [setData] = useState({
    nombre: user.nombre || mockClients[0].nombre,
    apellido: user.apellido || mockClients[0].apellido,
    email: user.email || mockClients[0].email,
    fitNexusId: user.fitNexusId || mockClients[0].fitNexusId,
  });

  const objetivoMap = {
    PERDER_GRASA: "Perder grasa",
    GANAR_MUSCULO: "Ganar músculo"
  };

  const loadData = async () => {
    try {
      const myData = await fetchMyData(fitNexusId);
      setData(myData);
      customToast({ message: "Datos cargados correctamente", type: "success" });

    } catch (error) {
      console.error("Error al cargar datos:", error);
      customToast({
        message: "Hubo un error al cargar los datos de cliente",
        type: "error",
      });
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Llama a loadData solo al montar el componente

  const renderSection = () => {
    switch (selectedSection) {
      case "general":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Datos generales</CardTitle>
              <CardDescription>
                Comprueba aquí tus datos principales, además de tu FitNexusId:
              </CardDescription>

            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="space-y-2">
                  {[
                    { label: "Nombre", value: mockClients[0].nombre },
                    { label: "Apellido", value: mockClients[0].apellido },
                    { label: "Email", value: mockClients[0].email },
                    { label: "FitNexusId", value: mockClients[0].fitNexusId },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Label className="w-1/4">{item.label}</Label>
                      <div className="w-3/4 p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <EditProfile />
            </CardFooter>
          </Card>
        );
      case "password":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Cambiar contraseña</CardTitle>
              <CardDescription>
                Cambia aquí tu contraseña. Pulsa el botón para editar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label className="w-1/4">Contraseña</Label>
                    <div className="w-3/4 p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                      *******
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <ChangePassword />
            </CardFooter>
          </Card>
        );
      case "advanced":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Datos extra</CardTitle>
              <CardDescription>
                Comprueba aquí tus datos extra (objetivo, edad, peso, etc). Pulsa el botón para editar.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="space-y-2">
                  {[
                    { label: "Objetivo", value: mockClients[0].objetivo },
                    { label: "Genero", value: mockClients[0].genero },
                    { label: "Frecuencia Ejercicio", value: mockClients[0].frecuenciaEjercicioSemanal },
                    { label: "Edad", value: mockClients[0].edad },
                    { label: "Peso", value: mockClients[0].peso },
                    { label: "Altura", value: mockClients[0].altura },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Label className="w-1/4">{item.label}</Label>
                      <div className="w-3/4 p-2 bg-gray-100 border border-gray-300 rounded-md text-gray-700">
                      {item.label === "Objetivo" ? objetivoMap[item.value] || item.value : item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
              <EditProfileExtra />
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Ajustes de perfil</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground">
            <button
              onClick={() => setSelectedSection("general")}
              className={`font-semibold ${
                selectedSection === "general" ? "text-primary" : "text-muted"
              }`}
            >
              General
            </button>
            <button
              onClick={() => setSelectedSection("password")}
              className={`font-semibold ${
                selectedSection === "password" ? "text-primary" : "text-muted"
              }`}
            >
              Contraseña
            </button>
            <button
              onClick={() => setSelectedSection("advanced")}
              className={`font-semibold ${
                selectedSection === "advanced" ? "text-primary" : "text-muted"
              }`}
            >
              Datos extra
            </button>
          </nav>
          <div className="grid gap-6">{renderSection()}</div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
