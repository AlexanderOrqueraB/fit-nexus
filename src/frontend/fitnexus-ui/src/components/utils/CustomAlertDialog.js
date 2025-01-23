import { InfoIcon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components_ui/ui/alert-dialog"
import { Button } from "../../components_ui/ui/button"


export function CustomAlertDialog ({ 
  messageButton = "Ver info", 
  title = "Titulo ejemplo",
  description = "descripcion" }) {
  return (
  <AlertDialog>
  <AlertDialogTrigger asChild>
    <Button variant="outline">
      {messageButton}
    </Button>
  </AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>{title}</AlertDialogTitle>
      <AlertDialogDescription>
      {description}
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Entendido!</AlertDialogCancel>
      {/*<AlertDialogAction>Continue</AlertDialogAction>*/}
    </AlertDialogFooter>
  </AlertDialogContent>
  </AlertDialog>
  );
};

export default CustomAlertDialog
