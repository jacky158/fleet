import { AppState } from "./types";
import { createContext } from "react";

export const ConfigContext = createContext<Partial<AppState>>({});

export default ConfigContext;
