import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataListProps, GridCellParams, GridColumnDef, RowId } from "./types";
import { ReactNode, useState } from "react";
import get from "lodash/get";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import { IconButton, styled } from "@mui/material";
import { MuiIcon } from "@ikx/mui";
import { useApp } from "@ikx/core";
import { ViewName } from "@ikx/types";

function renderHeaderCheck<T = unknown>(c: GridColumnDef<T>): ReactNode {
  return <Checkbox name={c.field} />;
}

function renderHeaderCell<T = unknown>(c: GridColumnDef<T>) {
  if (c.renderHeader) {
    return c.renderHeader(c);
  }

  if (c.type == "selection") {
    return renderHeaderCheck(c);
  }

  return <b>{c.headerName ?? c.field}</b>;
}

function renderCellCheck<T = unknown>(c: GridCellParams<T>): ReactNode {
  return <Checkbox name={c.column.field} />;
}

function Actions(c: GridCellParams): ReactNode {
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
  const [selection] = useState<RowId[]>([]);
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
                      <TableCell
                        align={column.align}
                        width={column.width}
                        key={column.field}
                      >
                        <BodyCell<T>
                          row={row}
                          column={column}
                          selection={selection}
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
