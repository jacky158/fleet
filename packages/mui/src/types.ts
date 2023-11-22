import { ModalProps } from "@mui/material";
import { OpenModalProps } from "@ikx/types";

export type ModalApi = {
  open(payload: OpenModalProps): void;
  push(payload: OpenModalProps): void;
  replace(payload: OpenModalProps): void;
  setUserConfirm(shouldConfirm: boolean, params: unknown): void;
  pop(): void;
  onClose: ModalProps["onClose"];
} & Pick<ModalProps, "onClose" | "onTransitionExited">;
