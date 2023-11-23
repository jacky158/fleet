/* eslint-disable @typescript-eslint/no-explicit-any */
import { useApp } from "@ikx/core";
import React, { createElement, useState } from "react";
import { MatchResult } from "./types";
import { useLocation } from "./useLocation";

export function Routes() {
  const app = useApp();
  const { pathname } = useLocation();

  const [result, setResult] = useState<MatchResult>();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  // test if can map
  React.useEffect(() => {
    app.router.lookup(pathname).then(setResult);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (!result) return null;

  return createElement(result.component, result.query);
}

export default Routes;
