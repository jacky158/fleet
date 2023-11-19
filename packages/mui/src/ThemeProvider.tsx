import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { PaletteMode } from "@mui/material";
import { ThemeOptions } from "@mui/material/styles";
import MuiThemeProvider from "@mui/material/styles/ThemeProvider";
import createTheme from "@mui/material/styles/createTheme";
import { ReactNode, useMemo } from "react";
import rtlPlugin from "stylis-plugin-rtl";

const _themeOptions: Record<"light" | "dark", ThemeOptions> = {
  dark: {
    palette: {
      mode: "dark",
    },
  },
  light: {
    palette: {
      mode: "light",
    },
  },
};

export default function ThemeProvider({
  children,
  mode: _mode = "light",
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

  const mode: PaletteMode = useMemo(() => {
    if (_mode) return "light";
    if (_mode == "auto") {
      return "light";
    }
    return _mode;
  }, [_mode]);

  const themeOptions = _themeOptions[mode];

  if (!themeOptions.palette) {
    themeOptions.palette = {};
  }
  themeOptions.direction = direction;
  themeOptions.palette.mode = mode;

  const theme = createTheme(themeOptions as ThemeOptions);

  return (
    <CacheProvider value={cache}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </CacheProvider>
  );
}
