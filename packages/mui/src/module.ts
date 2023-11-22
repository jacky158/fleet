import type {
  ModalApi,
  ToastProps,
  AlertProps,
  ConfirmProps,
  OpenPopoverProps,
} from "@ikx/types";
import { MenuProps } from "@mui/material/Menu";

declare module "@ikx/types" {
  export interface OpenModalProps {
    key: string;
  }

  export interface OpenPopoverProps extends MenuProps {}
}

declare module "@ikx/core" {
  export interface App {
    toast(data: ToastProps): void;
    alert(data: AlertProps): Promise<void>;
    confirm(data: ConfirmProps): Promise<boolean>;
    handleError(error: unknown, formik: unknown): void;
    handleFeedback(res: unknown): void;
    useLayoutPageSize(): string;
    openPopover(evt: unknown, data: OpenPopoverProps): void;
    modal: ModalApi;
  }
}
