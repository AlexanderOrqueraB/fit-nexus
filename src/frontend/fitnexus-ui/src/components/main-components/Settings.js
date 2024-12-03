import { Link, useNavigate} from 'react-router-dom'
import { CircleUser, Menu, Package2, Search } from "lucide-react"

import { Button } from "../../components_ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components_ui/ui/card"
import { Checkbox } from "../../components_ui/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components_ui/ui/dropdown-menu"
import { Input } from "../../components_ui/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "../../components_ui/ui/sheet"
import EditProfile from "./EditProfile"
import { Table } from '../../components_ui/ui/table'
import { Label } from '../../components_ui/ui/label'
import { CLIENTE } from '../utils/hardcodedModelDtos'
import EditProfileExtra from './EditProfileExtra'
import ChangePassword from './ChangePassword'

export function Settings() {
  return (
    <div className="flex min-h-screen w-full flex-col">
    <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="text-3xl font-semibold">Ajustes de perfil</h1>
        </div>
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-4 text-sm text-muted-foreground" x-chunk="dashboard-04-chunk-0">
            <Link href="#" className="font-semibold text-primary">
              General
            </Link>
            <Link href="#">avanzados</Link>
          </nav>
          <div className="grid gap-6">
            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Datos iniciales
                </CardTitle>
                <CardDescription>
                  Comprueba aquí tu nombre, apellido y/o email. Pulsa el botón para editar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="space-y-2">
                    {[
                      { label: "Nombre", value: CLIENTE.nombre },
                      { label: "Apellido", value: CLIENTE.apellido },
                      { label: "Email", value: CLIENTE.email },
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
                <EditProfile></EditProfile>
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Cambiar contraseña
                </CardTitle>
                <CardDescription>
                  Cambia aquí tu contraseña. Pulsa el botón para editar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="space-y-2">
                    {[
                      { label: "Contraseña", value: "*******" }
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
                <ChangePassword></ChangePassword>
              </CardFooter>
            </Card>

            <Card x-chunk="dashboard-04-chunk-1">
              <CardHeader>
                <CardTitle>Datos extra
                </CardTitle>
                <CardDescription>
                  Comprueba aquí tus datos extra (objetivo, edad, peso, etc). Pulsa el botón para editar
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid w-full items-center gap-4">
                  <div className="space-y-2">
                    {[
                      { label: "Objetivo", value: CLIENTE.objetivo },
                      { label: "Genero", value: CLIENTE.genero },
                      { label: "Frecuencia Ejercicio", value: CLIENTE.frecuenciaEjercicioSemanal },
                      { label: "Edad", value: CLIENTE.edad },
                      { label: "Peso", value: CLIENTE.peso },
                      { label: "Altura", value: CLIENTE.altura },
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
                <EditProfileExtra></EditProfileExtra>
              </CardFooter>
            </Card>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Settings
