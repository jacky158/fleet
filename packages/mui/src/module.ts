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
    useLayoutPageSize(): string;
    openMenu(evt: unknown, data: OpenPopoverProps): void;
    openPopover(evt: unknown, data: OpenPopoverProps): void;
    modal: ModalApi;
  }
}
