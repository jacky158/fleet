import { useLayoutEffect, useState } from "react";
import { ListingProps, RowValues } from "@ikx/types";

export function Pagination<T extends RowValues>(props: ListingProps<T>) {
  const { grid, paging, filter: Filter, presenter: List } = props;
  const [mounted, setMounted] = useState<boolean>();

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
