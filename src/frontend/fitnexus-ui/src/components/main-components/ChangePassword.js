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

export function EditProfile() {
  //TODO: Añadir get para obtener los datos de placeholder del cliente que va a editar su info
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Cambiar contraseña</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogDescription>
            Cambia tu contraseña aquí.
          </DialogDescription>
          <DialogDescription>
            Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="nombre" className="text-right">
              Contraseña
            </Label>
            <Input
              id="password"
              placeholder="********"
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
