import { Link} from 'react-router-dom'
import React from "react"; //(2)

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components_ui/ui/card"

export function LogoutForm() {
  return (
  <div className="w-full lg:grid lg:min-h lg:grid-cols-2 xl:min-h-[800px]">
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Logout</CardTitle>
        <CardDescription>
          Gracias por utilizar FitNexus
        </CardDescription>
      </CardHeader>
    </Card>
  <Link to="/dashboard-admin" className="text-muted-foreground transition-colors hover:text-foreground">
  /logout
  </Link>
  </div>
  )
}

export default LogoutForm