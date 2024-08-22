import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components_ui/ui/alert"

export function AlertDestructive() {
  return (
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again 2.
      </AlertDescription>
    </Alert>
  )
}

export default AlertDestructive
