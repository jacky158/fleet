/**
 * @type: route
 * @name: customer.more2
 * @path: /customer/more2
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { Pagination, usePagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Scrollable, useScrollEnd, useScrollRef } from "@ikx/scroll";
import { DataListProps, LoadResult, Loader } from "@ikx/types";
import { Box } from "@mui/material";
import delay from "@ikx/utils/dist/delay";

const createData = (p: number = 0, n: number) => {
  const ret = [];
  for (let i = 1; i < n; ++i) {
    const id = p * n + i + 1;
    ret.push({
      id,
      name: `Generated Sample Item ${id}`,
      date: new Date(),
    });
  }
  return ret;
};

type ItemShape = {
  id: number;
  name: string;
  date: Date;
};

const loader: Loader<ItemShape[], { limit?: number; page?: number }> =
  function (args): Promise<LoadResult<ItemShape[]>> {
    console.log(args);
    const { limit = 20, page = 0 } = args;

    return delay(1000).then(() => {
      return {
        data: createData(page, limit),
        meta: {
          pagination: {
            limit,
            page,
            pages: 10,
            count: 100,
          },
        },
      };
    });
  };

function Customers({ paging }: DataListProps<ItemShape>) {
  if (!paging.items) return null;

  return (
    <>
      {paging.items.map((x) => {
        return (
          <div style={{ height: 48, padding: 16 }} key={x.id.toString()}>
            {x.name}
          </div>
        );
      })}
      {paging.loading ? <div>Loading ...</div> : false}
    </>
  );
}

export function Content() {
  const paging = usePagination<ItemShape>({ loader, limit: 20 });
  const scrollRef = useScrollRef();

  useScrollEnd(() => {
    paging.api.loadMore();
  }, scrollRef);

  return <Pagination<ItemShape> paging={paging} presenter={Customers} />;
}

export default function ECommerce() {
  return (
    <Layout name="layout.master">
      <PageHeader title="E-Commerce In Scrollable" />
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Scrollable
          style={{
            minHeight: "calc(100vh - 180px)",
            paddingBottom: "40px",
            width: "400px",
            borderRight: "1px solid rgba(0,0,0,0.1)",
          }}
        >
          <Content />
        </Scrollable>
        <Box sx={{ flex: 1, p: 2 }}>Detail</Box>
      </Box>
    </Layout>
  );
}
