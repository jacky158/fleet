import { ElementType, HTMLAttributes } from "react";

export function MuiIcon({
  name,
  component: Component = "span",
  ...props
}: { name?: string; component?: ElementType } & Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "className" | "name"
>) {
  return (
    <Component
      role="img"
      aria-label={name}
      draggable={false}
      className="icon material-symbols-outlined"
      {...props}
    >
      {name ?? null}
    </Component>
  );
}

export default MuiIcon;
