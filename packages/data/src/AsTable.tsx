/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import { ViewName } from "@ikx/types";
import { IconButton, styled } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import get from "lodash/get";
import { ReactNode } from "react";
import { DataListProps, GridCellParams } from "./types";

function renderHeaderCheck<T>(c: GridCellParams<T>): ReactNode {
  return (
    <Checkbox
      name={c.column.field}
      onClick={(evt) =>
        c.paging.api.selectAll(!!(evt.target as HTMLInputElement)?.checked)
      }
    />
  );
}

function HeaderCell<T>(c: GridCellParams<T>) {
  if (c.column.renderHeader) {
    return c.column.renderHeader(c.column);
  }

  if (c.column.type == "selection") {
    return renderHeaderCheck(c);
  }

  return <b>{c.column.headerName ?? c.column.field}</b>;
}

function renderCellCheck<T>(c: GridCellParams<T>): ReactNode {
  const value = (c.row as any)?.id;
  return (
    <Checkbox
      name={c.column.field}
      checked={c.selected.includes(value)}
      onChange={(_, checked) => c.paging.api.select(value, checked)}
    />
  );
}

function Actions<T>(c: GridCellParams<T>): ReactNode {
  const app = useApp();
  return (
    <IconButton
      size="small"
      onClick={(e) =>
        app.openPopover(e, { component: "popover.TableActions" as ViewName, c })
      }
    >
      <MuiIcon name="settings" />
    </IconButton>
  );
}

function BodyCell<T>(c: GridCellParams<T>) {
  if (c.column.renderCell) {
    return c.column.renderCell(c);
  }
  const value = get(c.row, c.column.field) ?? null;

  switch (c.column.type) {
    case "string":
      return get(c.row, c.column.field);
    case "selection":
      return renderCellCheck(c);
    case "actions":
      return <Actions {...c} />;
  }
  return value ? value.toString() : null;
}

const Container = styled("div")(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
}));

export default function AsTable<T>({ grid, paging }: DataListProps<T>) {
  if (!paging?.items?.length) return null;

  const data = paging.items;

  return (
    <TableContainer component={Container}>
      <Table size={grid.size}>
        <TableHead>
          <TableRow>
            {grid.columns.map((column) => {
              return (
                <TableCell
                  width={column.width}
                  align={column.headerAlign ?? column.align}
                  key={column.field}
                >
                  <HeaderCell<T>
                    row={undefined}
                    column={column}
                    paging={paging}
                    selected={paging.selected}
                  />
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
                      <TableCell
                        align={column.align}
                        width={column.width}
                        key={column.field}
                      >
                        <BodyCell<T>
                          row={row}
                          column={column}
                          selected={paging.selected}
                          paging={paging}
                        />
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
              rowsPerPageOptions={grid.rowsPerPageOptions}
              onPageChange={() => {}}
              onRowsPerPageChange={() => {}}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
