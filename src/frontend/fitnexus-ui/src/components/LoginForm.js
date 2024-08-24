import {Link} from 'react-router-dom'
import { Button } from "../components_ui/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card"
import { Input } from "../components_ui/ui/input"
import { Label } from "../components_ui/ui/label"

export function LoginForm() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Iniciar sesión</CardTitle>
        <CardDescription>
          Introduce tu email para acceder a tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="mi.email@ejemplo.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Contraseña</Label>
            </div>
            <Input id="password" type="password" required />
          </div>
          <Button type="submit" className="w-full">
          Iniciar sesión
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          No tienes una cuenta?{" "}
          <Link to="http://localhost:3000/signup" className="underline">
            Regístrate
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}

export default LoginForm

