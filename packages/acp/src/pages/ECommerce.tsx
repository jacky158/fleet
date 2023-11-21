/**
 * @type: route
 * @name: e-commerce
 * @path: /e-commerce
 */

import { Pagination, AsTable, FilterProps, GridDef } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import PageHeader from "../ui/PageHeader";
import { MuiIcon } from "@ikx/mui";
import dayjs from "dayjs";

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

export const loader = function (): Promise<ItemShape[]> {
  return Promise.resolve(createData(50));
};

export function GridFilter({ value, onSubmit }: FilterProps) {
  const formik = useFormik({
    initialValues: value,
    onSubmit(values, helpers) {
      onSubmit(values, helpers);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ paddingBottom: 16 }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            size="small"
            fullWidth={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            size="small"
            fullWidth={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            size="small"
            fullWidth={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            size="small"
            fullWidth={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        <Grid item>
          <Button
            size="medium"
            type="submit"
            variant="outlined"
            color="primary"
            startIcon={<MuiIcon name="search" />}
          >
            Filter
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export function Screen() {
  const grid: GridDef<ItemShape> = {
    columns: [
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
          return dayjs(row.date).format("LLL");
        },
      },
      { field: "actions", headerName: "Actions" },
    ],
    size: "medium",
    rowsPerPageOptions: [20, 50, 100],
  };

  return (
    <Pagination
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
