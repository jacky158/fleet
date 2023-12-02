/**
 * @type: route
 * name: localize.language.browse
 * path: /localize/language
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
  active: boolean;
}

function fakeData(): Row[] {
  return [
    {
      id: 1,
      code: "en",
      name: "English",
      active: true,
    },
    {
      id: 2,
      code: "vi",
      name: "Vietnamese",
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
      { field: "id", type: "selection", width: 40 },
      { field: "code", headerName: app.t("language.code"), width: 100 },
      { field: "name", headerName: app.t("language.name") },
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
