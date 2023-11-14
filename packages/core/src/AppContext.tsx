import { AppManager } from "./types";
import { createContext } from "react";

const AppContext = createContext<AppManager>({} as unknown as AppManager);

export default AppContext;
