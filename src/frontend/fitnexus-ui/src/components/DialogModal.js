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

export function DialogModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Editar perfil o crear ejercicio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar perfil o crear ejercicio </DialogTitle>
          <DialogDescription>
            Haz cambios a tu perfil aquí. Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Nombre ejercicio
              </Label>
              <Input
                id="name"
                defaultValue="Press banca"
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Repeticiones
              </Label>
              <Input
                id="name"
                defaultValue="5"
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

export default DialogModal
