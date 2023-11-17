import * as yup from "yup";
import { AnyObject, AnyObjectSchema, AnySchema, ObjectSchema } from "yup";
import { toYup } from "..";
import { BuildCustomSchema, ObjectTypeSchema } from "../../types";
import withWhen from "../withWhen";

yup.addMethod(yup.object, "uniqueBy", function isValid(propertyName, message) {
  return this.test("uniqueBy", message, (value, ctx) => {
    const { path } = ctx;
    const options = [...ctx.parent];
    const currentIndex = options.indexOf(value);

    const subOptions = options.slice(0, currentIndex);

    if (
      subOptions.some(
        (option) =>
          option &&
          option[propertyName] &&
          option[propertyName] === value[propertyName]
      )
    ) {
      return ctx.createError({
        path: `${path}.${propertyName}`,
        message,
      });
    }

    return true;
  });
});

const toYupObject = (
  json: ObjectTypeSchema,
  forceRequired?: boolean,
  builder?: BuildCustomSchema
): AnyObjectSchema => {
  const fields: Record<string, AnySchema> = {};
  const fieldNames = Object.keys(json.properties);

  fieldNames.forEach((fieldName: string) => {
    const ok = toYup(json.properties[fieldName], forceRequired, builder);
    if (ok) {
      fields[fieldName] = ok;
    }
  });

  let schema = yup.object<AnyObject>(fields);

  if (json.uniqueBy) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    schema = (schema as any).uniqueBy(json.uniqueBy, json.errors?.uniqueBy);
  }

  if (json.required === true || forceRequired === true) {
    schema = schema.required(json.errors?.required);
  }

  if (json.nullable !== undefined) {
    schema = (
      json.nullable ? schema.nullable() : schema.nonNullable()
    ) as ObjectSchema<AnyObject>;
  }

  if (json.strict != undefined) {
    schema.strict(!!json.strict);
  }

  if (json.when) {
    schema = withWhen(schema, json.when);
  }

  if (json?.errors?.typeError) {
    schema = schema.typeError(json?.errors?.typeError);
  }

  return schema;
};

export default toYupObject;
