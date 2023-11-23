/**
 * @type: route
 * @name: forgot-password
 * @path: /forgot-password
 */
import { Layout } from "@ikx/jsx";
import { useApp } from "@ikx/core";
import {
  Box,
  Button,
  FormHelperText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import LinkList from "./LinkList";

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
          <Typography variant="h6" component="h1">
            {app.t("auth.reset_password")}
          </Typography>
          <FormHelperText>
            Enter the email address or username you use to sign in.
          </FormHelperText>
        </Box>
        <Box sx={{ pb: 1 }}>
          <TextField
            name="email"
            autoComplete="current-email"
            autoCorrect="off"
            autoCapitalize="off"
            fullWidth
            autoFocus
            tabIndex={0}
            value={formik.values.email}
            label={app.t("auth.email")}
            InputLabelProps={{ shrink: true }}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            placeholder={app.t("auth.enter_your_email_")}
          />
        </Box>
        <Box pt={1}>
          <Button variant="contained" fullWidth disableFocusRipple>
            {app.t("auth.get_password_reset_link")}
          </Button>
        </Box>
        <LinkList />
      </Paper>
    </form>
  );
}

export default function ForgotPassword() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
