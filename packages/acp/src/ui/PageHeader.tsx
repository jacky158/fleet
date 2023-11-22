/**
 * @type: ui
 * @name: PageHeader
 */

import { MuiIcon, MuiLink } from "@ikx/mui";
import Box from "@mui/material/Box";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { styled } from "@mui/material/styles";
// import { MenuItemShape } from "@ikx/types";
import { Link } from "@ikx/router";
import Button from "@mui/material/Button";
import { ReactNode } from "react";
import Badge from "@mui/material/Badge";
import { MenuItemShape } from "@ikx/types";

export interface PageHeaderProps {
  title?: ReactNode;
  subtitle?: ReactNode;
  back?: boolean;
  badge?: ReactNode;
  breadcrumbs?: MenuItemShape[];
  actions?: MenuItemShape[];
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
  ...theme.typography.h5,
  fontWeight: 600,
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

export default function PageHeader(props: PageHeaderProps) {
  const { title, subtitle, back, badge, actions, breadcrumbs } = props;

  return (
    <Root>
      <LeftSide>
        {breadcrumbs?.length ? (
          <Breadcrumbs
            aria-label="breadcrumb"
            sx={{ fontSize: "0.925em", paddingBottom: 1 }}
          >
            {breadcrumbs.map((x) => (
              <MuiLink underline="hover" to={x.to} children={x.label} />
            ))}
          </Breadcrumbs>
        ) : null}
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
      </LeftSide>
      {actions?.length ? (
        <RightSide>
          {actions.map((x) => {
            return (
              <Button component={Link} to={x.to}>
                {x.label}
              </Button>
            );
          })}
        </RightSide>
      ) : null}
    </Root>
  );
}
