import { ReactNode } from "react";

export class ViewComponents {
  "popover.Notifications": true;
}

export type ViewName =
  | keyof ViewComponents
  | string
  | React.ElementType
  | undefined;

export interface RemoteDataSource {
  apiUrl: string;
  apiMethod?: "get" | "post" | "put" | "patch" | "delete";
  apiParams?: string | Record<string, unknown> | undefined;
  pagingId?: string;
  apiRules?: Record<string, unknown>;
  asFormDialog?: boolean;
  reload?: boolean;
  link?: string;
  download?: boolean; // as download
}

export type FetchDataResult<T> = [
  T | undefined, // data
  boolean, // loading
  string?, // error
  unknown?, // meta
  unknown? // message
];

export type FetchDataConfig<T = unknown> = {
  readonly source: RemoteDataSource;
  readonly params?: Record<string, unknown>;
  readonly data?: T;
  readonly cache?: boolean;
  readonly normalize?: boolean;
  readonly forceReload?: boolean;
  readonly preventReload?: boolean;
  readonly ttl?: number; // Cache time to life in seconds
};

export interface ToastProps {
  message: ReactNode;
  duration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

export interface MenuItemShape {
  label: string;
  icon?: string;
  to?: string;
  selected?: boolean;
  type?: "divider" | "header";
  items?: MenuItemShape[];
  _xpath?: string;
}
