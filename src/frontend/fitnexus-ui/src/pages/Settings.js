import { useContext, useEffect, useState } from 'react';
import {
  RefreshCcwIcon,
} from "lucide-react";
import EditProfile from "../components/users/user-actions/EditProfile";
import { PutProfileExtra } from '../components/users/client/PutProfileExtra';
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
import { fetchMyData, fetchExtraData } from '../utils/api';
import ProgressCustom from '../components/common/ProgressCustom';
import { Button } from '../components_ui/ui/button';

export function Settings () {
  const { user } = useContext(UserContext); // Obtener el usuario del contexto (UserContext.js)
  const { fitNexusId, role } = user; // Desestructurar el objeto user

  const [selectedSection, setSelectedSection] = useState("general");
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({
    nombre: user.nombre || mockClients[0].nombre,
    apellido: user.apellido || mockClients[0].apellido,
    email: user.email || mockClients[0].email,
    fitNexusId: user.fitNexusId || mockClients[0].fitNexusId,
  });

  const [dataExtra, setDataExtra] = useState({
    objetivo: user.objetivo || mockClients[0].objetivo,
    genero: user.genero || mockClients[0].genero,
    frecuenciaEjercicioSemanal: user.frecuenciaEjercicioSemanal || mockClients[0].frecuenciaEjercicioSemanal,
    edad: user.edad || mockClients[0].edad,
    peso: user.peso || mockClients[0].peso,
    altura: user.altura || mockClients[0].altura
  });

  useEffect(() => {
    loadData();
    loadExtraData();
  }, []); // Llama a loadData solo al montar el componente

  const objetivoMap = {
    PERDER_GRASA: "Perder grasa",
    GANAR_MUSCULO: "Ganar músculo"
  };

  const loadData = async () => {
    setLoading(true); 
    try {
      //cargamos datos iniciales
      const myData = await fetchMyData(fitNexusId);
        if (myData !== null) {
          console.log("Datos del usuario: ", JSON.stringify(myData));
          setData(myData);
          console.log("Datos del usuario cargados correctamente por su FitNexusId: ", fitNexusId);
        } else {
          console.log("Datos del usuario (null): ", myData);
          customToast({ message: "Hubo un error al cargar los datos de cliente", type: "error" });
        }
      
    } catch (error) {
      console.error("Error al cargar datos:", error);
      customToast({
        message: "Hubo un error al cargar los datos de cliente",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

    const loadExtraData = async () => {
      setLoading(true);
      try {
        //cargamos datos extra
        const myExtraData = await fetchExtraData(fitNexusId);
            if (myExtraData !== null) {
              console.log("Datos extra del usuario: ", JSON.stringify(myExtraData));
              setData(myExtraData);
              console.log("Datos extra del usuario cargados correctamente por su FitNexusId: ", fitNexusId);
            } else {
              console.log("Datos extra del usuario (null): ", myExtraData);
              customToast({ message: "Hubo un error al cargar los datos extra de cliente", type: "error" });
            }

      } catch (error) {
        console.error("Error al cargar datos:", error);
        customToast({
          message: "Hubo un error al cargar los datos de cliente",
          type: "error",
        });
      } finally {
        setLoading(false);
      }
    };

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
                    { label: "Nombre", value: data?.nombre || mockClients[0].nombre },
                    { label: "Apellido", value: data?.apellido || mockClients[0].apellido },
                    { label: "Email", value: data?.email || mockClients[0].email },
                    { label: "FitNexusId", value: data?.fitNexusId || mockClients[0].fitNexusId },
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
            <CardFooter className="border-t px-6 py-4 flex justify-between items-center">
              <EditProfile data={data} reloadData={loadData} />
              <Button onClick={() => loadData()} className="ml-4">
                <RefreshCcwIcon className="h-3.5 w-3.5 mr-2" />
                Refrescar datos
              </Button>
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
                    { label: "Objetivo", value: data?.objetivo || mockClients[0].objetivo },
                    { label: "Genero", value: data?.genero || mockClients[0].genero },
                    { label: "Frecuencia Ejercicio", value: data?.frecuenciaEjercicioSemanal || mockClients[0].frecuenciaEjercicioSemanal },
                    { label: "Edad", value: data?.edad || mockClients[0].edad },
                    { label: "Peso", value: data?.peso || mockClients[0].peso },
                    { label: "Altura", value: data?.altura || mockClients[0].altura },
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
              <PutProfileExtra data={dataExtra} reloadData={loadExtraData}/>
            </CardFooter>
          </Card>
        );
      default:
        return null;
    }
  };

  if (loading) return <ProgressCustom />;

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
            {role === 'USER' ?  (
            <button
              onClick={() => setSelectedSection("advanced")}
              className={`font-semibold ${
                selectedSection === "advanced" ? "text-primary" : "text-muted"
              }`}
            >
              Datos extra
            </button>) : null}
          </nav>
          <div className="grid gap-6">{renderSection()}</div>
        </div>
      </main>
    </div>
  );
}

export default Settings;
