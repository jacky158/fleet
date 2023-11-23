import { useLocation } from "@ikx/router";
import type { MenuItemShape } from "@ikx/types";
import AutoCompactMenu from "./AutoCompactMenu";

const Menu = ({ items }: { items: MenuItemShape[] }) => {
  const location = useLocation();

  if (!items.length) return null;

  // auto collapse menu
  return <AutoCompactMenu items={items} activeTab={location.pathname} />;
};

export default Menu;
