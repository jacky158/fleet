/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
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
import { ReactNode, useMemo } from "react";
import { DataListProps, GridCellParams, GridColumnDef } from "./types";

function renderHeaderCheck<T>(c: GridCellParams<T>): ReactNode {
  return (
    <Checkbox
      disableRipple
      size="small"
      name={c.column.field}
      indeterminate={c.paging.selectStatus == "indeterminate"}
      checked={c.paging.selectStatus == "all"}
      onClick={() => c.paging.api.selectAll()}
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
      disableRipple
      size="small"
      name={c.column.field}
      checked={c.selected.includes(value)}
      onChange={(_, checked) => c.paging.api.select(value, checked)}
    />
  );
}

function Actions<T>(passProps: GridCellParams<T>): ReactNode {
  const app = useApp();
  return (
    <IconButton
      size="small"
      onClick={(e) =>
        app.openPopover(e, {
          component: passProps.column.actions ?? "popover.TableActions",
          passProps,
        })
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
  const columns: GridColumnDef<T>[] = useMemo(() => {
    return grid.columns.map((x) => {
      switch (x.type) {
        case "actions":
          x.style = { padding: "0 8px 0 8px" };
          break;
        case "selection":
          x.style = { padding: "0 0 0 0" };
          break;
      }
      return x;
    });
  }, [grid.columns]);

  if (!paging?.items?.length) return null;

  const data = paging.items;

  return (
    <TableContainer component={Container}>
      <Table size={grid.size}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  width={column.width}
                  align={column.headerAlign ?? column.align}
                  key={column.field}
                  style={column.style}
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
                  {columns.map((column) => {
                    return (
                      <TableCell
                        align={column.align}
                        width={column.width}
                        key={column.field}
                        style={column.style}
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
              page={0}
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
