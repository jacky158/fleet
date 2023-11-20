import { useContext } from "react";
import LocationContext from "./LocationContext";

export function useLocation() {
  return useContext(LocationContext);
}

export default useLocation;
