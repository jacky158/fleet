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
}

const Title = styled("span")({
  fontSize: "1.4rem",
  paddingRight: "1rem",
  fontWeight: 600,
});
const Subtitle = styled("span")(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: "0.9em",
}));
const Back = styled(Button)({
  width: 32,
  minWidth: 32,
  padding: "0 0 0 0",
  marginRight: "1rem",
});

const Heading = styled(Box)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
});
const Left = styled(Box)({
  display: "flex",
  flexGrow: 0,
  flexDirection: "column",
});
const Right = styled(Box)({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "flex-end",
});
const Root = styled(Box)({
  display: "flex",
  flexDirection: "row",
  padding: "16px",
  fontSize: "1rem",
});

export default function PageHeader(props: PageHeaderProps) {
  const { title, subtitle, back, badge, breadcrumbs } = props;

  return (
    <Root>
      <Left>
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
      </Left>
      <Right>
        <Button component={Link} to="/">
          Operation 1
        </Button>
        <Button component={Link} to="/">
          Operation 2
        </Button>
        <Button component={Link} to="/">
          Operation 3
        </Button>
      </Right>
    </Root>
  );
}
