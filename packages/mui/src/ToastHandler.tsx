import { Alert, Snackbar } from "@mui/material";
import useApp from "@ikx/app";
import { isString } from "lodash";
import { useCallback, useEffect, useState } from "react";
import { ToastProps } from "./types";

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
  }, []);

  const handleExited = () => {
    setData(undefined);
  };

  useEffect(() => {
    app.extend({ toast });
  }, []);

  if (!data) return null;

  return (
    <Snackbar
      open={open}
      autoHideDuration={data?.duration ?? 6000}
      onClose={handleClose}
      TransitionProps={{
        onExited: handleExited,
      }}
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
