import { MenuItemShape } from "@ikx/types";

const items: MenuItemShape[] = [
  { label: "Dashboard", icon: "\ue202", url: "/" },
  {
    label: "Apps",
    icon: "\ue1bd",
    url: "/account",
    items: [
      { label: "Installed", url: "/" },
      { label: "Uploaded", url: "/" },
      { label: "Purchased", url: "/" },
      { label: "Find more", url: "/" },
    ],
  },
  {
    label: "Appearance",
    icon: "\ue243",
    url: "/account",
    items: [
      { label: "Menus", url: "/" },
      { label: "Pages", url: "/" },
      { label: "Themes", url: "/" },
      { label: "Assets", url: "/" },
    ],
  },
  {
    label: "Members",
    icon: "\uf02e",
    url: "/account",
    items: [
      { label: "Browse", url: "/" },
      { label: "Permissions", url: "/" },
      { label: "Invitation", url: "/" },
    ],
  },
  {
    label: "Settings",
    icon: "\ue8b8",
    url: "/account",
    items: [
      { label: "Storage", url: "/" },
      { label: "Cache", url: "/" },
      { label: "Mail", url: "/" },
    ],
  },
  {
    label: "Maintenance",
    icon: "\uea3c",
    url: "/",
    items: [
      { label: "Health Check", url: "/health-check" },
      { label: "Backup", url: "/" },
      { label: "Server Info", url: "/" },
      { label: "Report", url: "/" },
      { label: "Schedule", url: "/" },
      { label: "Offline Mode", url: "/" },
    ],
  },
  {
    label: "Localization",
    icon: "\ue894",
    url: "/account",
    items: [
      { label: "Phrases", url: "/health-check" },
      { label: "Languages", url: "/" },
      { label: "Currencies", url: "/" },
    ],
  },
  { label: "Pages", type: "header" },
  {
    label: "Auth",
    icon: "manage_accounts",
    items: [
      { label: "Login", url: "/login" },
      { label: "Register", url: "/register" },
      { label: "Logout", url: "/logout" },
      { label: "Reset Password", url: "/forgot-password" },
    ],
  },
  { label: "Analytics", icon: "analytics", url: "/analytics" },
  { label: "E-Commerce", icon: "assessment", url: "/e-commerce" },
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
