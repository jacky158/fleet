import { forwardRef } from "react";
import { LinkProps as RouteLinkProps } from "./types";
import { useApp } from "@ikx/core";

export const Link = forwardRef(
  (
    { onClick, component: Component = "a", to, ...props }: RouteLinkProps,
    ref: unknown
  ) => {
    const app = useApp();
    const handleClick = (evt: MouseEvent) => {
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
      if (typeof onClick == "function") {
        onClick(evt);
      } else {
        app.router.push(to);
      }
    };

    return (
      <Component
        {...props}
        onClick={handleClick}
        href={to ?? undefined}
        ref={ref as never}
      />
    );
  }
);

export default Link;
