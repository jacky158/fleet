/**
 * @type: menu.items
 * @name: user
 */
import { MenuItemShape } from "@ikx/types";

const items: MenuItemShape[] = [
  {
    label: "Promote",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/promote",
  },
  {
    label: "Verify",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/verify",
  },
  {
    label: "Send Verification Email",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/sendVerificationEmail",
  },
  {
    label: "Edit",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/edit",
  },
  {
    label: "Delete",
    scope: { loc: ["list"], resource: ["user"] },
    color: "error",
    to: "@user/deleteManyUser",
  },
  {
    label: "Delete",
    scope: { loc: ["item"], resource: ["user"] },
    color: "error",
    to: "@user/deleteUser",
  },
  {
    label: "Ban",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/ban",
  },
  {
    label: "Un-Ban",
    scope: { loc: ["list", "item"], resource: ["user"] },
    to: "@user/UnBan",
  },
];

export default items;
