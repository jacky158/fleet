import { MenuItemShape } from "@ikx/types";
import { useMemo } from "react";

type MenuKey = string;

interface MenuShadowMap {
  [key: MenuKey]: {
    url: string;
    parent?: string[];
  };
}

function getIndicateUrls(url: string): string[] {
  const indicates = [];

  const parts = url.split("/").filter(Boolean);

  parts.forEach((_, index) => {
    if (index > 0) indicates.unshift(`/${parts.slice(0, index).join("/")}`);
  });
  indicates.unshift(url);

  return indicates;
}

function getMenuPathMap(items: MenuItemShape[]): Record<string, string> {
  const result: Record<string, string> = {};

  const shadow: MenuShadowMap = {};

  const paths = items
    .reduce((acc, x: MenuItemShape) => {
      if (x.url) acc.push(x.url);

      if (x.items) {
        x.items.forEach((item) => {
          if (item.url) {
            acc.push(item.url);
          }
        });
      }

      return acc;
    }, [] as string[])
    .filter(Boolean);

  paths.forEach((str) => {
    result[str] = str; // indicate first
  });

  paths.forEach((path) => {
    getIndicateUrls(path).forEach((str) => {
      if (result[str]) return;

      result[str] = path;
    });
  });

  return result;
}

export function normalizeId(items: MenuItemShape[], prefix: string = "0") {
  items.forEach((item, index) => {
    if (!item.id) {
      item.id = `${prefix}/${index}`;
      if (item.items?.length) {
        normalizeId(item.items, item.id);
      }
    }
  });
}

export function useActiveMenuUrl(
  items: MenuItemShape[],
  pathname: string
): string {
  const map = useMemo(() => {
    normalizeId(items);
    return getMenuPathMap(items);
  }, [items]);

  const indicate = getIndicateUrls(pathname).find((str) => map[str]);

  return indicate ? map[indicate] : "";
}

export default useActiveMenuUrl;
