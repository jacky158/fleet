import { useLayoutEffect, useState } from "react";
import { FilterValues, ListingProps, RowValues } from "@ikx/types";

export function Pagination<
  T extends RowValues = RowValues,
  Q extends FilterValues = FilterValues
>(props: ListingProps<T, Q>) {
  const { grid, paging, filter: Filter, presenter: List, ...restProps } = props;
  const [mounted, setMounted] = useState<boolean>();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {Filter ? (
        <Filter paging={paging} value={{} as Q} onSubmit={() => {}} />
      ) : null}
      {List ? <List grid={grid} paging={paging} {...restProps} /> : null}
    </>
  );
}

export default Pagination;
