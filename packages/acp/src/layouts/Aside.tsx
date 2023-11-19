import { MenuItemShape } from "@ikx/types";
import {
  Box,
  Collapse,
  Divider,
  Drawer,
  DrawerProps,
  List,
  ListItemButton,
  Typography,
  styled,
} from "@mui/material";
import { useState } from "react";
import items from "./items";
import useMenuActivePath from "./useMenuActivePath";
import { Link, MuiIcon } from "@ikx/mui";
import { useLocation } from "react-router-dom";

const ItemIcon = styled("span")(() => ({
  width: 28,
  fontSize: "1.15em",
}));

const ItemHeader = styled("li")({
  color: "var(--aside-item-color)",
  fontSize: "0.8em",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "24px 16px 1em",
});

const ItemText = styled("span")<{
  level: number;
  flex?: number;
}>(({ level, flex }) => ({
  color: "var(--aside-item-color)",
  fontSize: "0.85rem",
  fontWeight: 600,
  flex,
  ...(level == 0 && {
    lineHeight: 1.6,
  }),
  ...(level == 1 && {
    textIndent: 28,
  }),
  ...(level == 2 && {
    textIndent: 28,
  }),
  ...(level == 3 && {
    textIndent: 28 + 12,
  }),
}));

function AsideAppBranch() {
  return (
    <>
      <Box sx={{ px: 3.5, pt: 3, cursor: "pointer" }}>
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
  level: number;
  selectedPath: string[];
}

function SubMenuItem({ item, selectedPath, level }: SubMenuItemProps) {
  if (item.type === "header") {
    return null;
  }
  if (item.type == "divider") {
    return <ItemDivider />;
  }

  if (item.items?.length) {
    return (
      <SubMenu
        level={level + 1}
        item={item}
        items={item.items}
        selectedPath={selectedPath}
      />
    );
  }

  return (
    <ListItemButton
      selected={selectedPath.includes(item._xpath as string)}
      component={Link}
      to={item.url as string}
      sx={{ color: "var(--aside-item-color)" }}
    >
      <ItemText level={level}>{item.label}</ItemText>
    </ListItemButton>
  );
}

interface SubMenuProps {
  item: MenuItemShape;
  items: MenuItemShape[];
  selectedPath: string[];
  level: number;
}

export function SubMenu({ item, selectedPath, items, level }: SubMenuProps) {
  const [open, setOpen] = useState<boolean>(
    selectedPath.includes(item._xpath as string)
  );

  return (
    <>
      <ListItemButton onClick={() => setOpen(!open)}>
        {level == 0 ? <ListItemIcon name={item.icon} /> : null}
        <ItemText flex={1} level={level}>
          {item.label}
        </ItemText>
        <Animate90Deg open={open}>
          <MuiIcon name="keyboard_arrow_right" />
        </Animate90Deg>
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ fontSize: "0.9em", paddingTop: 0 }}>
          {items.map((x, index) => {
            return (
              <SubMenuItem
                item={x}
                level={level + 1}
                key={index.toString()}
                selectedPath={selectedPath}
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
  selectedPath: string[];
}

function MenuItem({ item, selectedPath }: ListItemProps) {
  if (item.type === "header") {
    return <ItemHeader>{item.label}</ItemHeader>;
  }
  if (item.type == "divider") {
    return <ItemDivider />;
  }

  if (item.items?.length) {
    return (
      <SubMenu
        level={0}
        item={item}
        items={item.items}
        selectedPath={selectedPath}
      />
    );
  }

  return (
    <ListItemButton
      selected={selectedPath?.includes(item._xpath as string)}
      component={Link}
      to={item.url as string}
      sx={{ color: "var(--aside-item-color)" }}
    >
      <ListItemIcon name={item.icon} />
      <ItemText level={0}>{item.label}</ItemText>
    </ListItemButton>
  );
}

export default function Aside({
  variant,
  onClose,
  open,
}: Pick<DrawerProps, "variant" | "open" | "onClose">) {
  const { pathname } = useLocation();
  const selected = useMenuActivePath(items, pathname);

  return (
    <Drawer
      anchor="left"
      variant={variant}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: "var(--aside-width)",
          // top: "var(--header-height)",
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
        },
      }}
    >
      <AsideAppBranch />
      <List sx={{ py: 3, px: 1.5 }}>
        {items.map((item, index) => {
          return (
            <MenuItem
              selectedPath={selected}
              item={item}
              key={index.toString()}
            />
          );
        })}
      </List>
    </Drawer>
  );
}
