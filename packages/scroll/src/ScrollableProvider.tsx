import { ReactNode, RefObject } from "react";
import ScrollContext from "./ScrollContext";

export default function ScrollableProvider({
  children,
  scrollRef,
}: {
  scrollRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  return (
    <ScrollContext.Provider value={scrollRef}>
      {children}
    </ScrollContext.Provider>
  );
}
