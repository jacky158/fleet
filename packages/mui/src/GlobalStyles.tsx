import { useTheme, Theme } from "@mui/material/styles";
import MuiGlobalStyles from "@mui/material/GlobalStyles";

const converted = (theme: Theme) => ({
  ":root": {
    fontFamily: theme.typography.fontFamily,
    colorScheme: "light",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",
    margin: 0,
    padding: 0,
    "--aside-width": "280px",
    "--aside-bg": "#1C2536",
    "--aside-color": "#fff",
    "--aside-border-color": "transparent",
    "--aside-logo-border": "#2F3746",
    "--aside-section-title-color": "#9DA4AE",
    "--aside-item-color": "#9DA4AE",
    "--aside-item-hover-bg": "rgba(255, 255, 255, 0.04)",
    "--aside-item-active-bg": "rgba(255, 255, 255, 0.04)",
    "--aside-item-active-color": "#fff",
    "--aside-item-disabled-color": "#6C737F",
    "--aside-item-icon-color": "#9DA4AE",
    "--aside-item-icon-active-color": "#6366F1",
    "--aside-item-icon-disabled-color": "#6C737F",
    "--aside-item-chevron-color": "#4D5761",
    "--aside-scrollbar-color": "#9DA4AE",
  },
  body: {
    margin: 0,
    padding: 0,
  },
  a: {
    // color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

export default function GlobalStyles() {
  const theme = useTheme();

  return <MuiGlobalStyles styles={converted(theme)} />;
}
