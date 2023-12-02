/**
 * @type: route
 * name: localize.phrase.browse
 * path: /localize/phrase
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "../../ui/PageHeader";
import { AsTable, Pagination, useGridDef, usePagination } from "@ikx/data";
import { RowValues } from "@ikx/types";
import delay from "@ikx/utils/dist/delay";
import { useApp } from "@ikx/core";

interface Row extends RowValues {
  key: string;
  origin: string;
  text: string;
}

function fakeData(): Row[] {
  const ret: Row[] = [];

  for (let i = 0; i < 10; ++i) {
    ret.push({
      id: i + 1,
      key: `phrase.key.${i}`,
      origin: `Some text ${i}`,
      text: `Some text ${i}`,
    });
  }

  return ret;
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
      { field: "id", type: "selection", width: 40 },
      { field: "key", headerName: app.t("phrase.key"), width: 100 },
      { field: "origin", headerName: app.t("phrase.origin"), width: "20%" },
      { field: "text", headerName: app.t("phrase.text") },
    ],
  });

  const paging = usePagination<Row>({
    loader,
  });

  return <Pagination<Row> grid={grid} paging={paging} presenter={AsTable} />;
}

export default function Page() {
  return (
    <Layout name="layout.master">
      <PageHeader title="Localization" />
      <Content />
    </Layout>
  );
}