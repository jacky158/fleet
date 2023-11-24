import { GridDefState, PagingState, RowValues } from "@ikx/types";
import Checkbox from "@mui/material/Checkbox";
import Stack from "@mui/material/Stack";
import styled from "@mui/material/styles/styled";
import { ElementType } from "react";

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

export default function Toolbar<R extends RowValues>({
  grid,
  paging,
  menu: GhostActions,
}: {
  grid: GridDefState<R>;
  paging: PagingState<R>;
  menu?: ElementType;
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
          {GhostActions ? <GhostActions grid={grid} paging={paging} /> : null}
        </Stack>
      </ToolbarPresent>
    </ToolbarRoot>
  );
}
