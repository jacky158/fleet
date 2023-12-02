import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useApp, useConfig } from "@ikx/core";
import type { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import useMediaQuery from "@mui/material/useMediaQuery";
import createTheme from "@mui/material/styles/createTheme";
import { ReactNode, useMemo } from "react";
import rtlPlugin from "stylis-plugin-rtl";

// right to left language code.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
// const RTL_LANG_CODE = [
//   "ar",
//   "arc",
//   "dv",
//   "fa",
//   "ha",
//   "he",
//   "khw",
//   "ks",
//   "ku",
//   "ps",
//   "ur",
//   "yi",
// ];

export default function ThemeProvider({
  children,
  mode: _mode,
  direction = "ltr",
}: {
  mode?: "dark" | "light" | "auto";
  direction?: ThemeOptions["direction"];
  children: ReactNode;
}) {
  const cache = useMemo(() => {
    return createCache({
      key: direction ?? "ltr",
      stylisPlugins: direction == "rtl" ? [rtlPlugin] : [],
    });
  }, [direction]);
  const app = useApp();

  const _userMode = app.cookies.get("theme.mode");
  const _configMode = useConfig<"dark" | "light">("theme.mode");
  const _browserMode = useMediaQuery("(prefers-color-scheme: dark)");

  const mode: PaletteMode = useMemo(() => {
    const verify = _mode ?? _userMode ?? _configMode;

    if (verify == "light" || verify == "dark") {
      return verify as PaletteMode;
    }

    return _browserMode ? "dark" : "light";
  }, [_mode, _configMode, _userMode, _browserMode]);

  // console.log({ _mode, _userMode, _configMode, mode });

  let options = app.config<ThemeOptions>(`theme.${mode}`, {});
  if (!options) {
    options = {};
  }
  if (!options.palette) {
    options.palette = {};
  }
  options.direction = direction;
  options.palette.mode = mode;

  const theme = createTheme(options as ThemeOptions);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
}
