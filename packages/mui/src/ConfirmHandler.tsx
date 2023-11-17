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
import { ConfirmProps } from "./types";

export default function ConfirmHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmProps>();
  const [value, setValue] = useState<boolean>(false);

  const resolver = useRef<(value: boolean) => void>();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    if (reason == "backdropClick") return;
    handleCancel();
  };

  const handleSubmit = () => {
    setValue(true);
    setOpen(false);
  };

  const handleExit = () => {
    if (resolver.current) {
      resolver.current(value);
    } else {
      console.warn("there are no resolver");
    }
  };

  const handleExited = () => {
    setData(undefined);
  };

  const confirm = useCallback((data: ConfirmProps) => {
    setOpen(true);
    setData(data);
    setValue(false);

    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  useEffect(() => {
    app.extend({ confirm });
  }, []);

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
