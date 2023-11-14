export interface ToastProps {
  message: string;
  duration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

export interface ConfirmProps {
  title?: string;
  message: string;
}

export interface AlertProps {
  title?: string;
  message: string;
}

declare module "fleet-core" {
  export interface AppManager {
    toast(data: ToastProps): void;
    alert(data: AlertProps): Promise<void>;
    confirm(data: ConfirmProps): Promise<boolean>;
    handleError(error: unknown, formik: unknown): void;
    handleFeedback(res: unknown): void;
  }
}
