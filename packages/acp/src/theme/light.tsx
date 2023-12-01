import { ThemeOptions } from "@mui/material/styles";

const light: ThemeOptions = {
  palette: {
    mode: "light",
    contrastThreshold: 4.5,
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: { marginLeft: 0 },
      },
    },
  },
};

export default light;
