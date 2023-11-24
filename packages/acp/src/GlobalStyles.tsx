import { useTheme, Theme, lighten } from "@mui/material/styles";
import MuiGlobalStyles from "@mui/material/GlobalStyles";

const converted = (theme: Theme) => ({
  ".srOnly": { display: "none", visibility: "hidden" },
  ".srInvisible": { visibility: "invisible" },
  ".tableRowEven": {}, // for mui table
  ".tableRowOdd": { background: lighten(theme.palette.action.hover, 0.7) }, // for mui table
  ".srTransparent": { opacity: 0, transition: "opacity 250ms" },
  ":root": {
    fontFamily:
      'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
    colorScheme: "light",
    textRendering: "optimizeLegibility",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    WebkitTextSizeAdjust: "100%",
    margin: 0,
    padding: 0,
    "--primary-main": theme.palette.primary.main,
    "--aside-width": "280px",
    "--aside-dense-width": "64px",
    "--aside-bg": "#1C2536",
    "--aside-color": "#fff",
    "--aside-border-color": "transparent",
    "--aside-logo-border": "#2F3746",
    "--aside-section-title-color": "#9DA4AE",
    "--aside-item-color": "#9da5b0",
    "--aside-item-hover-bg": "rgba(255, 255, 255, 0.1)",
    "--aside-item-active-bg": "rgba(255, 255, 255, 0.15)",
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
  ".noScrollBar": {
    msOverflowStyle: "none",
    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },
  },
  a: {
    // color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      // textDecoration: "underline",
    },
  },
});

export default function GlobalStyles() {
  const theme = useTheme();

  return <MuiGlobalStyles styles={converted(theme)} />;
}
