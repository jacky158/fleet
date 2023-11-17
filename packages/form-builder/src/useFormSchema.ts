import { useContext } from "react";
import Context from "./Context";

export default function useFormSchema() {
  return useContext(Context);
}
