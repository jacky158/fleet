import { forwardRef } from "react";
import {
  Link as RouterLink,
  LinkProps as RouteLinkProps,
} from "react-router-dom";

export type LinkProps = Omit<RouteLinkProps, "to"> & {
  onClick?: unknown;
  to?: RouteLinkProps["to"];
};

export const Link = forwardRef(
  ({ onClick, to, ...props }: LinkProps, ref: unknown) => {
    if (to && !onClick) {
      return <RouterLink {...props} to={to} ref={ref as never} />;
    }

    return (
      <a
        {...props}
        ref={ref as never}
        role="button"
        href="#"
        onClick={onClick}
      />
    );
  }
);

export default Link;
