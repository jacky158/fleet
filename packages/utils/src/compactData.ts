/**
 * @type: service
 * name: compactData
 */

import { isString, get } from "lodash";
import qs from "query-string";

type Params = Record<string, unknown>;

function ensureObject(input: string | Params | undefined): Params {
  return isString(input) ? qs.parse(input) : { ...input } ?? {};
}

export default function compactData(
  obj1: Params | string | undefined,
  obj2: Params | string | undefined
  // rules?: Record<string, unknown>
): Record<string, string> {
  const result: Record<string, string> = {};

  const x = ensureObject(obj1);
  const y = ensureObject(obj2);

  // always accept page.
  if (!x.q) {
    x.q = ":q";
  }

  if (!x.page) {
    x.page = ":page";
  }

  if (!x.limit) {
    x.limit = ":limit";
  }

  for (const key in x) {
    let value = x[key];

    if (isString(value) && /^:[\w.]+$/.test(value)) {
      value = get(y, value.substring(1));
    }

    if (value !== undefined) result[key] = value as string;
  }

  // return whenParamRules(result, rules);

  return result;
}
