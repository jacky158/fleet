import { useLayoutEffect, useState } from "react";
import { ListingProps } from "./types";
import { usePagination } from "./usePagination";
import {} from "@ikx/types";

export function Pagination<T>(props: ListingProps<T>) {
  const { loader, grid, filter: Filter, presenter: List } = props;
  const [mounted, setMounted] = useState<boolean>();

  const paging = usePagination<T>({
    url: "",
    page: 1,
    query: {},
    perPageOptions: [10],
    loader,
  });

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {Filter ? <Filter value={{}} onSubmit={() => {}} /> : null}
      {List ? <List grid={grid} paging={paging} /> : null}
    </>
  );
}

export default Pagination;
