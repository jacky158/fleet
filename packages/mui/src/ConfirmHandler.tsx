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

export default function ConfirmHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ConfirmProps>();
  const [value, setValue] = useState<boolean>(false);

  const resolver = useRef<(value: boolean) => void>();

  const handleCancel = () => {
    setOpen(false);
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
    app.addService({ confirm });
  }, []);

  if (!data) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={handleCancel}
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
        <Button onClick={handleCancel}>Cancel</Button>
        <Button onClick={handleSubmit} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
}
