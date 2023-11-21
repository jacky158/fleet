import { useEffect, useState } from "react";
import { GridProps } from "./types";

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

const loader = function (): Promise<ItemShape[]> {
  return Promise.resolve(createData(50));
};

export function Listing<T>(props: GridProps<T>) {
  const { grid, filter: Filter, presenter: List } = props;
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    loader().then((data) => setData(data as unknown as T[]));
  }, []);
  return (
    <>
      {Filter ? <Filter value={{}} onSubmit={() => {}} /> : null}
      {List ? <List grid={grid} data={data} /> : null}
    </>
  );
}

export default Listing;
