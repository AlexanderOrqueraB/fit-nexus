import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components_ui/ui/alert"

export function AdminPageComponent() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Admin page component
      </AlertDescription>
    </Alert>
  )
}

export default AdminPageComponent
