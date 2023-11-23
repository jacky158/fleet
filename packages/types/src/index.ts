/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  CSSProperties,
  Dispatch,
  ElementType,
  FC,
  ReactNode,
} from "react";
import type { ModalProps } from "@mui/material/Modal";
import type { PopoverProps } from "@mui/material";
import type { FormikConfig, FormikValues } from "formik";

export interface ViewComponents {
  "popover.Notifications": true;
}

export type RefOf<T> = React.MutableRefObject<T> | ((instance: T) => void);

export type ViewName = string | keyof ViewComponents | ElementType;

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
    pagination: Partial<{
      page: number;
      pages: number;
      count: number;
      limit: number;
    }>;
  };
}

export interface RowValues {
  id: unknown;
}

export type PagingAction<R extends RowValues, Q> =
  | { type: "setUrl"; payload: string }
  | { type: "setLimit"; payload: number }
  | { type: "setPage"; payload: number }
  | { type: "setQuery"; payload: Q }
  | { type: "setResult"; payload: LoadResult<R[]> }
  | { type: "removeItem"; payload: unknown }
  | { type: "select"; id: unknown; checked?: boolean }
  | { type: "selectAll"; payload?: boolean }
  | { type: "refresh" }
  | { type: "setSize"; payload: string }
  | { type: "load" }
  | { type: "setError" }
  | { type: "loadMore" };

export interface PagingApi<R extends RowValues, Q> {
  dispatch?: Dispatch<PagingAction<R, Q>>;
  removeItem(id: unknown): void;
  loadMore(): void;
  setPage(page: number): void;
  setLimit(limit: number): void;
  setQuery(query: Q): void;
  refresh(): void;
  select(id: unknown, checked?: boolean): void;
  selectAll(select?: boolean): void;
  load(q?: unknown): void;
  setSize(value: string): void;
}

export type Loader<R, Q = unknown> = (params: Q) => Promise<LoadResult<R>>;

export interface PagingState<R extends RowValues, Q = Record<string, unknown>> {
  loadingMore: boolean;
  selectStatus: "none" | "all" | "indeterminate";
  loading: boolean;
  rev: number;
  selected: unknown[];
  size?: string;
  items: R[];
  page: number; // current_page
  limit: number;
  count?: number; // total item
  pages: number; // total page
  perPageOptions?: number[];
  query: Q;
  loader: Loader<R[], unknown>;
  api: PagingApi<R, Q>;
}

export type FilterValues = FormikValues;

export type GridColumnType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "actions"
  | "selection";

export type GridColumnAlign = "left" | "right" | "center";

export interface GridColumnDef<R extends RowValues = RowValues> {
  style?: CSSProperties;
  field: string;
  type?: GridColumnType;
  align?: GridColumnAlign;
  description?: string;
  width?: string | number;
  headerName?: string;
  headerAlign?: GridColumnAlign;
  actions?: ViewName;
  valueGetter?(row: R): unknown;
  valueFormatter?(row: R): unknown;
  renderCell?(params: GridCellParams<R>): ReactNode;
  renderHeader?(params: GridColumnDef<R>): ReactNode;
  getActions?(params: GridCellParams<R>): ReactNode;
}

export interface GridCellParams<T extends RowValues = RowValues> {
  row: T | undefined;
  column: GridColumnDef<T>;
  selected: unknown[];
  paging: PagingState<T>;
}

export interface FilterProps<T extends FilterValues = FilterValues> {
  value: T;
  onSubmit: FormikConfig<T>["onSubmit"];
}

export interface GridDef<R extends RowValues> {
  columns: GridColumnDef<R>[];
  rowsPerPageOptions: number[];
  size: "small" | "medium";
}

export type ListingProps<R extends RowValues> = {
  grid?: GridDef<R>;
  filter?: FC<FilterProps>;
  presenter: FC<DataListProps<R>>;
  paging: PagingState<R>;
};

export interface DataListProps<R extends RowValues> {
  grid?: GridDef<R>;
  paging: PagingState<R>;
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
