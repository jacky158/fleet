import { useLayoutEffect, useState } from "react";
import { usePagination } from "./usePagination";
import { ListingProps, RowValues } from "@ikx/types";

export function Pagination<T extends RowValues>(props: ListingProps<T>) {
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
