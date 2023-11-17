/**
 * @type: service
 * name: compactUrl
 */
import { RemoteDataSource } from "@ikx/types";
import get from "lodash/get";
import set from "lodash/set";
import compactData from "./compactData";

export default function compactUrl(
  source: RemoteDataSource,
  data: Record<string, unknown> | string | undefined
): string {
  if (!source.apiUrl) return "";

  const kv = compactData(source.apiParams, data);

  const url = new URL(
    source.apiUrl.replace(/(:\w+)/gi, (token) => {
      const k = token.substring(1);
      const v = get(kv, k) as string;
      if (v != undefined) {
        set(kv, k, undefined);
      }
      return v ?? "";
    }),
    "http://x/"
  );

  Object.keys(kv).forEach((k) => {
    url.searchParams.append(k, (kv as Record<string, string>)[k]);
  });

  return url.href.replace("http://x/", "");
}
