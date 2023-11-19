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
    <Component className="icon material-symbols-outlined" {...props}>
      {name ?? null}
    </Component>
  );
}

export default MuiIcon;
