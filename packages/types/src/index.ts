/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Dispatch, ReactNode } from "react";
import { ModalProps } from "@mui/material/Modal";
import { PopoverProps } from "@mui/material";

export interface ViewComponents {
  "popover.Notifications": true;
}

export type ViewName = string | keyof ViewComponents;

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

export interface LoadResult<R> {
  data: R;
  meta?: {
    pagination: {
      page: number;
      pages: number;
      count: number;
      limit: number;
    };
  };
}

export interface RowValues {
  id: unknown;
}

export type PagingAction<R, Q> =
  | { type: "setUrl"; payload: string }
  | { type: "setLimit"; payload: number }
  | { type: "setPage"; payload: number }
  | { type: "setQuery"; payload: Q }
  | { type: "setResult"; payload: LoadResult<R[]> }
  | { type: "removeItem"; payload: unknown }
  | { type: "select"; id: unknown; checked?: boolean }
  | { type: "selectAll"; payload?: boolean }
  | { type: "refresh" }
  | { type: "load" }
  | { type: "setError" }
  | { type: "loadMore" };

export interface PagingApi<_R, Q> {
  dispatch?: Dispatch<PagingAction<_R, Q>>;
  removeItem(id: string | number): void;
  loadMore(): void;
  setPage(page: number): void;
  setLimit(page: number): void;
  setUrl(url: string): void;
  setQuery(query: Q): void;
  refresh(): void;
  select(id: unknown, checked?: boolean): void;
  selectAll(select?: boolean): void;
  load(q?: unknown): void;
}

export interface PagingState<R, Q = Record<string, unknown>> {
  loadingMore: boolean;
  selectStatus: "none" | "all" | "indeterminate";
  loading: boolean;
  url: string;
  rev: number;
  selected: unknown[];
  items: R[];
  page: number; // current_page
  limit: number;
  count: number; // total item
  pages: number; // total page
  perPageOptions?: number[];
  query: Q;
  loader(q?: unknown): Promise<LoadResult<R[]>>;
  api: PagingApi<R, Q>;
}

type MyMenuProps = Omit<PopoverProps, "children" | "component" | "open">;

export interface OpenPopoverProps extends MyMenuProps {
  [key: string]: unknown;
  component: ViewName;
  open?: boolean;
}

export interface ToastProps {
  message: ReactNode;
  duration?: number;
  severity?: "success" | "info" | "warning" | "error";
}

export interface ConfirmProps {
  title?: ReactNode;
  message: ReactNode;
}

export interface AlertProps {
  title?: ReactNode;
  message: ReactNode;
}

type MyModalProps = Omit<ModalProps, "children" | "open">;

export interface OpenModalProps extends MyModalProps {
  modal: JSX.ElementType;
  open?: boolean;
}

export interface ModalApi {
  open(payload: OpenModalProps): void;
  push(payload: OpenModalProps): void;
  replace(payload: OpenModalProps): void;
  setUserConfirm(shouldConfirm: boolean, params: unknown): void;
  pop(): void;
  onClose: ModalProps["onClose"];
  onTransitionExited: ModalProps["onTransitionExited"];
}
