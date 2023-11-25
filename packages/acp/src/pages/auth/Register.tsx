/**
 * @type: route
 * @name: register
 * @path: /register
 */
import { useApp } from "@ikx/core";
import { Formik } from "@ikx/form-builder";
import { Layout } from "@ikx/jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Password from "@ikx/form-elements/dist/Password";
import Text from "@ikx/form-elements/dist/Text";
import LinkList from "./LinkList";

interface FormValues {
  email: string;
  password: string;
  reenter_password: string;
}

export function Content() {
  const app = useApp();
  const initialValues = {
    email: "",
    password: "",
    reenter_password: "",
  };

  const handleSubmit = () => {};

  return (
    <Formik<FormValues> onSubmit={handleSubmit} initialValues={initialValues}>
      <Paper sx={{ p: 3, width: { sm: 320, md: 400 } }} elevation={10}>
        <Box sx={{ pb: 2 }}>
          <Typography>{app.t("auth.register")}</Typography>
        </Box>
        <Box sx={{ pb: 1 }}>
          <Text
            autoFocus
            fullWidth
            name="email"
            margin="normal"
            autoComplete="current-email"
            InputLabelProps={{ shrink: true }}
            label={app.t("auth.email")}
            placeholder={app.t("auth.enter_your_email")}
          />
          <Password
            fullWidth
            name="password"
            margin="dense"
            autoComplete="current-password"
            InputLabelProps={{ shrink: true }}
            label={app.t("auth.password")}
            placeholder={app.t("auth.enter_your_password")}
          />
        </Box>
        <Box pt={1}>
          <Button variant="contained" fullWidth disableFocusRipple>
            {app.t("auth.register")}
          </Button>
        </Box>
        <LinkList />
      </Paper>
    </Formik>
  );
}

export default function Register() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
