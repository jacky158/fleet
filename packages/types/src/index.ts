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
import type { FormikConfig } from "formik";

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

export type FilterValues = Record<string, unknown>;

export interface ModalApi {
  open(payload: OpenModalProps): void;
  push(payload: OpenModalProps): void;
  replace(payload: OpenModalProps): void;
  setUserConfirm(shouldConfirm: boolean, params: unknown): void;
  pop(): void;
  onClose: ModalProps["onClose"];
  onTransitionExited: ModalProps["onTransitionExited"];
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

/**********************************
 * Define Grid & Paging
 ********************************** */

export interface RowValues {
  id: unknown;
}

export interface GridDefState<R extends RowValues = RowValues> {
  columns: GridColumnDef<R>[];
  size: "small" | "medium";
  rowsPerPageOptions: number[];
  setSize(payload: GridDefState<R>["size"]): void;
  dispatch: Dispatch<GridDefAction<R>>;
}

export interface CreateGridDefProps<R extends RowValues = RowValues> {
  size?: GridDefState<R>["size"];
  columns: GridDefState<R>["columns"];
  rowsPerPageOptions?: GridDefState<R>["rowsPerPageOptions"];
}

export type GridDefAction<R extends RowValues = RowValues> = {
  type: "setSize";
  payload: GridDefState<R>["size"];
};

export type PagingAction<
  R extends RowValues = RowValues,
  Q extends FilterValues = FilterValues
> =
  | { type: "setLimit"; payload: number }
  | { type: "setPage"; payload: number }
  | { type: "setQuery"; payload: Q }
  | { type: "setResult"; payload: LoadResult<R[]> }
  | { type: "remove"; payload: unknown }
  | { type: "select"; id: unknown; checked?: boolean }
  | { type: "selectAll"; payload?: boolean }
  | { type: "refresh" }
  | { type: "load" }
  | { type: "setError" }
  | { type: "loadMore" };

export type Loader<T, Q extends FilterValues = FilterValues> = (
  params: Q
) => Promise<LoadResult<T>>;

export interface PagingState<
  R extends RowValues = RowValues,
  Q extends FilterValues = FilterValues
> {
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
  loader: Loader<R[], Q>;
  dispatch: Dispatch<PagingAction<R, Q>>;
  remove(id: unknown): void;
  loadMore(): void;
  setPage(page: number): void;
  setLimit(limit: number): void;
  setQuery(query: Q): void;
  refresh(): void;
  select(id: unknown, checked?: boolean): void;
  selectAll(select?: boolean): void;
  load(q?: Q): void;
}

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
  paging: PagingState<T>;
  grid?: GridDefState<T>;
}

export interface FilterProps<
  T extends FilterValues = FilterValues,
  R extends RowValues = RowValues
> {
  value: T;
  paging?: PagingState<R, T>;
  onSubmit: FormikConfig<T>["onSubmit"];
}

export interface SharedListPresenterProps {
  initLoadingComponent?: ElementType;
  loadingComponent?: ElementType;
  errorComponent?: ElementType;
  emptyResultComponent?: ElementType;
  footerComponent?: ElementType;
  ghostToolbar?: ElementType;
  ghostActions?: ElementType;
}

export interface ListPresenterProps<
  R extends RowValues = RowValues,
  Q extends FilterValues = FilterValues
> extends SharedListPresenterProps {
  grid?: GridDefState<R>;
  paging: PagingState<R, Q>;
}

export type ListingProps<
  R extends RowValues = RowValues,
  Q extends FilterValues = FilterValues
> = {
  grid?: GridDefState<R>;
  filter?: FC<FilterProps<Q, R>>;
  presenter: FC<ListPresenterProps<R, Q>>;
  paging: PagingState<R, Q>;
} & SharedListPresenterProps;
