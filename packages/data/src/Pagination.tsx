import { useEffect, useLayoutEffect, useState } from "react";
import { ListingProps } from "./types";

export function Pagination<T>(props: ListingProps<T>) {
  const { loader, grid, filter: Filter, presenter: List } = props;
  const [data, setData] = useState<T[]>([]);
  const [mounted, setMounted] = useState<boolean>();

  useEffect(() => {
    if (loader) {
      loader().then((data) => setData(data as unknown as T[]));
    }
    // setMounted(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {Filter ? <Filter value={{}} onSubmit={() => {}} /> : null}
      {List ? <List grid={grid} data={data} /> : null}
    </>
  );
}

export default Pagination;
