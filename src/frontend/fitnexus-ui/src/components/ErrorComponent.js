import { AlertCircle } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "../components_ui/ui/alert"


export function ErrorComponent() {
  return (
    <div>
    <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Normal page component
      </AlertDescription>
    </Alert>
    </div>
  )
}

export default ErrorComponent
