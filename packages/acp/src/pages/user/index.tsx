/**
 * @type: route
 * @name: user
 * @path: /user
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { AsTable, Pagination, usePagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Link } from "@ikx/router";
import { GridCellParams, GridDef, LoadResult } from "@ikx/types";
import { Menu, MenuItem, PopoverProps } from "@mui/material";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import FilterUser from "./Filter";
import delay from "@ikx/utils/dist/delay";

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

function Actions({
  passProps,
  ...props
}: PopoverProps & { passProps: GridCellParams; close?(): void }) {
  const handleDelete = async () => {
    Promise.resolve(true)
      .then(() => passProps.paging.api.removeItem(passProps.row?.id))
      .catch(void 0);
  };
  return (
    <Menu {...props}>
      <Link component={MenuItem} to={`/customer/${passProps.row?.id}`}>
        View
      </Link>
      <Link component={MenuItem} to={`/customer/${passProps.row?.id}/edit`}>
        Edit
      </Link>
      <MenuItem color="error" onClick={handleDelete}>
        Delete
      </MenuItem>
    </Menu>
  );
}

function Content() {
  const grid: GridDef<ItemShape> = {
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
  };

  const paging = usePagination<ItemShape>({
    page: 1,
    query: {},
    perPageOptions: [10],
    loader,
  });

  return (
    <Pagination<ItemShape>
      filter={FilterUser}
      grid={grid}
      paging={paging}
      presenter={AsTable}
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
