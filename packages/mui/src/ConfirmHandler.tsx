import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { useApp } from "@ikx/core";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConfirmProps } from "@ikx/types";

export default function ConfirmHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmProps>();
  const value = useRef<boolean>(false);

  const resolver = useRef<(value: boolean) => void>();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason == "backdropClick") return;
    handleCancel();
  };

  const handleSubmit = useCallback(() => {
    value.current = true;
    setOpen(false);
  }, []);

  const handleExit = useCallback(() => {
    if (resolver.current) {
      resolver.current(value.current);
    } else {
      console.warn("there are no resolver");
    }
  }, []);

  const handleExited = useCallback(() => {
    setData(undefined);
  }, []);

  const confirm = useCallback((data: ConfirmProps) => {
    setOpen(true);
    setData(data);
    value.current = false;

    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  useEffect(() => {
    app.extend({ confirm });
  }, [app, confirm]);

  if (!data) {
    return null;
  }

  const { title, message, ...others } = data;

  return (
    <Dialog
      {...others}
      open={open}
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
