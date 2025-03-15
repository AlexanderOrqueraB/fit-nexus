import { Button } from "../../../components_ui/ui/button"
import React, { useContext, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components_ui/ui/dialog"
import { Input } from "../../../components_ui/ui/input"
import { Label } from "../../../components_ui/ui/label"
import { UserContext } from "../../global/UserContext";
import customToast from "../../../utils/customToast";
import { apiClient } from "../../../utils/client";
import { GUARDAR_MENSAJE } from "../../../utils/env";
import { InputPassword } from "../../../components_ui/ui/input-password";

export function ChangePassword() {
  const { user } = useContext(UserContext);
  const { fitNexusId } = user;

  const [passwords, setPasswords] = useState({
    passwordVieja: "",
    passwordNueva: "",
    confirmaPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords({
      ...passwords,
      [name]: value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      passwordVieja: passwords.passwordVieja,
      passwordNueva: passwords.passwordNueva,
    };

    if (passwords.passwordNueva !== passwords.confirmaPassword) {
      customToast({ message: "Las contraseñas no coinciden", type: "warning" });
    }

    console.log('Datos de registro: ', userData);

    try {
      const response = await apiClient.put(`/api/v1/user/password/${fitNexusId}`, userData);
      if (response.status === 200) {
        customToast({ message: "Contraseña cambiada correctamente", type: "success" });
      }
      if (response.status === 401) {
        customToast({ message: "Contraseña actual incorrecta", type: "warning" });
      }
      if (response.status === 500) {
        customToast({ message: "Error al cambiar la contraseña", type: "error" });
      }
    } catch (error) {
      customToast({ message: "Error al cambiar la contraseña", type: "error" });
    }
  };

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
            {GUARDAR_MENSAJE}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="passwordVieja" className="text-right">
              Contraseña actual
            </Label>
            <InputPassword
              id="passwordVieja"
              name="passwordVieja"
              type="password"
              placeholder="********"
              className="col-span-3"
              value={passwords.passwordVieja}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="passwordNueva" className="text-right">
              Contraseña nueva
            </Label>
            <InputPassword
              id="passwordNueva"
              name="passwordNueva"
              type="password"
              placeholder="********"
              className="col-span-3"
              value={passwords.passwordNueva}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="confirmaPassword" className="text-right">
              Confirma tu contraseña
            </Label>
            <Input
              id="confirmaPassword"
              name="confirmaPassword"
              placeholder="********"
              className="col-span-3"
              value={passwords.confirmaPassword}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onSubmit} type="submit">
            Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default ChangePassword
