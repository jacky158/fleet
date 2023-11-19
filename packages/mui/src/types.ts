import { ViewName } from "@ikx/types";
import { DialogProps, MenuProps, ModalProps } from "@mui/material";
import { ReactNode } from "react";

export type OpenPopoverProps = {
  component: ViewName;
  ref?: unknown;
} & Omit<MenuProps, "anchorEl" | "open" | "children">;

export interface ToastProps {
  message: ReactNode;
  duration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

export type ConfirmProps = Omit<DialogProps, "children" | "open"> & {
  title?: ReactNode;
  message: ReactNode;
};

export interface AlertProps {
  title?: ReactNode;
  message: ReactNode;
}

export type OpenModalProps = {
  modal: JSX.ElementType;
  open?: boolean;
} & Omit<ModalProps, "open" | "children">;

export type ModalApi = {
  open(payload: OpenModalProps): void;
  push(payload: OpenModalProps): void;
  replace(payload: OpenModalProps): void;
  setUserConfirm(shouldConfirm: boolean, params: unknown): void;
  pop(): void;
  onClose: ModalProps["onClose"];
} & Pick<ModalProps, "onClose" | "onTransitionExited">;

export * from "./types";
