import { Box, Container, styled } from "@mui/material";
import { ReactNode } from "react";

const Root = styled(Box, {
  name: "LayoutCentered",
  slot: "Root",
  overridesResolver(_props, styles) {
    return [styles.root];
  },
})(() => ({
  width: "calc(100vw)",
  height: "100vh",
}));

const Paper = styled(Container, {
  name: "LayoutCentered",
  slot: "Paper",
  overridesResolver(_props, styles) {
    return [styles.paper];
  },
})(() => ({
  height: "calc(100vh)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function ScreenCentered({ children }: { children: ReactNode }) {
  return (
    <Root>
      <Paper>{children}</Paper>
    </Root>
  );
}
