import { forwardRef } from "react";
import { LinkProps as RouteLinkProps } from "./types";
import { useApp } from "@ikx/core";

export const Link = forwardRef(
  (
    {
      onClick,
      to = "",
      ctx,
      component: Component = "a",
      stopPropagation,
      ...props
    }: RouteLinkProps,
    ref: unknown
  ) => {
    const app = useApp();
    const handleClick = (evt: MouseEvent) => {
      if (evt) {
        evt.preventDefault();
        if (stopPropagation) {
          evt.stopPropagation();
        }
      }
      if (typeof onClick == "function") {
        onClick(evt);
      } else if (to?.startsWith("@")) {
        app.dispatch({ type: to, payload: ctx });
      } else {
        app.router.push(to);
      }
    };

    return (
      <Component
        {...props}
        role="link"
        onClick={handleClick}
        href={to ?? "/"}
        ref={ref as never}
      />
    );
  }
);

export default Link;
