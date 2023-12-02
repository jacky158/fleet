import { useApp } from "@ikx/core";
import { createElement, useEffect, useState } from "react";
import Context from "./Context";
import Router from "./Router";
import { RouterProps, LocationShape } from "./types";
import LocationContext from "./LocationContext";
import createKey from "./createKey";

export default function RouterProvider({
  baseUrl = "",
  routes,
  children,
}: RouterProps) {
  const app = useApp();
  const [loc, setLocation] = useState<LocationShape>({
    key: "i0",
    pathname:
      `${window?.location?.pathname}${window?.location?.search}`.substring(
        baseUrl.length
      ),
    query: {},
    state: window?.history?.state ?? {},
  } as unknown as LocationShape);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const router = new Router(
    app,
    (location: LocationShape) => {
      setLocation(location);
    },
    routes,
    {
      baseUrl,
      cache: true,
      apiUrl: "",
      pageNotFound: "error.404",
    }
  );

  useEffect(() => {
    if (window?.addEventListener) {
      window.addEventListener("popstate", () => {
        setLocation({
          key: createKey(),
          pathname: `${location.pathname}${location.search}`.substring(
            baseUrl.length
          ),
          query: {},
          state: history.state ?? {},
        });
      });
    }
  }, [baseUrl]);

  app.extend({ router });

  return createElement(
    Context.Provider,
    { value: router },
    createElement(LocationContext.Provider, { value: loc }, children)
  );
}
