import { Link as RouterLink } from "react-router-dom";
import { Link, Stack } from "@mui/material";
import useApp from "@ikx/app";

export const Middot = () => {
  return <span> - </span>;
};

export default function LinkList() {
  const app = useApp();
  return (
    <Stack direction="row" spacing={2} divider={<Middot />}>
      <Link component={RouterLink} to="/forgot-password">
        {app.intl.formatMessage({ id: "auth.forgot_password_?" })}
      </Link>
      <Link component={RouterLink} to="/register">
        {app.intl.formatMessage({ id: "auth.register_new_account" })}
      </Link>
    </Stack>
  );
}
