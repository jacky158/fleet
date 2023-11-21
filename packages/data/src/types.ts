import { FormikConfig, FormikValues } from "formik";
import { FC, ReactNode } from "react";

export type FilterValues = FormikValues;

export type GridColumnType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "actions"
  | "check";

export type GridColumnAlign = "left" | "right" | "center";

export interface GridColumnDef<T> {
  field: string;
  type?: GridColumnType;
  align?: GridColumnAlign;
  description?: string;
  width?: string | number;
  headerName?: string;
  headerAlign?: GridColumnAlign;
  valueGetter?(row: T): unknown;
  valueFormatter?(row: T): unknown;
  renderCell?(params: GridCellParams<T>): ReactNode;
  renderHeader?(params: GridColumnDef<T>): ReactNode;
  getActions?(params: GridCellParams<T>): ReactNode;
}

export interface GridCellParams<T = unknown> {
  row: T;
  column: GridColumnDef<T>;
}

export interface FilterProps<T extends FilterValues = FilterValues> {
  value: T;
  onSubmit: FormikConfig<T>["onSubmit"];
}

export interface GridDef<T> {
  columns: GridColumnDef<T>[];
}

export type GridProps<T> = {
  grid: GridDef<T>;
  filter?: FC<FilterProps>;
  presenter: FC<DataListProps<T>>;
};
export interface DataListProps<T> {
  grid: GridDef<T>;
  data: T[];
}
