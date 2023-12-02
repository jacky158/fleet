import { createContext } from "react";
import { Router } from "./Router";

const Context = createContext<Router>(undefined as unknown as Router);

export default Context;
