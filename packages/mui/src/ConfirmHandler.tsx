import { useApp } from "@ikx/core";
import { ConfirmProps } from "@ikx/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { useCallback, useEffect, useReducer } from "react";

interface State {
  data: ConfirmProps | undefined;
  open: boolean;
  value: boolean;
  resolver(value: boolean): void;
  rejector(msg: string): void;
}

type Action =
  | {
      type: "open";
      payload: ConfirmProps;
      resolve: (value: boolean) => void;
      reject(): void;
    }
  | { type: "exited" }
  | { type: "exit" }
  | { type: "rejected" }
  | { type: "close"; payload: "backdropClick" | "escapeKeyDown" }
  | { type: "accepted" };

export default function ConfirmHandler() {
  const app = useApp();

  const [state, dispatch] = useReducer(
    (draft: State, action: Action) => {
      switch (action.type) {
        case "open":
          draft.open = true;
          draft.data = action.payload;
          draft.value = false;
          draft.resolver = action.resolve;
          draft.rejector = action.reject;
          break;
        case "exited":
          draft.open = false;
          draft.data = undefined;
          draft.value = false;
          break;
        case "accepted":
          draft.value = true;
          draft.open = false;
          break;
        case "exit":
          console.log(draft.value === true);
          if (draft.resolver && draft.value === true) {
            draft.resolver(true);
          } else {
            draft.resolver(false);
            // make hard to control
            // draft.rejector("user_cancelled");
          }
          break;
        case "rejected":
          draft.value = false;
          draft.open = false;
          break;
        case "close":
          if (action.payload == "backdropClick") break;
          draft.open = false;
          draft.value = false;
          break;
      }
      return { ...draft };
    },
    {
      open: false,
      value: false,
      data: undefined,
      resolver() {},
      rejector() {},
    }
  );

  const handleCancel = useCallback(() => {
    dispatch({ type: "rejected" });
  }, []);

  const handleClose: DialogProps["onClose"] = useCallback(
    (_: unknown, reason: "backdropClick" | "escapeKeyDown") => {
      dispatch({ type: "close", payload: reason });
    },
    []
  );

  const handleSubmit = useCallback(() => {
    dispatch({ type: "accepted" });
  }, []);

  const handleExit = useCallback(() => {
    dispatch({ type: "exit" });
  }, []);

  const handleExited = useCallback(() => {
    dispatch({ type: "exited" });
  }, []);

  const confirm = useCallback((data: ConfirmProps) => {
    return new Promise<boolean>((resolve, reject) => {
      dispatch({
        type: "open",
        payload: data,
        resolve,
        reject,
      });
    });
  }, []);

  useEffect(() => {
    app.extend({ confirm });
  }, [app, confirm]);

  if (!state.data) {
    return null;
  }

  const { title, message, ...others } = state.data;

  return (
    <Dialog
      {...others}
      open={state.open}
      onClose={handleClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      TransitionProps={{
        onExited: handleExited,
        onExit: handleExit,
      }}
    >
      <DialogTitle id="confirm-dialog-title">{title ?? null}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} data-testid="buttonCancel">
          Cancel
        </Button>
        <Button onClick={handleSubmit} autoFocus data-testid="submitButton">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
