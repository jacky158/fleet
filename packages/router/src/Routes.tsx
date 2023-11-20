/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import React, { createElement, useState } from "react";
import { MatchResult } from "./types";
import { useLocation } from "./useLocation";

export function Routes({ group }: { group: string }) {
  const app = useApp();
  const { pathname } = useLocation();

  const [page, setPage] = useState<MatchResult>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // test if can map
  React.useEffect(() => {
    console.log({ pathname });
    app.router.match(pathname, group).then(setPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!page) return null;

  return createElement(page.component, page.query);
}

export default Routes;
