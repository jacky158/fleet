/**
 * @type: route
 * @name: login
 * @path: /login
 */
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

import { useFormik } from "formik";
import LinkList from "./LinkList";
import { useApp } from "@ikx/core";
import { Layout } from "@ikx/jsx";

interface FormValues {
  email: string;
  password: string;
}

export function Content() {
  const app = useApp();
  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit(values, helpers) {},
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Paper sx={{ p: 3, width: { sm: 320, md: 400 } }} elevation={10}>
        <Box sx={{ pb: 2 }}>
          <Typography>{app.t("auth.login")}</Typography>
        </Box>
        <Box sx={{ pb: 1 }}>
          <TextField
            fullWidth
            autoFocus
            tabIndex={0}
            name="email"
            margin="dense"
            autoComplete="current-email"
            autoCorrect="off"
            autoCapitalize="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            InputLabelProps={{ shrink: true }}
            label={app.t("auth.email")}
            placeholder={app.t("auth.enter_your_email")}
          />
          <TextField
            fullWidth
            type="password"
            name="password"
            autoComplete="current-password"
            margin="normal"
            autoCorrect="off"
            autoCapitalize="off"
            tabIndex={1}
            InputLabelProps={{ shrink: true }}
            value={formik.values.password}
            label={app.t("auth.password")}
            placeholder={app.t("auth.enter_your_password")}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Box>
        <Box>
          <Button variant="contained" fullWidth disableFocusRipple>
            {app.t("auth.login")}
          </Button>
        </Box>
        <LinkList />
      </Paper>
    </form>
  );
}

export default function Login() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
