/**
 * @type: service
 * @name: useFetch
 */
import { useApp } from "@ikx/core";
import { FetchDataConfig, FetchDataResult } from "@ikx/types";
import { useEffect, useState } from "react";

export function useFetch<T = unknown>(props: FetchDataConfig<T>) {
  const { source, params, data, forceReload } = props;
  const app = useApp();
  const paramStr = JSON.stringify(params);

  const [result, setResult] = useState<FetchDataResult<T>>([
    data,
    Boolean(!data || forceReload),
    undefined,
    undefined,
    undefined,
  ]);

  useEffect(() => {
    let mounted = true;

    const fetchData = () =>
      app.http
        .load<T>(props)
        .then((result: FetchDataResult<T>) => {
          return mounted ? setResult(result) : undefined;
        })
        .catch(void 0);

    if (!data || forceReload) {
      fetchData();
    }

    return () => {
      mounted = false;
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paramStr, source?.apiUrl]);

  return result;
}

export default useFetch;
