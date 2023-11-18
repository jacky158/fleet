import { useApp } from "@ikx/core";
import { ReactNode } from "react";
import { ViewName } from "@ikx/types";

export function Layout({
  name,
  children,
}: {
  name: ViewName;
  children?: ReactNode;
}) {
  const app = useApp();

  const Component = app.jsx.get(name);

  return <Component>{children}</Component>;
}

export default Layout;
