import axios from "axios";
import { Link, useNavigate} from 'react-router-dom'
import { Button } from "../components_ui/ui/button"
import dumbbell from "../images/db2.PNG"
import React, { useRef, useState, useEffect } from "react"; //(2)

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components_ui/ui/card"
import { Input } from "../components_ui/ui/input"
import { Label } from "../components_ui/ui/label"
import { Toaster, toast } from 'sonner'

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