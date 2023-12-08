import { MenuItemShape } from "@ikx/types";
import when, { WhenProps } from "@ikx/when";

function filterMenuItems(
  items: MenuItemShape[],
  scope: { loc: string; resource?: string },
  data?: unknown
): MenuItemShape[] {
  return items.filter(({ scope: _in, showWhen }) => {
    if (!_in) return true;
    if (scope.loc && !_in.loc?.includes(scope.loc)) return false;
    if (scope.resource && !_in.resource?.includes(scope.resource)) return false;

    if (data && showWhen && !when(data, showWhen as WhenProps)) return false;

    return true;
  });
}

export default filterMenuItems;
