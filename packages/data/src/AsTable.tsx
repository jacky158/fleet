/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import styled from "@mui/material/styles/styled";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import Table, { TableProps } from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import get from "lodash/get";
import { ReactNode, useMemo } from "react";
import {
  DataListProps,
  GridCellParams,
  GridColumnDef,
  RowValues,
} from "@ikx/types";

function renderHeaderCheck<T extends RowValues>(
  c: GridCellParams<T>
): ReactNode {
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

function HeaderCell<T extends RowValues>(c: GridCellParams<T>) {
  if (c.column.renderHeader) {
    return c.column.renderHeader(c.column);
  }

  if (c.column.type == "selection") {
    return renderHeaderCheck(c);
  }

  return <b>{c.column.headerName ?? c.column.field}</b>;
}

function renderCellCheck<T extends RowValues>(c: GridCellParams<T>): ReactNode {
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
function Actions<T extends RowValues>(passProps: GridCellParams<T>): ReactNode {
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
      <MuiIcon name="more_vert" />
    </IconButton>
  );
}

function BodyCell<T extends RowValues>(c: GridCellParams<T>) {
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

export default function AsTable<T extends RowValues>({
  grid,
  paging,
}: DataListProps<T>) {
  const columns: GridColumnDef<T>[] = useMemo(() => {
    if (!grid) return [];
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
  }, [grid]);

  if (!grid || !paging?.items?.length) return null;

  const data = paging.items;

  console.log(paging.size);

  return (
    <TableContainer component={Container}>
      <Table size={paging.size == "small" ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  size={paging.size as unknown as TableCellProps["size"]}
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
                        size={paging.size as unknown as TableCellProps["size"]}
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
            <TableCell style={{ padding: "0 0 0 16px" }}>
              <FormControlLabel
                onChange={(_, checked) =>
                  paging.api.setSize(checked ? "small" : "medium")
                }
                control={
                  <Switch
                    checked={paging.size === "small"}
                    aria-label="dense"
                    size="small"
                  />
                }
                label={"Dense"}
              />
            </TableCell>
            <TablePagination
              page={paging.page}
              colSpan={grid.columns.length - 1}
              count={paging.count ?? data?.length}
              rowsPerPage={paging.limit}
              rowsPerPageOptions={grid.rowsPerPageOptions}
              onPageChange={(_e, value) => paging.api.setPage(value)}
              onRowsPerPageChange={(limit) =>
                paging.api.setLimit(limit.target.value as unknown as number)
              }
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
