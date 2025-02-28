import { toast } from 'sonner'

export const customToast = ({ 
  message = "Operación realizada", 
  type = "success",
  description = "description to be added",
  label = "cerrar" }) => {

  const promise = () => 
  new Promise((resolve) => setTimeout(() => resolve({ name: 'Sonner' }), 2000));

  switch (type) {

    case "loading":
      toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => {
          return `${data.name} toast has been added`;
        },
        error: 'Error',
      });
      break;
    
    case "success":
      toast.success(message, {
        action: {
          label: label
        }
      })
      break;

    case "info":
      toast.info(message, {
        action: {
          label: label
        }
      })
      break;

    case "error":
      toast.error(message, {
        action: {
          label: label
        }
      })
      break;

    case "warning":
      toast.warning(message, {
        action: {
          label: label
        }
      })
      break;

    case "action":
      toast(message, {
        action: {
          label: label
        }
      })
      break;

    default:
      toast(message, {
        description: description,
      })
      break;
  }
};

export default customToast

