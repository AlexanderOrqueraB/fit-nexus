import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components_ui/ui/alert"

import NavigationMenuAdmin from './NavigationMenuAdmin';

export function AdminPageComponent() {
  return (
    <div>
    <NavigationMenuAdmin /> 
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
