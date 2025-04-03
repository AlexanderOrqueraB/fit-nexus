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
  const [dataLoading, setDataLoading] = useState(true);
  const [dataExtraLoading, setDataExtraLoading] = useState(true);
  const [data, setData] = useState(null);
  const [dataExtra, setDataExtra] = useState(null);

  useEffect(() => {
    loadData();
    if (role === "USER") {
        loadExtraData();
    }
  }, []);

    useEffect(() => {
        if (selectedSection === "general") {
            loadData();
        } else if (selectedSection === "advanced" && role === "USER") {
            loadExtraData();
        }
    }, [selectedSection]);

  const objetivoMap = {
    PERDER_GRASA: "Perder grasa",
    GANAR_MUSCULO: "Ganar músculo"
  };

  const generoMap = {
      HOMBRE: "Hombre",
      MUJER: "Mujer"
    };

  const frecuenciaEjercicioMap = {
        POCO_NADA: "Poco o nada",
        LIGERO: "Ligero (1-3 días a la semana)",
        MODERADO: "Moderado (3-5 días a la semana)",
        FUERTE: "Fuerte (6-7 días a la semana)",
        MUY_FUERTE: "Muy fuerte (2 veces al día)"
  };

  const loadData = async () => {
    setDataLoading(true);
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
      setDataLoading(false);
    }
  };

    const loadExtraData = async () => {
      setLoading(true);
      setDataExtraLoading(true);
      try {
        //cargamos datos extra
        const myExtraData = await fetchExtraData(fitNexusId);
            if (myExtraData && Object.values(myExtraData).some((value) => value !== null))  {
              console.log("Datos extra del usuario: ", JSON.stringify(myExtraData));
              setDataExtra(myExtraData);
              console.log("Datos extra del usuario cargados correctamente por su FitNexusId: ", fitNexusId);
            } else {
              console.log("Datos extra del usuario (null): ", myExtraData);
              setDataExtra(null);
            customToast({
            message: "No se encontraron datos extra. Por favor, actualiza los campos.",
            type: "info",
          });
      }

      } catch (error) {
        console.error("Error al cargar datos:", error);
        customToast({
          message: "Hubo un error al cargar los datos de cliente",
          type: "error",
        });
      } finally {
        setLoading(false);
        setDataExtraLoading(false);
      }
    };

  const renderSection = () => {
    switch (selectedSection) {
      case "general":
      if (dataLoading) {
        return <ProgressCustom />;
      }
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
                    { label: "Nombre", value: data?.nombre || "Cargando..." },
                    { label: "Apellido", value: data?.apellido || "Cargando..." },
                    { label: "Email", value: data?.email || "Cargando..." },
                    { label: "FitNexusId", value: data?.fitNexusId || "Cargando..." },
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
      if (dataExtraLoading) {
        return <ProgressCustom />;
      }
      if (!dataExtra) {
          customToast({
            message: "No se pudieron cargar tus datos extra. Intenta refrescar.",
            type: "error",
          });
          return null;
      }
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
                    { label: "Objetivo", value: objetivoMap[dataExtra?.objetivo] || "Cargando..." },
                    { label: "Género", value: generoMap[dataExtra?.genero] || "Cargando..."},
                    { label: "Frecuencia Ejercicio", value: frecuenciaEjercicioMap[dataExtra?.frecuenciaEjercicioSemanal] || "Cargando..." },
                    { label: "Edad", value: dataExtra?.edad || "Cargando..." },
                    { label: "Peso", value: dataExtra?.peso || "Cargando..." },
                    { label: "Altura", value: dataExtra?.altura || "Cargando..." },
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
              <PutProfileExtra data={dataExtra} reloadData={loadExtraData}/>
              <Button onClick={() => loadExtraData()} className="ml-4">
                    <RefreshCcwIcon className="h-3.5 w-3.5 mr-2" />
                    Refrescar datos
              </Button>
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
