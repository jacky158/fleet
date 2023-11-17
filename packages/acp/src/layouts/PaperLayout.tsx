import { Box, Container, styled } from "@mui/material";
import { ReactNode } from "react";

const Root = styled(
  Box,
  {}
)(() => ({
  width: "calc(100vw)",
  height: "100vh",
}));

const Center = styled(
  Container,
  {}
)(() => ({
  height: "calc(100vh)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export default function PaperLayout({ children }: { children: ReactNode }) {
  return (
    <Root>
      <Center maxWidth="sm">{children}</Center>
    </Root>
  );
}
