/**
 * @type: route
 * @name: user
 * @path: /user
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { AsTable, Pagination, useGridDef, usePagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Link } from "@ikx/router";
import { GridCellParams, ListPresenterProps, LoadResult } from "@ikx/types";
import delay from "@ikx/utils/dist/delay";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverProps } from "@mui/material/Popover";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import FilterUser from "./Filter";
import { useApp } from "@ikx/core";

const createData = (p: number = 0, n: number) => {
  const ret = [];
  for (let i = 1; i < n; ++i) {
    const id = p * n + i + 1;
    ret.push({
      id,
      name: `Generated ${id}`,
      email: `generated-${id}@example.com`,
      date: new Date(),
    });
  }
  return ret;
};

type ItemShape = {
  id: number;
  name: string;
  email: string;
  date: Date;
};

export const loader = function ({
  limit = 20,
  page = 0,
}): Promise<LoadResult<ItemShape[]>> {
  return delay(2000).then(() => ({
    data: createData(page, limit),
    meta: {
      pagination: {
        limit,
        page,
        count: 100,
      },
    },
  }));
};

function Actions({ paging, row, ...props }: PopoverProps & GridCellParams) {
  const app = useApp();
  const handleDelete = () =>
    app
      .confirm({ message: "Are you sure?" })
      .then(() => {
        paging.remove(row?.id);
      })
      .catch(void 0);

  return (
    <Menu {...props}>
      <Link component={MenuItem} to={`/user/${row?.id}`}>
        View
      </Link>
      <Link component={MenuItem} to={`/user/${row?.id}/edit`}>
        Edit
      </Link>
      <MenuItem color="error" onClick={handleDelete}>
        Delete
      </MenuItem>
    </Menu>
  );
}

function GhostActions({ paging }: ListPresenterProps) {
  const app = useApp();
  function handleDelete() {
    app
      .confirm({ message: "Are  you sure" })
      .then(() => paging.remove(paging.selected))
      .catch(void 0);
  }
  return (
    <>
      <Button size="small" onClick={handleDelete}>
        delete
      </Button>
    </>
  );
}

function Content() {
  const grid = useGridDef<ItemShape>({
    columns: [
      { field: "check", type: "selection" },
      { field: "id", headerName: "ID", width: "100px" },
      {
        field: "name",
        headerName: "Name",
        width: "auto",
      },
      { field: "email", headerName: "Email" },
      {
        field: "date",
        headerName: "Date",
        renderCell({ row }) {
          return dayjs(row?.date).format("LLL");
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        type: "actions",
        actions: Actions,
      },
    ],
    size: "medium",
    rowsPerPageOptions: [20, 50, 100],
  });

  const paging = usePagination<ItemShape>({ loader });

  return (
    <Pagination<ItemShape>
      filter={FilterUser}
      grid={grid}
      paging={paging}
      presenter={AsTable}
      ghostActions={GhostActions}
    />
  );
}

export default function route() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Members" />
      <Box sx={{ p: 2 }}>
        <Content />
      </Box>
    </Layout>
  );
}
