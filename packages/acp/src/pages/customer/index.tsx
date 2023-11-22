/**
 * @type: route
 * @name: customer
 * @path: /customer
 */

import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { AsTable, GridCellParams, GridDef, Pagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import Box from "@mui/material/Box";
import dayjs from "dayjs";
import GridFilter from "./Filter";
import { LoadResult } from "@ikx/types";
import { Menu, MenuItem, Popover, PopoverProps } from "@mui/material";
import { Link } from "@ikx/router";

const createData = (n: number) => {
  const ret = [];
  for (let i = 0; i < n; ++i) {
    ret.push({
      id: i + 1,
      name: `Nam Nguyen ${i}`,
      email: `Nam Nguyen Van ${i}`,
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

export const loader = function (): Promise<LoadResult<ItemShape[]>> {
  return Promise.resolve({ data: createData(5) });
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
  console.log(props);
  return (
    <Menu
      {...props}
      sx={{ minWidth: 120 }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
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

export function Screen() {
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

  return (
    <Pagination<ItemShape>
      grid={grid}
      presenter={AsTable}
      loader={loader}
      filter={GridFilter}
    />
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
