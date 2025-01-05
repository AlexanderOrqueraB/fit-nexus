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
      toast.success(message);
      break;

    case "info":
      toast.info(message);
      break;

    case "error":
      toast.error(message);
      break;

    case "warning":
      toast.warning(message);
      break;

    case "action":
      toast(message, {
        action: {
          label: label
        }
      })
      break;
    
    case "description":
      toast.message(message, {
        description: description,
      })
      break;

    case "default":
      toast(message); 
      break;
  }
};

export default customToast

import { customToast } from '../utils/'