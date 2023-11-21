/**
 * @type: route
 * @name: e-commerce
 * @path: /e-commerce
 */

import { Listing, AsTable, FilterProps, GridDef } from "@ikx/data";
import { Layout } from "@ikx/jsx";
import { Button, Grid, TextField } from "@mui/material";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import PageHeader from "../ui/PageHeader";

const createData = (n: number) => {
  const ret = [];
  for (let i = 0; i < n; ++i) {
    ret.push({
      id: i + 1,
      name: `Nam Nguyen ${i}`,
      email: `Nam Nguyen Van ${i}`,
    });
  }
  return ret;
};

type ItemShape = {
  id: number;
  name: string;
  email: string;
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
    <form onSubmit={formik.handleSubmit}>
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
          <Button size="medium" type="submit" variant="outlined">
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
      { field: "check", type: "check", width: "20px" },
      { field: "id", headerName: "ID", width: "100px" },
      { field: "name", headerName: "Name", width: "auto" },
      { field: "email", headerName: "Email" },
      { field: "actions", headerName: "Actions" },
    ],
  };

  return <Listing grid={grid} presenter={AsTable} />;
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
