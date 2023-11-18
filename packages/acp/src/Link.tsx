import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import MuiLink, { LinkOwnProps } from "@mui/material/Link";

export default function Link(props: LinkOwnProps & RouterLinkProps) {
  return <MuiLink component={RouterLink} {...props} />;
}
