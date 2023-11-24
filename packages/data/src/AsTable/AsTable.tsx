/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import {
  ListPresenterProps,
  GridCellParams,
  GridColumnDef,
  RowValues,
} from "@ikx/types";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/material/styles/styled";
import get from "lodash/get";
import { ReactNode, useMemo } from "react";
import TableFooterHolder from "./Footer";
import GhostToolbarHolder from "./GhostToolbar";
import InitialLoadingHolder from "./InitialLoading";
import LoadingHolder from "./Loading";

function renderHeaderCheck<T extends RowValues>(
  c: GridCellParams<T>
): ReactNode {
  return (
    <Checkbox
      disabled={c.paging.loading}
      disableRipple
      size="small"
      name={c.column.field}
      indeterminate={c.paging.selectStatus == "indeterminate"}
      checked={c.paging.selectStatus == "all"}
      onClick={() => c.paging.selectAll()}
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
      checked={c.paging.selected.includes(value)}
      onChange={(_, checked) => c.paging.select(value, checked)}
    />
  );
}
function Actions<T extends RowValues>(ctx: GridCellParams<T>): ReactNode {
  const app = useApp();
  return (
    <IconButton
      size="small"
      onClick={(e) =>
        app.openPopover(e, {
          component: ctx.column.actions ?? "popover.TableActions",
          ctx,
          // disablePortal: true,
          // disableScrollLock: true,
          // anchorOrigin: { horizontal: "right", vertical: "bottom" },
          // transformOrigin: { horizontal: "right", vertical: "top" },
          // slotProps: { root: { sx: { position: "absolute", zIndex: 1 } } },
          // sx: { minWidth: 120 },
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
  border: `1pt solid ${theme.palette.divider}`,
  position: "relative",
}));

export default function AsTable<T extends RowValues>(
  props: ListPresenterProps<T>
) {
  const {
    grid,
    paging,
    initLoadingComponent: InitialLoading = InitialLoadingHolder,
    footerComponent: Footer = TableFooterHolder,
    ghostToolbar: GhostToolbar = GhostToolbarHolder,
    ghostActions,
    loadingComponent: Loading = LoadingHolder,
  } = props;
  const columns: GridColumnDef<T>[] = useMemo(() => {
    if (!grid) return [];
    return grid.columns.map((x) => {
      switch (x.type) {
        case "actions":
          x.style = { padding: "0 16px 0 8px" };
          break;
        case "selection":
          x.style = { padding: "0 0 0 8px" };
          break;
      }
      return x;
    });
  }, [grid]);

  if (!grid) return null;

  const data = paging.items;

  return (
    <TableContainer component={Container}>
      <Table size={grid.size == "small" ? "small" : "medium"}>
        <TableHead>
          <TableRow>
            {columns.map((column) => {
              return (
                <TableCell
                  size={grid.size as unknown as TableCellProps["size"]}
                  width={column.width}
                  align={column.headerAlign ?? column.align}
                  key={column.field}
                  style={column.style}
                >
                  <HeaderCell<T>
                    row={undefined}
                    column={column}
                    paging={paging}
                    grid={grid}
                  />
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {!data?.length && paging.loading ? (
            <TableRow>
              <TableCell colSpan={columns.length}>
                <InitialLoading />
              </TableCell>
            </TableRow>
          ) : null}
          {data?.length
            ? data.map((row, index) => {
                return (
                  <TableRow
                    // onContextMenu={() => alert(2)}
                    hover
                    key={index.toString()}
                    className={index % 2 ? "tableRowOdd" : "tableRowEven"}
                  >
                    {columns.map((column) => {
                      return (
                        <TableCell
                          size={grid.size as unknown as TableCellProps["size"]}
                          align={column.align}
                          width={column.width}
                          key={column.field}
                          style={column.style}
                        >
                          <BodyCell<T>
                            row={row}
                            column={column}
                            paging={paging}
                          />
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })
            : null}
        </TableBody>
        <Footer paging={paging} grid={grid} />
      </Table>
      {paging.selected.length > 0 ? (
        <GhostToolbar paging={paging} grid={grid} menu={ghostActions} />
      ) : null}
      {data?.length && paging.loading ? <Loading /> : null}
    </TableContainer>
  );
}
