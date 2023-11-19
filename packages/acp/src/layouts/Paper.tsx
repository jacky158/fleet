/**
 * @type: layout
 * @name: layout.paper
 */

import { ReactNode } from "react";
import ScreenCentered from "./ScreenCentered";
import ScreenBg from "./ScreenBg";

export default function PaperLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScreenBg image={"/signin-bg-pattern.webp"} />
      <ScreenCentered children={children} />
    </>
  );
}
