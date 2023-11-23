import { MenuItemShape } from "@ikx/types";

const items: MenuItemShape[] = [
  { label: "Dashboard", icon: "\ue202", to: "/" },
  {
    label: "Apps",
    icon: "\ue1bd",
    to: "/account",
    items: [
      { label: "Installed", to: "/" },
      { label: "Uploaded", to: "/" },
      { label: "Purchased", to: "/" },
      { label: "Find more", to: "/" },
    ],
  },
  {
    label: "Appearance",
    icon: "\ue243",
    to: "/account",
    items: [
      { label: "Menus", to: "/" },
      { label: "Pages", to: "/" },
      { label: "Themes", to: "/" },
      { label: "Assets", to: "/" },
    ],
  },
  {
    label: "Members",
    icon: "\uf02e",
    to: "/account",
    items: [
      { label: "Browse", to: "/user" },
      { label: "Permissions", to: "/" },
      { label: "Invitation", to: "/" },
    ],
  },
  {
    label: "Settings",
    icon: "\ue8b8",
    to: "/account",
    items: [
      { label: "Storage", to: "/" },
      { label: "Cache", to: "/" },
      { label: "Mail", to: "/" },
    ],
  },
  {
    label: "Maintenance",
    icon: "\uea3c",
    to: "/",
    items: [
      { label: "Health Check", to: "/health-check" },
      { label: "Backup", to: "/" },
      { label: "Server Info", to: "/" },
      { label: "Report", to: "/" },
      { label: "Schedule", to: "/" },
      { label: "Offline Mode", to: "/" },
    ],
  },
  {
    label: "Localization",
    icon: "\ue894",
    to: "/account",
    items: [
      { label: "Phrases", to: "/health-check" },
      { label: "Languages", to: "/" },
      { label: "Currencies", to: "/" },
    ],
  },
  { label: "Pages", type: "header" },
  {
    label: "Auth",
    icon: "manage_accounts",
    items: [
      { label: "Login", to: "/login" },
      { label: "Register", to: "/register" },
      { label: "Logout", to: "/logout" },
      { label: "Reset Password", to: "/forgot-password" },
    ],
  },
  {
    label: "Error",
    icon: "manage_accounts",
    items: [
      { label: "401", to: "/error/401" },
      { label: "403", to: "/error/403" },
      { label: "404", to: "/error/404" },
      { label: "500", to: "/error/500" },
    ],
  },
  { label: "Techie", type: "header" },
  {
    label: "Nested",
    icon: "manage_accounts",
    items: [
      { label: "Child", to: "/nested/child" },
      { label: "Child 2", to: "/nested/child2" },
    ],
  },
  {
    label: "Customers",
    icon: "dashboard",
    items: [
      { label: "Paging Table", icon: "dashboard", to: "/customer" },
      { label: "Load More", icon: "dashboard", to: "/customer/more" },
      { label: "Scrollable", icon: "dashboard", to: "/customer/more2" },
      {
        label: "Detail",
        icon: "dashboard",
        to: "/customer/view",
        items: [
          { label: "List 1", icon: "dashboard", to: "/customer/view/1" },
          { label: "View 2", icon: "dashboard", to: "/customer/view/2" },
        ],
      },
    ],
  },
];

export default items;
