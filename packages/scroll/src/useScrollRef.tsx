import { useContext } from "react";
import ScrollContext from "./ScrollContext";

export const useScrollRef = () => useContext(ScrollContext);

export default useScrollRef;
