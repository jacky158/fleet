/**
 * @type: route
 * @name: login
 * @path: /login
 */
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useApp } from "@ikx/core";
import { Formik } from "@ikx/form-builder";
import { Layout } from "@ikx/jsx";
import SubmitButton from "@ikx/form-elements/dist/SubmitButton";
import Password from "@ikx/form-elements/dist/Password";
import Text from "@ikx/form-elements/dist/Text";
import LinkList from "./LinkList";

interface FormValues {
  email: string;
  password: string;
}

export function Content() {
  const app = useApp();
  const initialValues = {
    email: "",
    password: "",
  };

  const onSubmit = () => {};

  return (
    <Formik<FormValues> onSubmit={onSubmit} initialValues={initialValues}>
      <Paper sx={{ p: 3, width: { sm: 320, md: 400 } }} elevation={10}>
        <Box sx={{ pb: 2 }}>
          <Typography>{app.t("auth.login")}</Typography>
        </Box>
        <Box sx={{ pb: 1 }}>
          <Text
            fullWidth
            autoFocus
            tabIndex={0}
            name="email"
            margin="dense"
            autoComplete="current-email"
            autoCorrect="off"
            autoCapitalize="off"
            InputLabelProps={{ shrink: true }}
            label={app.t("auth.email")}
            placeholder={app.t("auth.enter_your_email")}
          />
          <Password
            fullWidth
            name="password"
            autoComplete="current-password"
            margin="normal"
            autoCorrect="off"
            autoCapitalize="off"
            tabIndex={1}
            InputLabelProps={{ shrink: true }}
            label={app.t("auth.password")}
            placeholder={app.t("auth.enter_your_password")}
          />
        </Box>
        <Box>
          <SubmitButton fullWidth disableFocusRipple>
            {app.t("auth.login")}
          </SubmitButton>
        </Box>
        <LinkList />
      </Paper>
    </Formik>
  );
}

export default function Login() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
