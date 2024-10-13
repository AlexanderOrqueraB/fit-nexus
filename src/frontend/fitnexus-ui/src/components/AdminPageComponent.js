import { Button } from "bootstrap";
import { AlertCircle } from "lucide-react"
import { Link } from "react-router-dom";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components_ui/ui/alert"

import NavigationMenuAdmin from './NavigationMenuAdmin';
import TestDashboardList from "./TestDashboardList";
import {FITNEXUS_URL} from "../constants/env";

export function AdminPageComponent() {
  return (
    <div>
    <NavigationMenuAdmin /> 
    <div className="mt-4 text-center text-sm">
          Test List Dasboard: {" "}
          <Link to={FITNEXUS_URL + "/testdashboardlist"} className="underline">
            IR
          </Link>
        </div>
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Admin page component
      </AlertDescription>
    </Alert>
    </div>
  )
}

export default AdminPageComponent
