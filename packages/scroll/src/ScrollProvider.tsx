import { ReactNode, useRef } from "react";
import ScrollContext from "./ScrollContext";

export default function ScrollProvider({ children }: { children: ReactNode }) {
  const scrollRef = useRef<HTMLElement | null>(null);

  return (
    <ScrollContext.Provider value={scrollRef}>
      {children}
    </ScrollContext.Provider>
  );
}
