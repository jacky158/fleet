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

export default function AlertHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmProps>();

  const resolver = useRef<(value: boolean) => void>();

  const handleSubmit = () => {
    setOpen(false);
  };

  const handleClose: DialogProps["onClose"] = (_, reason) => {
    // skip
    if (reason == "backdropClick") return;

    handleSubmit();
  };

  const handleExit = () => {
    if (resolver.current) {
      resolver.current(true);
    } else {
      console.warn("there are no resolver");
    }
  };

  const handleExited = () => {
    setData(undefined);
  };

  const alert = useCallback((data: ConfirmProps) => {
    setData(data);
    setOpen(true);
    return new Promise<boolean>((resolve) => {
      resolver.current = resolve;
    });
  }, []);

  useEffect(() => {
    app.extend({ alert });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data) {
    return null;
  }

  const { title, message, ...others } = data;

  return (
    <Dialog
      open={open}
      {...others}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      disableEscapeKeyDown
      TransitionProps={{
        onExited: handleExited,
        onExit: handleExit,
      }}
    >
      <DialogTitle id="alert-dialog-title">{title ?? null}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} autoFocus data-testid="buttonSubmit">
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
