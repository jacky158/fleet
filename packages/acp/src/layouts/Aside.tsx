import {
  Box,
  Collapse,
  Divider,
  Drawer,
  List,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
import items from "./items";
import { MenuItemShape } from "@ikx/types";
import useActiveMenuUrl from "./useActiveMenu";

const ItemIcon = styled("span")(() => ({
  width: 28,
  fontSize: "1.15em",
}));

const ItemHeader = styled("li")({
  color: "var(--aside-item-color)",
  fontSize: "0.8em",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "1em 16px 1em",
});

const ItemText = styled("span")<{
  level?: number;
  flex?: number;
}>(({ level, flex }) => ({
  color: "var(--aside-item-color)",
  fontSize: "0.85em",
  fontWeight: 600,
  flex,
  ...(!level && {}),
  ...(level == 1 && {
    textIndent: "28px",
  }),
}));

function AsideAppBranch() {
  return (
    <>
      <Box sx={{ px: 2.5, pt: 2, cursor: "pointer" }}>
        <a href="/">
          <img src="/logo.png" height="32" />
        </a>
      </Box>
      <Box sx={{ display: "none" }}>
        <Typography
          variant="h6"
          component="a"
          href="/"
          color="primary"
          sx={{ cursor: "pointer" }}
        >
          phpFox
        </Typography>
      </Box>
      <Divider sx={{ bg: "var(--aside-item-color)" }} />
    </>
  );
}

export function MaterialIcon({ name }: { name?: string }) {
  return <span className="material-symbols-outlined">{name ?? null}</span>;
}

function ListItemIcon({ name }: { name?: string }) {
  return (
    <ItemIcon className="material-symbols-outlined">{name ?? null}</ItemIcon>
  );
}

export function ItemDivider() {
  return <Divider />;
}

const Animate90Deg = styled("span", {
  shouldForwardProp(propName) {
    return propName != "open";
  },
})<{ open: boolean }>(({ open }) => ({
  transform: "rotate(0)",
  transitionDuration: "300ms",
  transformOrigin: "center",
  ...(open && {
    transform: "rotate(90deg)",
  }),
}));

export interface SubMenuItemProps {
  item: MenuItemShape;
  activeUrl?: string;
}

function SubMenuItem({ item, activeUrl }: SubMenuItemProps) {
  if (item.type === "header") {
    return null;
  }
  if (item.type == "divider") {
    return <ItemDivider />;
  }
  return (
    <ListItemButton
      selected={activeUrl == item.url}
      component={RouterLink}
      to={item.url as string}
      sx={{ color: "var(--aside-item-color)" }}
    >
      <ItemText level={1}>{item.label}</ItemText>
    </ListItemButton>
  );
}

interface SubMenuProps {
  item: MenuItemShape;
  children: MenuItemShape[];
  activeUrl?: string;
}

export function SubMenu({ item, activeUrl, children }: SubMenuProps) {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        <ListItemIcon name="home" />
        <ItemText flex={1}>{item.label}</ItemText>
        <Animate90Deg open={open}>
          <MaterialIcon name="keyboard_arrow_right" />
        </Animate90Deg>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ fontSize: "0.9em", paddingTop: 0 }}>
          {children.map((item, index) => {
            return (
              <SubMenuItem
                item={item}
                key={index.toString()}
                activeUrl={activeUrl}
              />
            );
          })}
        </List>
      </Collapse>
    </>
  );
}

interface ListItemProps {
  item: MenuItemShape;
  activeUrl?: string;
}

function MenuItem({ item, activeUrl }: ListItemProps) {
  if (item.type === "header") {
    return <ItemHeader>{item.label}</ItemHeader>;
  }
  if (item.type == "divider") {
    return <ItemDivider />;
  }

  if (item.items?.length) {
    return <SubMenu item={item} children={item.items} activeUrl={activeUrl} />;
  }

  return (
    <ListItemButton
      selected={item.url == activeUrl}
      component={RouterLink}
      to={item.url as string}
      sx={{ color: "var(--aside-item-color)" }}
    >
      <ListItemIcon name={item.icon} />
      <ItemText level={0}>{item.label}</ItemText>
    </ListItemButton>
  );
}

export default function Aside() {
  const { pathname } = useLocation();
  const activeUrl = useActiveMenuUrl(items, pathname);

  console.log({ activeUrl });

  return (
    <Drawer
      anchor="left"
      variant="permanent"
      PaperProps={{
        sx: {
          width: "var(--aside-width)",
          top: "var(--header-height)",
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
        },
      }}
    >
      <AsideAppBranch />
      <List sx={{ py: 3 }}>
        {items.map((item, index) => {
          return (
            <MenuItem
              activeUrl={activeUrl}
              item={item}
              key={index.toString()}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
