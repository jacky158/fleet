/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { AnySchema } from "yup";
import { WhenSchema, YupTypeSchema } from "../../types";
import { toYup } from "../index";

const withWhen = <T extends YupTypeSchema, U extends AnySchema>(
  schema: AnySchema,
  jsonSchema: WhenSchema<T>[]
): U => {
  if (Array.isArray(jsonSchema) && jsonSchema.length > 0) {
    jsonSchema.forEach(({ fields, is, then, otherwise }) => {
      if (is === "$exists") {
        is = (x: any): boolean => !!x;
      } else if (is === "$empty") {
        is = (x: any): boolean => !x;
      }

      const isCached = is;
      const thenCached = then;
      const otherwiseCached = otherwise;

      // eslint-disable-next-line no-prototype-builtins
      if (is != null && typeof is === "object" && is?.hasOwnProperty("type")) {
        // @ts-ignore
        schema = schema.when(fields, (value, currentSchema) => {
          const check = toYup(isCached as YupTypeSchema);
          if (check && check.isValidSync(value)) {
            return toYup(thenCached);
          }

          if (otherwiseCached != null) {
            return toYup(otherwiseCached);
          }

          return currentSchema;
        });
      } else {
        schema = schema.when(fields, {
          // @ts-ignore
          is,
          then: toYup(then),
          otherwise: otherwise != null ? toYup(otherwise) : undefined,
        });
      }
    });
  }

  return schema as U;
};

export default withWhen;
