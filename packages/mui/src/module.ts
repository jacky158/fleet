import type {
  ToastProps,
  AlertProps,
  ConfirmProps,
  OpenMenuProps,
  ModalApi,
} from "./types";

declare module "@ikx/app" {
  export interface App {
    toast(data: ToastProps): void;
    alert(data: AlertProps): Promise<void>;
    confirm(data: ConfirmProps): Promise<boolean>;
    handleError(error: unknown, formik: unknown): void;
    handleFeedback(res: unknown): void;
    openMenu(data: OpenMenuProps): void;
    useLayoutPageSize(): string;
    modal: ModalApi;
  }
}
