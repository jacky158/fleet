/**
 * @type: route
 * @name: customer
 * @path: /customer
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { AsTable, Pagination, useGridDef, usePagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Link } from "@ikx/route";
import { GridCellParams, LoadResult } from "@ikx/types";
import { Menu, MenuItem, PopoverProps } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";

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
  return Promise.resolve({
    data: createData(page, limit),
    meta: {
      pagination: {
        limit,
        page,
        count: 100,
      },
    },
  });
};

function Actions({
  ctx,
  ...props
}: PopoverProps & { ctx: GridCellParams; close?(): void }) {
  const handleDelete = async () => {
    Promise.resolve(true)
      .then(() => ctx.paging.remove(ctx.row?.id))
      .catch(() => 0);
  };
  return (
    <Menu
      {...props}
      sx={{ minWidth: 120 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      <Link component={MenuItem} to={`/customer/${ctx.row?.id}`}>
        View
      </Link>
      <Link component={MenuItem} to={`/customer/${ctx.row?.id}/edit`}>
        Edit
      </Link>
      <MenuItem color="error" onClick={handleDelete}>
        Delete
      </MenuItem>
    </Menu>
  );
}

export function Screen() {
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

  const paging = usePagination<ItemShape>({
    page: 1,
    query: {},
    perPageOptions: [10],
    loader,
  });

  return (
    <Pagination<ItemShape> grid={grid} paging={paging} presenter={AsTable} />
  );
}

export default function ECommerce() {
  return (
    <Layout name="layout.master">
      <PageHeader title="E-Commerce" />
      <Box sx={{ p: 2 }}>
        <Screen />
      </Box>
    </Layout>
  );
}
