/**
 * @type: route
 * @name: user.browse
 * @path: /
 * @parent: user
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsTable, Pagination, useGridDef, usePagination } from "@ikx/data";
import { Link } from "@ikx/route";
import { GridCellParams, LoadResult, MenuItemShape } from "@ikx/types";
import delay from "@ikx/utils/dist/delay";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { PopoverProps } from "@mui/material/Popover";
import dayjs from "dayjs";
import FilterUser from "./Filter";

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

const items: MenuItemShape[] = [
  { label: "Promote", ctx: ["item", "list"], to: "@user/promote" },
  { label: "Verify", ctx: ["item", "list"], to: "@user/verify" },
  {
    label: "Send Verification Email",
    ctx: ["item", "list"],
    to: "@user/sendVerificationEmail",
  },
  { label: "Edit", ctx: ["item"], to: "@user/edit" },
  {
    label: "Delete",
    ctx: ["item", "list"],
    color: "error",
    to: "@user/delete",
  },
  { label: "Report", ctx: ["item", "list"], to: "@report" },
  { label: "Ban", ctx: ["item", "list"], to: "@user/ban" },
  { label: "Un-Ban", ctx: ["item", "list"], to: "@user/UnBan" },
];

function Actions({ ctx, ...props }: PopoverProps & { ctx: GridCellParams }) {
  return (
    <Menu {...props}>
      {items
        .filter((x) => x.ctx?.includes("row"))
        .map((item, index) => {
          return (
            <Link
              key={index.toString()}
              component={MenuItem}
              color={item.color}
              ctx={ctx}
              to={item.to}
            >
              {item.label}
            </Link>
          );
        })}
    </Menu>
  );
}

function GhostActions({ ctx }) {
  return (
    <>
      {items
        .filter((x) => x.ctx?.includes("list"))
        .map((item, index) => {
          return (
            <Link
              key={index.toString()}
              to={item.to}
              ctx={ctx}
              component={Button}
              color={item.color}
            >
              {item.label}
            </Link>
          );
        })}
    </>
  );
}

export default function Route() {
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
