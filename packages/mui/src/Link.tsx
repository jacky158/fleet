/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import MuiLink, { LinkOwnProps } from "@mui/material/Link";
import { forwardRef } from "react";

type Props = LinkOwnProps & RouterLinkProps;

export const Link = forwardRef((props: Props, ref: unknown) => {
  return <MuiLink component={RouterLink} {...props} ref={ref as any} />;
});

export default Link;
