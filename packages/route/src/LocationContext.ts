import { createContext } from "react";
import { LocationShape } from "./types";

export const LocationContext = createContext<LocationShape>({
  key: "i0",
  pathname: "/",
  query: {},
  state: {},
});

export default LocationContext;
