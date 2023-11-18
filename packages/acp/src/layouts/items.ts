import { MenuItemShape } from "@ikx/types";

const items: MenuItemShape[] = [
  { label: "Dashboard", icon: "dashboard", url: "/" },
  { label: "Auth", icon: "manage_accounts", url: "/login" },
  { label: "Analytics", icon: "analytics", url: "/analytics" },
  { label: "E-Commerce", icon: "assessment", url: "/e-commerce" },
  { label: "Account", icon: "dashboard", url: "/account" },
  { label: "Concepts", type: "header" },
  {
    label: "Customers",
    icon: "",
    items: [
      { label: "List", icon: "dashboard", url: "/customer" },
      {
        label: "Detail",
        icon: "dashboard",
        url: "/customer/view",
        items: [
          { label: "List 1", icon: "dashboard", url: "/customer/view/1" },
          { label: "View 2", icon: "dashboard", url: "/customer/view/2" },
        ],
      },
    ],
  },
];

export default items;
