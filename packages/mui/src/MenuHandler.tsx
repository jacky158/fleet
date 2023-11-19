import { useApp } from "@ikx/core";
import { MenuProps } from "@mui/material/Menu";
import { createElement, useCallback, useState } from "react";
import { OpenPopoverProps } from "./types";

export default function MenuHandler() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<OpenPopoverProps>();
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const app = useApp();

  const openMenu = useCallback((evt: unknown, data: OpenPopoverProps) => {
    const e = evt as MouseEvent;
    if (e) {
      e.stopPropagation();
      setAnchorEl(e.target as HTMLElement);
    }
    setOpen(true);
    setState(data);
  }, []);

  app.extend({ openMenu });

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
