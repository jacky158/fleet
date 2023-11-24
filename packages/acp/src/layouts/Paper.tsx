/**
 * @type: layout
 * @name: paper
 */

import { ReactNode } from "react";
import ScreenCentered from "./ScreenCentered";
import ScreenBg from "./ScreenBg";

export default function PaperLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScreenBg bgImg={"/signin-bg-pattern.webp"} />
      <ScreenCentered children={children} />
    </>
  );
}
