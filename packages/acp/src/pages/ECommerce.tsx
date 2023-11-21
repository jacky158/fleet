/**
 * @type: route
 * @name: e-commerce
 * @path: /e-commerce
 */
import { Layout } from "@ikx/jsx";
import PageHeader from "../ui/PageHeader";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import TableBody from "@mui/material/TableBody";
import { Checkbox, TableContainer } from "@mui/material";
import { useEffect, useState } from "react";

const createData = (n: number) => {
  const ret = [];
  for (let i = 0; i < n; ++i) {
    ret.push({
      id: i,
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

const loader = function (): Promise<ItemShape[]> {
  return Promise.resolve(createData(50));
};

export function Screen() {
  const [data, setData] = useState<ItemShape[]>([]);

  useEffect(() => {
    loader().then((data) => setData(data));
  }, []);
  return (
    <TableContainer component="div">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox disableRipple />
            </TableCell>
            <TableCell>
              <b>ID</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Email</b>
            </TableCell>
            <TableCell>
              <b>Actions</b>
            </TableCell>
          </TableRow>
        </TableHead>
        {data?.length ? (
          <TableBody>
            {data.map((row) => {
              return (
                <TableRow hover key={row.id.toString()}>
                  <TableCell width="20px">
                    <Checkbox />
                  </TableCell>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : null}
      </Table>
    </TableContainer>
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
