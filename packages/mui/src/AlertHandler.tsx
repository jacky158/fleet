import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useApp } from "fleet-core";
import { useCallback, useEffect, useRef, useState } from "react";
import { ConfirmProps } from "./types";

export default function AlertHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmProps>();

  const resolver = useRef<(value: boolean) => void>();

  const handleSubmit = () => {
    setOpen(false);
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
    app.addService({ alert });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleSubmit}
      maxWidth="sm"
      fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      TransitionProps={{
        onExited: handleExited,
        onExit: handleExit,
      }}
    >
      <DialogTitle id="confirm-dialog-title">{data?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="confirm-dialog-description">
          {data?.message}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
