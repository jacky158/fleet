/**
 * @type: ui
 * @name: PageHeader
 */

import { MuiIcon, MuiLink } from "@ikx/mui";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
// import { MenuItemShape } from "@ikx/types";
import { Link, useLocation } from "@ikx/router";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import Badge from "@mui/material/Badge";
import { MenuItemShape } from "@ikx/types";
import { Tab, Tabs } from "@mui/material";

export interface PageHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  back?: boolean;
  badge?: ReactNode;
  breadcrumbs?: MenuItemShape[];
  actions?: MenuItemShape[];
  labs?: MenuItemShape[];
}

const name = "PageHeader";

const Title = styled("span", {
  name,
  slot: "Title",
  overridesResolver(_, styles) {
    return [styles.title];
  },
})(({ theme }) => ({
  paddingRight: "1rem",
  fontSize: theme.typography.h5.fontSize,
  fontWeight: 600,
  padding: "0em 0px 0.5em 0px",
}));
const Subtitle = styled("span", {
  name,
  slot: "SubTitle",
  overridesResolver(_, styles) {
    return [styles.subTitle];
  },
})(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9em",
}));
const Back = styled(Button, {
  name,
  slot: "Back",
  overridesResolver(_, styles) {
    return [styles.back];
  },
})({
  width: 32,
  minWidth: 32,
  padding: "0 0 0 0",
  marginRight: "1rem",
});

const Heading = styled("div", {
  name,
  slot: "Heading",
  overridesResolver(_, styles) {
    return [styles.heading];
  },
})({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
const LeftSide = styled("div", {
  name,
  slot: "LeftSide",
  overridesResolver(_, styles) {
    return [styles.leftSide];
  },
})({
  display: "flex",
  flexGrow: 0,
  flexDirection: "column",
});
const RightSide = styled("div", {
  name,
  slot: "RightSide",
  overridesResolver(_, styles) {
    return [styles.rightSide];
  },
})({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "flex-end",
});
const Root = styled(Box, {
  name,
  slot: "Root",
  overridesResolver(_, styles) {
    return [styles.root];
  },
})({
  display: "flex",
  flexDirection: "row",
  padding: "16px",
  fontSize: "1rem",
});

const LabsRoot = styled("div", {
  name,
  slot: "Labs",
  overridesResolver(_, styles) {
    return [styles.labs];
  },
})(({ theme }) => ({
  marginLeft: 16,
  marginRight: 16,
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LabItem = styled("div", {
  name,
  slot: "labItem",
  overridesResolver(_, styles) {
    return [styles.labs];
  },
})<{ selected?: boolean }>(({ selected, theme }) => ({
  minWidth: 72,
  display: "inline-flex",
  lineHeight: 2,
  alignItems: "center",
  justifyContent: "center",
  color: theme.palette.primary.light,
  cursor: "pointer",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
  ":hover": {
    backgroundColor: theme.palette.action.hover,
  },
  ...(selected && {
    color: theme.palette.primary.main,
    background: theme.palette.action.selected,
  }),
}));

function Labs({ labs }: Pick<PageHeaderProps, "labs">) {
  const { pathname } = useLocation();
  const selected = labs?.findIndex((x) => x.to == pathname);

  if (!labs?.length) return null;

  return (
    <>
      <LabsRoot>
        {labs.map((x, index) => (
          <Link
            size="small"
            variant="text"
            selected={index == selected}
            component={LabItem}
            to={x.to}
            key={index.toString()}
            role="button"
          >
            {x.label}
          </Link>
        ))}
      </LabsRoot>
    </>
  );
}

export default function PageHeader(props: PageHeaderProps) {
  const {
    title,
    subtitle,
    back,
    badge,
    actions,
    breadcrumbs,
    labs: tabs,
  } = props;

  return (
    <>
      <Root>
        <LeftSide>
          <Heading>
            {back == true ? (
              <Link
                component={Back}
                sx={{ minWidth: 32, width: 32 }}
                color="inherit"
                disableRipple
                disableFocusRipple
              >
                <MuiIcon name={"arrow_back"} />
              </Link>
            ) : null}
            <Title>{title}</Title>
            {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
            {badge ? <Badge color="error" badgeContent={badge} /> : null}
          </Heading>
          {breadcrumbs?.length ? (
            <Breadcrumbs
              separator="&middot;"
              aria-label="breadcrumb"
              sx={{ fontSize: "0.925em", paddingBottom: 1 }}
            >
              {breadcrumbs.map((x, index) => (
                <MuiLink
                  key={index.toString()}
                  underline="hover"
                  color="inherit"
                  to={x.to}
                  children={x.label}
                />
              ))}
            </Breadcrumbs>
          ) : null}
        </LeftSide>
        {actions?.length ? (
          <RightSide>
            {actions.map((x, index) => {
              return (
                <Button component={Link} to={x.to} key={index.toString()}>
                  {x.label}
                </Button>
              );
            })}
          </RightSide>
        ) : null}
      </Root>
      {tabs ? <Labs labs={tabs} /> : null}
    </>
  );
}
