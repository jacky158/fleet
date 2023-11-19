import type {
  ToastProps,
  AlertProps,
  ConfirmProps,
  OpenPopoverProps,
  ModalApi,
} from "./types";

declare module "@ikx/core" {
  export interface App {
    toast(data: ToastProps): void;
    alert(data: AlertProps): Promise<void>;
    confirm(data: ConfirmProps): Promise<boolean>;
    handleError(error: unknown, formik: unknown): void;
    handleFeedback(res: unknown): void;
    openMenu(evt: unknown, data: OpenPopoverProps): void;
    useLayoutPageSize(): string;
    openPopover(evt: unknown, data: unknown): void;
    modal: ModalApi;
  }
}
