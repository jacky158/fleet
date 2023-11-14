import { AppState } from "./types";
import { createContext } from "react";

export const AppStateContext = createContext<Partial<AppState>>({});

export default AppStateContext;
