/**
 * @type: route
 * @name: e-commerce
 * @path: /e-commerce
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "../ui/PageHeader";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import {
  Checkbox,
  TableContainer,
  TableFooter,
  TablePagination,
  TextField,
} from "@mui/material";
import get from "lodash/get";
import { ReactNode, useEffect, useState } from "react";
import {
  FormikConfig,
  FormikHelpers,
  FormikProps,
  FormikValues,
  useFormik,
} from "formik";

const createData = (n: number) => {
  const ret = [];
  for (let i = 0; i < n; ++i) {
    ret.push({
      id: i + 1,
      name: `Nam Nguyen ${i}`,
      email: `Nam Nguyen Van ${i}`,
    });
  }
  return ret;
};

type ItemShape = {
  id: number;
  name: string;
  email: string;
};

const loader = function (): Promise<ItemShape[]> {
  return Promise.resolve(createData(50));
};

export type GridColumnType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "actions"
  | "check";

export type Row<T> = { id: unknown } & T;

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

export interface GridProps<T> {
  columns: GridColumnDef<T>[];
}

function renderHeaderCheck<T = unknown>(c: GridColumnDef<T>): ReactNode {
  return <Checkbox name={c.field} />;
}

function renderHeaderCell<T = unknown>(c: GridColumnDef<T>) {
  if (c.renderHeader) {
    return c.renderHeader(c);
  }

  if (c.type == "check") {
    return renderHeaderCheck(c);
  }

  return <b>{c.headerName ?? c.field}</b>;
}

function renderCellCheck<T = unknown>(c: GridCellParams<T>): ReactNode {
  return <Checkbox name={c.column.field} />;
}

function renderBodyCell<T>(c: GridCellParams<T>) {
  if (c.column.renderCell) {
    return c.column.renderCell(c);
  }
  const value = get(c.row, c.column.field) ?? null;
  switch (c.column.type) {
    case "string":
      return get(c.row, c.column.field);
    case "check":
      return renderCellCheck(c);
  }
  return value ?? null;
}

export function Filter<T extends FormikValues>({
  value,
  onSubmit,
}: {
  value: T;
} & Pick<FormikConfig<T>, "onSubmit" | "onReset">) {
  const formik = useFormik({
    initialValues: value,
    onSubmit(values, helpers) {
      onSubmit(values, helpers);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Name"
        fullWidth={false}
        name="name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
    </form>
  );
}

export function Screen<T>(gridProps: GridProps<T>) {
  const [data, setData] = useState<T[]>([]);
  const { columns } = gridProps;

  useEffect(() => {
    loader().then((data) => setData(data as unknown as T[]));
  }, []);
  return (
    <>
      <Filter value={{} as FormikValues} onSubmit={() => {}} />
      <TableContainer component="div">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => {
                return (
                  <TableCell
                    width={column.width}
                    align={column.headerAlign ?? column.align}
                    key={column.field}
                  >
                    {renderHeaderCell(column)}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
          {data?.length ? (
            <TableBody>
              {data.map((row, index) => {
                return (
                  <TableRow
                    hover
                    key={index.toString()}
                    className={index % 2 ? "odd" : "even"}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell width={column.width} key={column.field}>
                          {renderBodyCell<T>({ row, column })}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          ) : null}
          <TableFooter>
            <TableRow>
              <TablePagination
                page={1}
                colSpan={5}
                count={data?.length}
                rowsPerPage={20}
                rowsPerPageOptions={[10, 20, 30]}
                onPageChange={() => {}}
                onRowsPerPageChange={() => {}}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
}

export default function ECommerce() {
  const gridProps: GridProps<ItemShape> = {
    columns: [
      { field: "check", type: "check", width: "20px" },
      { field: "id", headerName: "ID", width: "100px" },
      { field: "name", headerName: "Name", width: "auto" },
      { field: "email", headerName: "Email" },
      { field: "actions", headerName: "Actions" },
    ],
  };

  return (
    <Layout name="layout.master">
      <PageHeader title="E-Commerce" />
      <Box sx={{ p: 2 }}>
        <Screen<ItemShape> {...gridProps} />
      </Box>
    </Layout>
  );
}
