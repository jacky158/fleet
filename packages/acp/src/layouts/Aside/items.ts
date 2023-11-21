import { MenuItemShape } from "@ikx/types";

const items: MenuItemShape[] = [
  { label: "Dashboard", icon: "\ue202", href: "/" },
  {
    label: "Apps",
    icon: "\ue1bd",
    href: "/account",
    items: [
      { label: "Installed", href: "/" },
      { label: "Uploaded", href: "/" },
      { label: "Purchased", href: "/" },
      { label: "Find more", href: "/" },
    ],
  },
  {
    label: "Appearance",
    icon: "\ue243",
    href: "/account",
    items: [
      { label: "Menus", href: "/" },
      { label: "Pages", href: "/" },
      { label: "Themes", href: "/" },
      { label: "Assets", href: "/" },
    ],
  },
  {
    label: "Members",
    icon: "\uf02e",
    href: "/account",
    items: [
      { label: "Browse", href: "/" },
      { label: "Permissions", href: "/" },
      { label: "Invitation", href: "/" },
    ],
  },
  {
    label: "Settings",
    icon: "\ue8b8",
    href: "/account",
    items: [
      { label: "Storage", href: "/" },
      { label: "Cache", href: "/" },
      { label: "Mail", href: "/" },
    ],
  },
  {
    label: "Maintenance",
    icon: "\uea3c",
    href: "/",
    items: [
      { label: "Health Check", href: "/health-check" },
      { label: "Backup", href: "/" },
      { label: "Server Info", href: "/" },
      { label: "Report", href: "/" },
      { label: "Schedule", href: "/" },
      { label: "Offline Mode", href: "/" },
    ],
  },
  {
    label: "Localization",
    icon: "\ue894",
    href: "/account",
    items: [
      { label: "Phrases", href: "/health-check" },
      { label: "Languages", href: "/" },
      { label: "Currencies", href: "/" },
    ],
  },
  { label: "Pages", type: "header" },
  {
    label: "Auth",
    icon: "manage_accounts",
    items: [
      { label: "Login", href: "/login" },
      { label: "Register", href: "/register" },
      { label: "Logout", href: "/logout" },
      { label: "Reset Password", href: "/forgot-password" },
    ],
  },
  {
    label: "Error",
    icon: "manage_accounts",
    items: [
      { label: "401", href: "/error/401" },
      { label: "403", href: "/error/403" },
      { label: "404", href: "/error/404" },
      { label: "500", href: "/error/500" },
    ],
  },
  { label: "E-Commerce", icon: "assessment", href: "/e-commerce" },
  {
    label: "Customers",
    icon: "dashboard",
    items: [
      { label: "List", icon: "dashboard", href: "/customer" },
      {
        label: "Detail",
        icon: "dashboard",
        href: "/customer/view",
        items: [
          { label: "List 1", icon: "dashboard", href: "/customer/view/1" },
          { label: "View 2", icon: "dashboard", href: "/customer/view/2" },
        ],
      },
    ],
  },
];

export default items;
