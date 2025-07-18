import { toast, type ToastOptions } from "react-toastify";

const defaultOptions: ToastOptions = {
  position: "bottom-left",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: false,
  draggable: true,
  progress: undefined,
};

const successMessage = (message: string) => {
  toast.success(`${message}`, defaultOptions);
};

const notificationMessage = (message: string) => {
  toast.info(message, defaultOptions);
};

const warningMessage = (message: string) => {
  toast.warn(`${message}`, defaultOptions);
};

const errorMessage = (message?: string) => {
  toast.error(`${message}`, defaultOptions);
};

export { successMessage, warningMessage, errorMessage, notificationMessage };
