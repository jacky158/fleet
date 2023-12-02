/* eslint-disable @typescript-eslint/no-explicit-any */
import MuiLinkBase, { LinkOwnProps } from "@mui/material/Link";
import { forwardRef } from "react";

import { Link, LinkProps } from "@ikx/route";

export type MuiLinkProps = LinkOwnProps & LinkProps;

export const MuiLink = forwardRef((props: MuiLinkProps, ref: unknown) => {
  return <MuiLinkBase component={Link} {...props} ref={ref as any} />;
});

export default MuiLink;
