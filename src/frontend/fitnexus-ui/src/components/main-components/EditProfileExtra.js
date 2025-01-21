import { Button } from "../../components_ui/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components_ui/ui/dialog"
import { Input } from "../../components_ui/ui/input"
import { Label } from "../../components_ui/ui/label"
import { mockClients } from '../../mocks/mockData'

export function EditProfileExtra() {
  //TODO: Añadir get para obtener los datos de placeholder del cliente que va a editar su info
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Añadir datos extra</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar datos extra</DialogTitle>
          <DialogDescription>
           Haz cambios a tu perfil aquí. Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Objetivo
            </Label>
            <Input
              id="nombre"
              placeholder={mockClients[0].objetivo}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Genero
            </Label>
            <Input
              id="apellido"
              placeholder={mockClients[0].genero}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Frecuencia Ejercicio
              </Label>
              <Input
                id="email"
                placeholder={mockClients[0].frecuenciaEjercicioSemanal}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Edad
              </Label>
              <Input
                id="email"
                placeholder={mockClients[0].edad}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Peso
              </Label>
              <Input
                id="email"
                placeholder={mockClients[0].peso}
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Altura
              </Label>
              <Input
                id="email"
                placeholder={mockClients[0].altura}
                className="col-span-3"
              />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default EditProfileExtra
