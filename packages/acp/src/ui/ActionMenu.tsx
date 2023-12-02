import { useLocation } from "@ikx/route";
import type { MenuItemShape } from "@ikx/types";
import StreetMenu from "./StreetMenu";

const Menu = ({ items }: { items: MenuItemShape[] }) => {
  const location = useLocation();

  if (!items.length) return null;

  // auto collapse menu
  return <StreetMenu items={items} activeTab={location.pathname} />;
};

export default Menu;
