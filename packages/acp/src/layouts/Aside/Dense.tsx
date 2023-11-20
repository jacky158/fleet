import { MenuItemShape } from "@ikx/types";
import { Box, Popover, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import { Link, Link as RouterLink, useLocation } from "@ikx/router";
import items from "../items";
import useMenuActivePath from "../useMenuActivePath";

import Scrollbars from "../../scrollable";
import { MuiIcon } from "@ikx/mui";

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
})(() => ({
  color: "var(--aside-item-color)",
  display: "block",
}));

const SubList = styled("div", {
  name,
  slot: "subList",
  overridesResolver(_, styles) {
    return [styles.itemIcon];
  },
  shouldForwardProp(prop: string) {
    return prop != "root";
  },
})(() => ({
  display: "block",
  padding: "8px",
}));

const Icon = styled("span", {
  name,
  slot: "icon",
  overridesResolver(_, styles) {
    return [styles.icon];
  },
})(() => ({
  fontSize: "1.4em",
  flexGrow: 1,
  textAlign: "center",
}));

const SubIcon = styled("span", {
  name,
  slot: "subIcon",
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
}>(({ flex }) => ({
  //color: "inherit",
  fontSize: "0.9rem",
  fontWeight: 500,
  letterSpacing: 0.2,
  flex,
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

const SubItem = styled(RouterLink, {
  name,
  slot: "subItem",
  overridesResolver(_, styles) {
    return [styles.itemText, styles[`itemLevel${_.level}`]];
  },
  shouldForwardProp(name: string) {
    return name != "selected" && name != "level";
  },
})<{ selected?: boolean; level?: number }>(({ selected, theme, level }) => ({
  flexGrow: 1,
  flex: 1,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  textDecoration: "none",
  minHeight: level ? 36 : 44,
  boxSizing: "border-box",
  borderRadius: 8,
  padding: "0 8px",
  marginBottom: 2,
  fontSize: 16,
  color: theme.palette.text.primary,
  "&:hover": {
    backgroundColor: theme.palette.action.hover,
  },
  ...(selected && {
    backgroundColor: theme.palette.action.selected,
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

  if (level == 0) {
    return (
      <Item
        level={level}
        selected={selectedPath.includes(item._xpath as string)}
        to={item.url as string}
      >
        <MuiIcon name={item.icon} component={Icon} />
        <Text level={level}>{item.label}</Text>
      </Item>
    );
  }

  return (
    <SubItem
      level={level}
      selected={selectedPath.includes(item._xpath as string)}
      to={item.url as string}
    >
      <MuiIcon name={item.icon ?? "home"} component={SubIcon} />
      <Text level={level}>{item.label}</Text>
    </SubItem>
  );
}

interface SubMenuProps {
  item: MenuItemShape;
  items: MenuItemShape[];
  selectedPath: string[];
  level: number;
}

export function SubMenu({ item, selectedPath, items, level }: SubMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);

  return (
    <>
      <Tooltip title={item.label} placement="right" arrow>
        <Item
          level={level}
          onClick={() => setOpen(!open)}
          to="/"
          ref={anchorRef}
        >
          <MuiIcon name={item.icon} component={Icon} />
        </Item>
      </Tooltip>
      <Popover
        disableScrollLock
        disableRestoreFocus
        disablePortal
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <SubList>
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
        </SubList>
      </Popover>
    </>
  );
}

interface ListItemProps {
  item: MenuItemShape;
  selectedPath: string[];
}

function MenuItem({ item, selectedPath }: ListItemProps) {
  if (item.type === "header") {
    return null;
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
    <Tooltip title={item.label} placement="right" arrow>
      <Item
        level={0}
        selected={selectedPath?.includes(item._xpath as string)}
        to={item.url as string}
      >
        <ListItemIcon name={item.icon} />
        {/* <Text level={0}>{item.label}</Text> */}
      </Item>
    </Tooltip>
  );
}

export default function Dense() {
  const { pathname } = useLocation();
  const selected = useMenuActivePath(items, pathname);

  return (
    <>
      <AsideAppBranch />
      <Scrollbars height={400}>
        <List>
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
    </>
  );
}
