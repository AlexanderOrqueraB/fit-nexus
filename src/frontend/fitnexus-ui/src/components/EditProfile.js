import { Button } from "../components_ui/ui/button"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components_ui/ui/dialog"
import { Input } from "../components_ui/ui/input"
import { Label } from "../components_ui/ui/label"

export function EditProfile() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil</DialogTitle>
          <DialogDescription>
            Haz cambios a tu perfil aquí.
          </DialogDescription>
          <DialogDescription>
            Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Nombre
            </Label>
            <Input
              id="nombre"
              placeholder="Alex"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="apellido" className="text-right">
              Apellido
            </Label>
            <Input
              id="apellido"
              placeholder="Orquera"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nombreDeUsuario" className="text-right">
                Nombre de usuario
              </Label>
              <Input
                id="nombreDeUsuario"
                placeholder="aorquera"
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                placeholder="aorquera@email.com"
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

export default EditProfile
