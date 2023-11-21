import { Stack } from "@mui/material";
import { useApp } from "@ikx/core";
import { Link } from "@ikx/mui";

export const Middot = () => {
  return <span> - </span>;
};

export default function LinkList() {
  const app = useApp();
  return (
    <Stack direction="row" spacing={2} pt={3} flexGrow={1}>
      <Link to="/forgot-password" color="inherit" underline="hover">
        {app.t("auth.forgot_password_?")}
      </Link>
      <Link variant="text" to="/register" color="inherit" underline="hover">
        {app.t("auth.register_new_account")}
      </Link>
    </Stack>
  );
}
