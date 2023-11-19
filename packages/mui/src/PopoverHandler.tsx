import { MenuProps } from "@mui/material/Menu";
import { useApp } from "@ikx/core";
import { createElement, useCallback, useState } from "react";
import { OpenPopoverProps } from "./types";

export function PopoverHandler() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<OpenPopoverProps>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const app = useApp();

  const openPopover = useCallback((evt: unknown, data: OpenPopoverProps) => {
    const e = evt as MouseEvent;
    if (e) {
      e.stopPropagation();
      setAnchorEl((e.currentTarget ?? e.target) as HTMLElement);
    }

    setOpen(true);
    setState(data);
  }, []);

  app.extend({ openPopover });

  if (!state) return null;

  return createElement(
    app.jsx.get(state?.component) as unknown as React.FC<MenuProps>,
    {
      open: Boolean(open && anchorEl),
      anchorEl: anchorEl,
      onClose() {
        setOpen(false);
      },
    }
  );
}

export default PopoverHandler;
