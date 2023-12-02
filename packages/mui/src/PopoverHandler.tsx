import { useApp } from "@ikx/core";
import { useLocation } from "@ikx/route";
import { OpenPopoverProps } from "@ikx/types";
import { PopoverVirtualElement } from "@mui/material";
import {
  RefObject,
  createElement,
  useCallback,
  useEffect,
  useState,
} from "react";

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

  const { component, ...props } = state;

  return createElement(app.jsx.get(component), {
    ...props,
    open: Boolean(open && anchorEl),
    container: document.body,
    anchorEl: anchorEl,
    onClick() {
      setOpen(false);
    },
    onClose() {
      setOpen(false);
    },
  });
}

export default PopoverHandler;
