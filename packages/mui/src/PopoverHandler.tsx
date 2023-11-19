import { MenuProps } from "@mui/material/Menu";
import { useApp } from "@ikx/core";
import { createElement, useCallback, useState } from "react";
import { OpenPopoverProps } from "./types";

export function PopoverHandler() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<OpenPopoverProps>();
  const app = useApp();

  const openPopover = useCallback((evt: unknown, data: OpenPopoverProps) => {
    const e = evt as MouseEvent;
    if (e) {
      e.stopPropagation();
    }

    setOpen(true);
    setState(data);
  }, []);

  app.extend({ openPopover });

  if (!state) return null;

  return createElement(state?.component as unknown as React.FC<MenuProps>, {
    open: Boolean(open && state.ref.current),
    anchorEl: state.ref.current as HTMLElement,
    onClose() {
      setOpen(false);
    },
  });
}

export default PopoverHandler;
