/* eslint-disable @typescript-eslint/no-explicit-any */
import when from "@ikx/when";
import { get, uniq } from "lodash";
import * as yup from "yup";
import { ArraySchema, Schema } from "yup";
import { toYup, withTypeError } from "..";
import { ArrayTypeSchema, BuildCustomSchema } from "../../types";
import withWhen from "../withWhen";

yup.addMethod(yup.array, "maxWhen", function isValid(data, message) {
  return this.test("maxWhen", message, (list) => {
    const { value: max, when: whenCondition } = data;

    if (!list) return false;

    const filterList = list.filter((x) => when({ item: x }, whenCondition));

    if (filterList.length > max) return false;

    return true;
  });
});

yup.addMethod(yup.array, "minWhen", function isValid(data, message) {
  return this.test("minWhen", message, (list) => {
    const { value: min, when: whenCondition } = data;

    if (!list) return false;

    const filterList = list.filter((x) => when({ item: x }, whenCondition));

    if (filterList.length < min) return false;

    return true;
  });
});

yup.addMethod(yup.array, "unique", function isValid(property, message) {
  if (!property) {
    return this.test("unique", () => {
      return true;
    });
  }

  return this.test("unique", message, (list) => {
    const filtered = list ? list.filter(Boolean) : [];

    if (filtered.length !== uniq(filtered).length) {
      return false;
    }
  });
});

yup.addMethod(yup.array, "uniqueBy", function isValid(property, message) {
  const mapper = (obj: []) => get(obj, property);

  // test only not empty item
  return this.test("uniqueBy", message, (list, context) => {
    const filtered = list ? list.map(mapper).filter(Boolean) : [];

    // return with path of object
    if (filtered.length !== uniq(filtered).length) {
      return context.createError({ message });
    }

    return true;
  });
});

type ArrayOf = ArraySchema<any, any, "", "">;

const toYupArray = <T extends yup.AnyObject>(
  jsonSchema: ArrayTypeSchema,
  forceRequired?: boolean,
  builder?: BuildCustomSchema
): ArrayOf => {
  let yupSchema = yup.array<yup.Maybe<T>>() as any;

  if (jsonSchema.of != null) {
    yupSchema = withOf(yupSchema, jsonSchema, forceRequired, builder);
  }

  if (jsonSchema.label) {
    yupSchema = yupSchema.label(jsonSchema.label);
  }

  if (jsonSchema.required === true || forceRequired === true) {
    yupSchema = withRequired(yupSchema, jsonSchema);
  }

  yupSchema = withWhen(yupSchema, jsonSchema.when as any);

  if (jsonSchema.nullable != null) {
    yupSchema = withNullable(yupSchema, jsonSchema);
  }

  if (jsonSchema?.errors?.typeError != null) {
    yupSchema = withTypeError(yupSchema as any, jsonSchema);
  }

  if (jsonSchema.strict) {
    yupSchema = yupSchema.strict(jsonSchema.strict);
  }

  const errors = jsonSchema.errors;

  if (jsonSchema.min) {
    yupSchema = yupSchema.min(jsonSchema.min, get(errors, "min"));
  }
  if (jsonSchema.max) {
    yupSchema = yupSchema.min(jsonSchema.max, get(errors, "max"));
  }

  if (jsonSchema.unique) {
    yupSchema = yupSchema.min(jsonSchema.unique, get(errors, "unique"));
  }
  if (jsonSchema.uniqueBy) {
    yupSchema = yupSchema.min(jsonSchema.uniqueBy, get(errors, "uniqueBy"));
  }
  if (jsonSchema.minWhen) {
    yupSchema = withMinWhen(
      yupSchema,
      jsonSchema.minWhen,
      get(errors, "withMinWhen")
    );
  }

  if (jsonSchema.maxWhen) {
    yupSchema = withMaxWhen(
      yupSchema,
      jsonSchema.maxWhen,
      get(errors, "maxWhen")
    );
  }

  return yupSchema;
};

function withMinWhen(schema: any, when: any, error?: string): ArrayOf {
  return schema.minWhen(when, error);
}
function withMaxWhen(schema: any, when: any, error?: string): ArrayOf {
  return schema.maxWhen(when, error);
}

function withOf(
  schema: ArrayOf,
  jsonSchema: ArrayTypeSchema,
  forceRequired: boolean | undefined,
  builder: BuildCustomSchema | undefined
): ArrayOf {
  if (!jsonSchema.of) {
    throw new Error("value error");
  }

  return schema.of(toYup(jsonSchema.of, forceRequired, builder) as Schema<any>);
}

function withRequired(schema: ArrayOf, jsonSchema: ArrayTypeSchema): ArrayOf {
  return schema.required(jsonSchema?.errors?.required);
}

function withNullable(schema: ArrayOf, jsonSchema: ArrayTypeSchema): ArrayOf {
  return schema.nullable(jsonSchema.nullable as any);
}

export default toYupArray;
