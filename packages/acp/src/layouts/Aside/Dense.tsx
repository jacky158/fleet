import { Link, useLocation } from "@ikx/router";
import { MenuItemShape } from "@ikx/types";
import { Box, Collapse, Popover, Tooltip, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useRef, useState } from "react";
import useMenuActivePath from "../useMenuActivePath";
import items from "./items";

import { MuiIcon } from "@ikx/mui";
import Scrollbars from "../../scrollable";

const name = "Aside";

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

const MainLink = styled(Link, {
  name,
  slot: "item",
  overridesResolver(_, styles) {
    return [styles.itemText, styles[`itemLevel${_.level}`]];
  },
  shouldForwardProp(name: string) {
    return name != "selected" && name != "level";
  },
})<{ selected?: boolean }>(({ selected }) => ({
  flexGrow: 1,
  flex: 1,
  display: "flex",
  justifyItems: "center",
  alignItems: "center",
  textDecoration: "none",
  minHeight: 44,
  height: 44,
  boxSizing: "border-box",
  padding: "0 8px 0 12px",
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

const SubItem = styled(Link, {
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
  cursor: "pointer",
  boxSizing: "border-box",
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "center",
  borderBottom: "1px solid var(--aside-item-active-)",
});

function AsideAppBranch() {
  return (
    <>
      <BranchLogo to="/">
        <img src="/favicon.ico" height="32" />
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
      <InterMenu
        level={level + 1}
        item={item}
        items={item.items}
        selectedPath={selectedPath}
      />
    );
  }

  if (level == 0) {
    return (
      <MainLink
        selected={selectedPath.includes(item._xpath as string)}
        to={item.url as string}
      >
        <MuiIcon name={item.icon ?? "home"} component={Icon} />
        <Text level={level}>{item.label}</Text>
      </MainLink>
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

export function InterMenu({ item, selectedPath, items, level }: SubMenuProps) {
  const [open, setOpen] = useState<boolean>(
    selectedPath.includes(item._xpath as string)
  );

  return (
    <>
      <SubItem onClick={() => setOpen(!open)}>
        <MuiIcon component={SubIcon} name={item.icon ?? "Home"} />
        <Text flex={1} level={level}>
          {item.label}
        </Text>
        <Expand open={open}>
          <MuiIcon name="keyboard_arrow_right" />
        </Expand>
      </SubItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
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
      </Collapse>
    </>
  );
}

interface SubMenuProps {
  item: MenuItemShape;
  items: MenuItemShape[];
  selectedPath: string[];
  level: number;
}

export function SecondMenu({ item, selectedPath, items, level }: SubMenuProps) {
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = useRef(null);

  return (
    <>
      <Tooltip title={item.label} placement="right" arrow>
        <MainLink onClick={() => setOpen(!open)} ref={anchorRef}>
          <MuiIcon name={item.icon} component={Icon} />
        </MainLink>
      </Tooltip>
      <Popover
        disableScrollLock
        disableRestoreFocus
        disablePortal
        open={open}
        anchorEl={anchorRef.current}
        onClose={() => setOpen(false)}
        slotProps={{ paper: { sx: { minWidth: 180 } } }}
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

function RootItem({ item, selectedPath }: ListItemProps) {
  if (item.type === "header") {
    return null;
  }
  if (item.type == "divider") {
    return <ItemDivider />;
  }

  if (item.items?.length) {
    return (
      <SecondMenu
        level={0}
        item={item}
        items={item.items}
        selectedPath={selectedPath}
      />
    );
  }

  return (
    <Tooltip title={item.label} placement="right" arrow>
      <MainLink
        selected={selectedPath?.includes(item._xpath as string)}
        to={item.url as string}
      >
        <MuiIcon component={Icon} name={item.icon} />
        {/* <Text level={0}>{item.label}</Text> */}
      </MainLink>
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
              <RootItem
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
