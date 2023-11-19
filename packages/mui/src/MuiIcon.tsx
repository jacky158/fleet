import { HTMLAttributes } from "react";

export function MuiIcon({
  name,
  ...props
}: { name?: string } & Omit<
  HTMLAttributes<HTMLSpanElement>,
  "children" | "className" | "name"
>) {
  return (
    <span className="icon material-symbols-outlined" {...props}>
      {name ?? null}
    </span>
  );
}

export default MuiIcon;
