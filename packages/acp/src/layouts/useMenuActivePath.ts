import { MenuItemShape as Item } from "@ikx/types";
import { useMemo } from "react";

function getIndicateUrls(url: string): string[] {
  const indicates = [];

  const parts = url.split("/").filter(Boolean);

  parts.forEach((_, index) => {
    if (index > 0) indicates.unshift(`/${parts.slice(0, index).join("/")}`);
  });
  indicates.unshift(url);

  return indicates;
}

function createMap(items: Item[], result: Record<string, string>) {
  items.forEach((x: Item) => {
    if (x.url && x._xpath) {
      result[x.url] = x._xpath;
      getIndicateUrls(x.url).forEach((str) => {
        if (result[str]) return;
        result[str] = x._xpath as string;
      });
    }

    if (x.items?.length) {
      createMap(x.items, result);
    }
  });
}

export function createPath(items: Item[], prefix: string = "") {
  items.forEach((menuItem, index) => {
    menuItem._xpath = `${prefix}/i${index}h`;
    if (menuItem.items?.length) {
      createPath(menuItem.items, menuItem._xpath);
    }
  });
}

export function useMenuSelected(items: Item[], path: string): string[] {
  const map = useMemo(() => {
    const map: Record<string, string> = {};
    createPath(items);
    createMap(items, map);
    return map;
  }, [items]);

  const found = getIndicateUrls(path).find((str) => map[str]);

  if (found && map[found]) {
    return getIndicateUrls(map[found]);
  }

  return [];
}

export default useMenuSelected;
