/**
 * @type: route
 * @name: register
 * @path: /register
 */
import { useApp } from "@ikx/core";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import LinkList from "./LinkList";
import { Layout } from "@ikx/jsx";

interface FormValues {
  email: string;
  password: string;
  reenter_password: string;
}

export function Content() {
  const app = useApp();
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      reenter_password: "",
    },
    onSubmit(values, helpers) {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper sx={{ p: 3, width: { sm: 320, md: 400 } }} elevation={10}>
        <Box sx={{ pb: 2 }}>
          <Typography>{app.t("auth.register")}</Typography>
        </Box>
        <Box sx={{ pb: 1 }}>
          <TextField
            name="email"
            autoComplete="current-email"
            fullWidth
            autoCorrect="off"
            autoCapitalize="off"
            autoFocus
            tabIndex={0}
            value={formik.values.email}
            label={app.t("auth.email")}
            InputLabelProps={{ shrink: true }}
            placeholder={app.t("auth.enter_your_email")}
          />
          <TextField
            name="password"
            autoComplete="current-password"
            fullWidth
            margin="normal"
            autoCorrect="off"
            autoCapitalize="off"
            tabIndex={1}
            InputLabelProps={{ shrink: true }}
            value={formik.values.password}
            label={app.t("auth.password")}
            placeholder={app.t("auth.enter_your_password")}
          />
        </Box>
        <Box>
          <Button variant="contained" fullWidth disableFocusRipple>
            {app.t("auth.register")}
          </Button>
        </Box>
        <Box
          sx={{
            pt: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <LinkList />
        </Box>
      </Paper>
    </form>
  );
}

export default function Register() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
