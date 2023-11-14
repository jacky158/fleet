import { useContext } from "react";
import StateContext from "./StateContext";

export const useAppState = () => useContext(StateContext);

export default useAppState;
