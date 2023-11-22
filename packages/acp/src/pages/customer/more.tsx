/**
 * @type: route
 * @name: customer.more
 * @path: /customer/more
 */
/* eslint-disable @typescript-eslint/no-explicit-any */
import PageHeader from "@ikx/acp/src/ui/PageHeader";
import { Pagination, usePagination } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { useScrollEnd } from "@ikx/scroll";
import { DataListProps, LoadResult, Loader } from "@ikx/types";
import GridFilter from "./Filter";

const createData = (p: number = 0, n: number) => {
  const ret = [];
  for (let i = 1; i < n; ++i) {
    const id = p * n + i + 1;
    ret.push({
      id,
      name: `Nam Nguyen ${id}`,
      email: `fleet.${id}@metafox.com`,
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

function delay(ms: number): Promise<void> {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve();
    }, ms);
  });
}

const loader: Loader<ItemShape[], { limit?: number; page?: number }> =
  function (args): Promise<LoadResult<ItemShape[]>> {
    console.log(args);
    const { limit = 20, page = 0 } = args;

    return delay(3000).then(() => {
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
          <div style={{ height: 100 }} key={x.id.toString()}>
            {x.name}
          </div>
        );
      })}
      {paging.loading ? <div>Loading ...</div> : false}
    </>
  );
}

export function Screen() {
  const paging = usePagination<ItemShape>({ loader, limit: 20 });

  useScrollEnd(() => {
    paging.api.loadMore();
  });

  return (
    <Pagination<ItemShape>
      paging={paging}
      presenter={Customers}
      filter={GridFilter}
    />
  );
}

export default function ECommerce() {
  return (
    <Layout name="layout.master">
      <PageHeader title="E-Commerce" />
      <Screen />
    </Layout>
  );
}
