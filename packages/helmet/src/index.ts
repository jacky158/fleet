import { createElement, useEffect, useState } from "react";
import { Data } from "./types";
import { Helmet } from "react-helmet-async";
import useApp from "@ikx/app";

export function HelmetHandler() {
  const [data, setData] = useState<Data>([]);
  const app = useApp();

  useEffect(() => {
    app.extend({
      helmet(data: Data) {
        setData(data);
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!data?.length) return null;

  return createElement(
    Helmet,
    {},
    data.map(({ tag, ...props }, index) => {
      return createElement(tag, { ...props, key: index.toString() });
    })
  );
}

export default HelmetHandler;
