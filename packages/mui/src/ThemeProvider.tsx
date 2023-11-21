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
    if (_mode == "light") return _mode;
    if (_mode == "dark") return _mode;
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
