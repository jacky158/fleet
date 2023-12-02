/**
 * @type: route
 * name: localize.currency.browse
 * path: /localize/currency
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";
import { AsTable, Pagination, useGridDef, usePagination } from "@ikx/data";
import { RowValues } from "@ikx/types";
import delay from "@ikx/utils/dist/delay";
import { useApp } from "@ikx/core";

interface Row extends RowValues {
  code: string;
  name: string;
  symbol: string;
  active: boolean;
}

function fakeData(): Row[] {
  return [
    {
      id: 1,
      code: "USD",
      symbol: "$",
      name: "U.S. Dollars",
      active: true,
    },
    {
      id: 2,
      code: "EUR",
      symbol: "€",
      name: "Euros",
      active: true,
    },
  ];
}

function loader() {
  return delay(500).then(() => ({
    data: fakeData(),
  }));
}

function Content() {
  const app = useApp();
  const grid = useGridDef<Row>({
    columns: [
      { field: "code", headerName: app.t("currency.code"), width: 100 },
      { field: "symbol", headerName: app.t("currency.symbol"), width: 100 },
      { field: "name", headerName: app.t("currency.name") },
    ],
  });

  const paging = usePagination<Row>({
    loader,
  });

  return <Pagination<Row> grid={grid} paging={paging} presenter={AsTable} />;
}

export default function Language() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Localization" />
      <Content />
    </Layout>
  );
}
