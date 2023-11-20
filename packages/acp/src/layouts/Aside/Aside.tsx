import { Drawer, DrawerProps } from "@mui/material";
import { Suspense, lazy } from "react";
const Dense = lazy(() => import("./Dense"));
const Full = lazy(() => import("./Full"));

export default function Aside({
  variant,
  onClose,
  open,
  cx,
  layout = "compact",
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
          width: open ? cx : "0px",
          transitionProperty: "width",
          transitionDuration: "250ms",
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
          boxSizing: "border-box",
        },
      }}
    >
      {layout == "compact" ? (
        <Suspense fallback="...">
          <Dense />
        </Suspense>
      ) : (
        <Full />
      )}
    </Drawer>
  );
}
