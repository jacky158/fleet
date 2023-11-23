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

const _themeOptions: Record<"light" | "dark", ThemeOptions> = {
  dark: {
    palette: {
      mode: "dark",
    },
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            textTransform: "none",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          outlined: {
            position: "relative",
            transform: "none",
            fontSize: "0.9em",
            lineHeight: 1.5,
            paddingBottom: "0.5em",
            fontWeight: "medium",
            color: "text",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          size: "small",
          margin: "dense",
        },
      },
      MuiFormLabel: {
        styleOverrides: {
          root: {},
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          notchedOutline: {
            "& legend": {
              display: "none",
            },
          },
        },
      },
    },
  },
  light: {
    palette: {
      mode: "light",
      contrastThreshold: 4.5,
    },
  },
};

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
