/* eslint-disable @typescript-eslint/no-explicit-any */
import { isArray, isPlainObject, isString } from "lodash";
import * as yup from "yup";
import { Reference, AnySchema } from "yup";
import { YupTypeSchema } from "../../types";

export function withTypeError<T extends AnySchema<unknown>>(
  schema: T,
  json: YupTypeSchema
): T {
  return schema.typeError(json?.errors?.typeError as any) as any;
}

/**
 * return yup.ref() or scala value
 * @param spec - any
 * @returns
 */
export function refValue<T>(spec: any): T | Reference<T> {
  if (isPlainObject(spec)) {
    if (isString(spec.ref)) {
      return yup.ref(spec.ref, spec.options);
    } else if (isArray(spec.ref)) {
      return yup.ref(spec.ref[0], spec.ref[1]);
    }
  }

  return spec;
}

/**
 * return yup.ref() or scala value defined by json
 *
 * @param values - validate ref value
 * @returns
 */
export function refValues<T>(values: T[]): (T | Reference<T>)[] {
  return values.map(refValue) as any;
}
