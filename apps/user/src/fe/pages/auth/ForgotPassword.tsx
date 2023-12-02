/**
 * @type: route
 * @name: forgot-password
 * @path: /forgot-password
 */
import { useApp } from "@ikx/core";
import Text from "@ikx/form-elements/dist/Text";
import { Layout } from "@ikx/jsx";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import LinkList from "./LinkList";
import { Formik } from "@ikx/form-builder";

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
          <Typography variant="h6" component="h1">
            {app.t("auth.reset_password")}
          </Typography>
          <FormHelperText>
            Enter the email address or username you use to sign in.
          </FormHelperText>
        </Box>
        <Box sx={{ pb: 1 }}>
          <Text
            name="email"
            autoComplete="current-email"
            autoCorrect="off"
            autoCapitalize="off"
            fullWidth
            autoFocus
            tabIndex={0}
            label={app.t("auth.email")}
            InputLabelProps={{ shrink: true }}
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
    </Formik>
  );
}

export default function ForgotPassword() {
  return (
    <Layout name="layout.paper">
      <Content />
    </Layout>
  );
}
