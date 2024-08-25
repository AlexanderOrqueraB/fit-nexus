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

export function CreateExercise() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Crear ejercicio</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Crear ejercicio </DialogTitle>
          <DialogDescription>
            Crea un ejercicio aquí.
          </DialogDescription>
          <DialogDescription>
            Haz click en Guardar cuando hayas terminado.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nombre del ejercicio
            </Label>
            <Input
              id="name"
              defaultValue="Press banca"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="repeticion" className="text-right">
              Repeticiones
            </Label>
            <Input
              id="repeticion"
              defaultValue="5"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="serie" className="text-right">
                Series
              </Label>
              <Input
                id="serie"
                defaultValue="5"
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="peso" className="text-right">
                Peso (kg)
              </Label>
              <Input
                id="peso"
                defaultValue="30"
                className="col-span-3"
              />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardioRealizado" className="text-right">
                Cardio (Si, no)
              </Label>
              <Input
                id="cardioRealizado"
                defaultValue="No"
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

export default CreateExercise
