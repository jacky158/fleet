import { Stack } from "@mui/material";
import { useApp } from "@ikx/core";
import { Link } from "@ikx/mui";

export const Middot = () => {
  return <span> - </span>;
};

export default function LinkList() {
  const app = useApp();
  return (
    <Stack direction="row" spacing={2}>
      <Link to="/forgot-password">{app.t("auth.forgot_password_?")}</Link>
      <Link to="/register">{app.t("auth.register_new_account")}</Link>
    </Stack>
  );
}
