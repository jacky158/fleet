import { Alert, Snackbar } from "@mui/material";
import { ToastProps } from "./types";
import { isString } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { useApp } from "fleet-core";

export default function ToastHandler() {
  const app = useApp();
  const [open, setOpen] = useState<boolean>(false);
  const [data, setData] = useState<ToastProps>();

  const toast = useCallback((config: ToastProps | string) => {
    if (!config) return;
    setOpen(true);
    setData(isString(config) ? { message: config } : config);
  }, []);

  const handleClose = useCallback(() => {
    setOpen(false);
    setData(undefined);
  }, []);

  useEffect(() => {
    app.addService({ toast });
  }, []);

  return (
    <Snackbar
      key={data?.message}
      open={open}
      autoHideDuration={data?.duration ?? 6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={data?.severity ?? "success"}
        sx={{ width: "100%" }}
      >
        {data?.message}
      </Alert>
    </Snackbar>
  );
}
