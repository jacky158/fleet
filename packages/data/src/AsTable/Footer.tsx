import { GridDefState, PagingState, RowValues } from "@ikx/types";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import TableCell from "@mui/material/TableCell";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

export default function TableFooterHolder<R extends RowValues>({
  paging,
  grid,
}: {
  paging: PagingState<R>;
  grid: GridDefState<R>;
}) {
  if (!(paging.items.length > 0)) {
    return null;
  }

  return (
    <TableFooter>
      <TableRow>
        <TableCell style={{ padding: "0 8pt 0 24px", visibility: "hidden" }}>
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
