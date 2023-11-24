/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import { MuiIcon } from "@ikx/mui";
import {
  ListPresenterProps,
  GridCellParams,
  GridColumnDef,
  GridDefState,
  PagingState,
  RowValues,
} from "@ikx/types";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableFooter from "@mui/material/TableFooter";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import styled from "@mui/material/styles/styled";
import get from "lodash/get";
import { ReactNode, useMemo } from "react";

function InitialLoadingHolder() {
  return <div>Loading</div>;
}

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
      checked={c.selected.includes(value)}
      onChange={(_, checked) => c.paging.select(value, checked)}
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

const ToolbarRoot = styled("div")<{ size?: string }>(() => ({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  // background: `${theme.palette.background.paper}`,
  //color: `${theme.palette.success.contrastText}`,
  zIndex: 1,
}));

const ToolbarPresent = styled("div")<{ size?: string }>(({ theme, size }) => ({
  padding: "0 8px 0 8px",
  display: "flex",
  alignItems: "center",
  background: theme.palette.background.paper,
  height: size == "small" ? 38 : 54,
}));

function TableFooterHolder<R extends RowValues>({
  paging,
  grid,
}: {
  paging: PagingState<R>;
  grid: GridDefState<R>;
}) {
  console.log("handle render footer");

  if (!(paging.items.length > 0)) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell style={{ padding: "0 8pt 0 24px" }}>
          <FormControlLabel
            onChange={(_, checked) =>
              grid.setSize(checked ? "small" : "medium")
            }
            control={
              <Switch
                checked={grid.size === "small"}
                aria-label="dense"
                size="small"
              />
            }
            label={"Compact"}
          />
        </TableCell>
        <TablePagination
          page={paging.page}
          colSpan={grid.columns.length - 1}
          count={paging.count ?? paging.items?.length ?? 0}
          rowsPerPage={paging.limit}
          rowsPerPageOptions={grid.rowsPerPageOptions}
          onPageChange={(_e, value) => paging.setPage(value)}
          onRowsPerPageChange={(limit) =>
            paging.setLimit(limit.target.value as unknown as number)
          }
        />
      </TableRow>
    </TableFooter>
  );
}

function Toolbar<R extends RowValues>({
  grid,
  paging,
}: {
  grid: GridDefState<R>;
  paging: PagingState<R>;
  columns: GridColumnDef<R>[];
}) {
  return (
    <ToolbarRoot>
      <ToolbarPresent size={grid.size}>
        <Checkbox
          disableRipple
          size="small"
          indeterminate={paging.selectStatus == "indeterminate"}
          checked={paging.selectStatus == "all"}
          onClick={() => paging.selectAll()}
        />
        <small style={{ paddingRight: "2em" }}>
          {paging.selected.length} selected
        </small>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Button
            size="small"
            sx={{ textTransform: "none" }}
            startIcon={<MuiIcon name="delete" />}
          >
            Delete
          </Button>
          <Button size="small" sx={{ textTransform: "none" }}>
            Send Mail
          </Button>
          <Button size="small" sx={{ textTransform: "none" }}>
            Trash
          </Button>
          <Button size="small" sx={{ textTransform: "none" }}>
            Block
          </Button>
          <Button size="small" sx={{ textTransform: "none" }}>
            Un-Block
          </Button>
        </Stack>
      </ToolbarPresent>
    </ToolbarRoot>
  );
}

export default function AsTable<T extends RowValues>({
  grid,
  paging,
  initLoadingComponent: InitialLoading = InitialLoadingHolder,
  footerComponent: Footer = TableFooterHolder,
}: ListPresenterProps<T>) {
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
                    selected={paging.selected}
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
                            selected={paging.selected}
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
        <Toolbar paging={paging} columns={columns} grid={grid} />
      ) : null}
    </TableContainer>
  );
}
