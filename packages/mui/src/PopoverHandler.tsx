import { MenuProps } from "@mui/material/Menu";
import { useApp } from "@ikx/core";
import {
  RefObject,
  createElement,
  useCallback,
  useEffect,
  useState,
} from "react";
import { OpenPopoverProps } from "@ikx/types";
import { useLocation } from "@ikx/router";
import { PopoverVirtualElement } from "@mui/material";

export function PopoverHandler() {
  const [open, setOpen] = useState<boolean>(false);
  const [state, setState] = useState<OpenPopoverProps>();
  const [anchor, setAnchor] = useState<PopoverVirtualElement>();
  const { key } = useLocation();

  const app = useApp();

  const openPopover = useCallback((evt: unknown, data: OpenPopoverProps) => {
    const e = evt as MouseEvent;
    if (e) {
      e.stopPropagation();

      if (!state?.ref) {
        const node = (e.currentTarget ?? e.target) as HTMLElement;

        const rect: DOMRect = node?.getBoundingClientRect();

        if (rect) {
          setAnchor({
            nodeType: 1,
            getBoundingClientRect() {
              return rect;
            },
          });
        } else {
          setAnchor(undefined);
        }
      }
    }
    setOpen(true);
    setState(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [key]);

  app.extend({ openPopover });
  const anchorEl =
    (state?.ref as RefObject<PopoverVirtualElement>)?.current || anchor;

  if (!state || !anchorEl) return null;

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
