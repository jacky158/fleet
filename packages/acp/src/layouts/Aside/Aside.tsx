import { Drawer, DrawerProps } from "@mui/material";
import { lazy } from "react";
const Dense = lazy(() => import("./Dense"));
const Full = lazy(() => import("./Full"));

export default function Aside({
  variant,
  onClose,
  open,
  cx,
  layout = "dense",
}: Pick<DrawerProps, "variant" | "open" | "onClose"> & {
  cx: string;
  layout?: string;
}) {
  return (
    <Drawer
      anchor="left"
      variant={variant}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: cx,
          transitionProperty: "width",
          transitionDuration: "250ms",
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
          boxSizing: "border-box",
        },
      }}
    >
      {layout == "dense" ? <Dense /> : <Full />}
    </Drawer>
  );
}
