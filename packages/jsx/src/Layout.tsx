import { useApp } from "@ikx/core";
import { ViewName } from "@ikx/types";

interface LayoutProps {
  [key: string]: unknown;
  name: ViewName;
  alt?: ViewName;
}

export function Layout({ name, alt, ...props }: LayoutProps) {
  const app = useApp();

  let Component = app.jsx.get(name);

  if (!Component && alt) {
    Component = app.jsx.get(alt);
  }

  return <Component {...props} />;
}

export default Layout;
