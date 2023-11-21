import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataListProps, GridCellParams, GridColumnDef } from "./types";
import { ReactNode } from "react";
import get from "lodash/get";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";

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

export default function AsTable<T>({ grid, data }: DataListProps<T>) {
  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            {grid.columns.map((column) => {
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
                  {grid.columns.map((column) => {
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
              colSpan={grid.columns.length}
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
  );
}
