import AppContext from "./AppContext";
import { AppManager } from "./types";
import { ReactNode } from "react";

export default function AppProvider({
  children,
  app,
}: {
  children: ReactNode;
  app: AppManager;
}) {
  return <AppContext.Provider value={app}>{children}</AppContext.Provider>;
}
