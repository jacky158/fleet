import { MenuProps } from "@mui/material/Menu";
import useApp from "@ikx/app";
import { createElement, useCallback, useState } from "react";
import { OpenMenuProps } from "./types";

export default function MenuHandler() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<OpenMenuProps>();
  const app = useApp();

  const openMenu = useCallback((data: OpenMenuProps) => {
    setOpen(true);
    setState(data);
  }, []);

  app.extend({ openMenu });

  if (!state) return null;

  return createElement(state?.menu as unknown as React.FC<MenuProps>, {
    open: Boolean(open && state.ref.current),
    anchorEl: state.ref.current as HTMLElement,
    onClose() {
      setOpen(false);
    },
  });
}
