import { useApp } from "@ikx/core";
import { ReactNode } from "react";
import { ViewName } from "@ikx/types";

export default function Layout({
  name,
  children,
}: {
  name: ViewName;
  children?: ReactNode;
}) {
  const app = useApp();

  const Component = app.jsx.get(name);

  console.log(Component);

  return <Component>{children}</Component>;
}
