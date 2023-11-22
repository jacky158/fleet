import { useApp } from "@ikx/core";
import { createElement, useEffect, useState } from "react";
import { MatchResult } from "./types";

export interface OutletProps {
  base: string;
  url: string;
}
export default function Outlet({ base, url }: OutletProps) {
  const app = useApp();

  const [outlet, setOutlet] = useState<MatchResult>();

  useEffect(() => {
    app.router.match(url, base).then((x) => setOutlet(x));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [base, url]);

  if (!outlet) return null;

  return createElement(outlet.component, outlet.query);
}
