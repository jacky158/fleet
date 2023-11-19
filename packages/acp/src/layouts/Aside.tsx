import { MenuItemShape } from "@ikx/types";
import { Box, Collapse, Drawer, DrawerProps, Typography } from "@mui/material";
import { useState } from "react";
import items from "./items";
import useMenuActivePath from "./useMenuActivePath";
import { MuiIcon } from "@ikx/mui";
import { Link, Link as RouterLink, useLocation } from "react-router-dom";
import { styled } from "@mui/material/styles";

import Scrollbars from "../scrollable";

const name = "Aside";
const seem = 32;

const List = styled("div", {
  name,
  slot: "list",
  overridesResolver(_, styles) {
    return [styles.itemIcon];
  },
  shouldForwardProp(prop: string) {
    return prop != "root";
  },
})<{ root?: boolean }>(({ theme, root }) => ({
  color: "var(--aside-item-color)",
  display: "block",
  padding: root ? theme.spacing(1, 1, 25, 2) : theme.spacing(0),
}));

const Icon = styled("span", {
  name,
  slot: "ItemIcon",
  overridesResolver(_, styles) {
    return [styles.itemIcon];
  },
})(() => ({
  width: 28,
  fontSize: "1.2em",
}));

const ItemHeader = styled("div", {
  name,
  slot: "itemHeader",
  overridesResolver(_, styles) {
    return [styles.itemHeader];
  },
})({
  fontSize: "0.8em",
  fontWeight: 700,
  textTransform: "uppercase",
  padding: "24px 16px 1em",
});

const Text = styled("span", {
  name,
  slot: "itemText",
  overridesResolver(_, styles) {
    return [styles.itemText, styles[`itemTextLevel${_.level}`]];
  },
  shouldForwardProp(name: string) {
    return name != "level" && name != "flex";
  },
})<{
  level: number;
  flex?: number;
}>(({ level, flex }) => ({
  //color: "inherit",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: 0.2,
  flex,
  ...(level == 0 && {
    lineHeight: 1.6,
  }),
  ...(level == 1 && {
    textIndent: seem,
    fontSize: "0.8rem",
  }),
  ...(level == 2 && {
    textIndent: seem,
    fontSize: "0.8rem",
  }),
  ...(level == 3 && {
    textIndent: seem + 12,
    fontSize: "0.8rem",
  }),
}));

const Item = styled(RouterLink, {
  name,
  slot: "item",
  overridesResolver(_, styles) {
    return [styles.itemText, styles[`itemLevel${_.level}`]];
  },
  shouldForwardProp(name: string) {
    return name != "selected" && name != "level";
  },
})<{ selected?: boolean; level?: number }>(({ selected, level }) => ({
  flexGrow: 1,
  flex: 1,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  textDecoration: "none",
  minHeight: level ? 36 : 44,
  boxSizing: "border-box",
  borderRadius: 8,
  padding: "0 8px 0 12px",
  marginBottom: 2,
  fontSize: 16,
  color: "var(--aside-item-color)",
  "&:hover": {
    backgroundColor: "var(--aside-item-hover-bg)",
  },
  ...(selected && {
    color: "var(--aside-item-active-color)",
    backgroundColor: "var(--aside-item-active-bg)",
  }),
}));

const BranchLogo = styled(Link)({
  height: 64,
  minHeight: 64,
  paddingLeft: 24,
  cursor: "pointer",
  boxSizing: "border-box",
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
});

function AsideAppBranch() {
  return (
    <>
      <BranchLogo to="/">
        <img src="/logo.png" height="32" />
      </BranchLogo>
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
    </>
  );
}

function ListItemIcon({ name }: { name?: string }) {
  return <Icon className="material-symbols-outlined">{name ?? null}</Icon>;
}

const ItemDivider = styled("div", {
  name,
  slot: "itemDivider",
  overridesResolver(_, styles) {
    return [styles.itemDivider];
  },
})({
  height: 1,
  margin: "0 28px 12px",
  borderBottom: "1px solid rgba(0,0,0,0.1)",
});

const Expand = styled("span", {
  name,
  slot: "expand",
  overridesResolver(_, styles) {
    return [styles.expand, _.open ? styles.expanded : undefined];
  },
  shouldForwardProp(propName) {
    return propName != "open";
  },
})<{ open: boolean }>(({ open }) => ({
  fontSize: "small",
  transform: "rotate(0)",
  transitionDuration: "300ms",
  transformOrigin: "center",
  ...(open && {
    transform: "rotate(90deg)",
  }),
  "& .icon": {
    fontSize: 16,
  },
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
    <Item
      level={level}
      selected={selectedPath.includes(item._xpath as string)}
      to={item.url as string}
    >
      <Text level={level}>{item.label}</Text>
    </Item>
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
      <Item level={level} onClick={() => setOpen(!open)} to="/">
        {level == 0 ? <ListItemIcon name={item.icon} /> : null}
        <Text flex={1} level={level}>
          {item.label}
        </Text>
        <Expand open={open}>
          <MuiIcon name="keyboard_arrow_right" />
        </Expand>
      </Item>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List>
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
    <Item
      level={0}
      selected={selectedPath?.includes(item._xpath as string)}
      to={item.url as string}
    >
      <ListItemIcon name={item.icon} />
      <Text level={0}>{item.label}</Text>
    </Item>
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
          background: "var(--aside-bg)",
          color: "var(--aside-item-color)",
          boxSizing: "border-box",
        },
      }}
    >
      <AsideAppBranch />
      <Scrollbars height={400}>
        <List root>
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
      </Scrollbars>
    </Drawer>
  );
}
