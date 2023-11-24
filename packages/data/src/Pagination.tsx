import { useLayoutEffect, useState } from "react";
import { ListingProps, RowValues } from "@ikx/types";

export function Pagination<T extends RowValues>(props: ListingProps<T>) {
  const { grid, paging, filter: Filter, presenter: List, ...restProps } = props;
  const [mounted, setMounted] = useState<boolean>();

  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {Filter ? (
        <Filter grid={grid} paging={paging} value={{}} onSubmit={() => {}} />
      ) : null}
      {List ? <List grid={grid} paging={paging} {...restProps} /> : null}
    </>
  );
}

export default Pagination;
