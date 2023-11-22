import { RefObject, createContext } from "react";

const ScrollContext = createContext<RefObject<HTMLElement | null>>(
  undefined as unknown as RefObject<HTMLElement | null>
);

export default ScrollContext;
