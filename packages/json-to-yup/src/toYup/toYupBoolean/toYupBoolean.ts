import { isArray } from "lodash";
import * as yup from "yup";
import { BooleanSchema } from "yup";
import { BooleanTypeSchema } from "../../types";
import withWhen from "../withWhen";

const toYupBoolean = (
  json: BooleanTypeSchema,
  forceRequired?: boolean
): BooleanSchema => {
  let schema = yup.boolean();

  const errors = json.errors ?? {};

  if (json.label) {
    schema = schema.label(json.label);
  }

  if (isArray(json.oneOf)) {
    schema = schema.oneOf(schema.oneOf as any, errors.oneOf);
  }

  if (Array.isArray(json.notOneOf)) {
    schema = schema.notOneOf(json.notOneOf, errors.notOneOf);
  }

  if (json.nullable != null) {
    if (json.nullable) {
      schema = schema.nullable() as BooleanSchema;
    } else {
      schema = schema.nonNullable() as BooleanSchema;
    }
  }

  if (json.required === true || forceRequired === true) {
    schema = schema.required(errors.required);
  }

  if (errors.typeError != null) {
    schema = schema.typeError(errors.typeError);
  }

  if (json.strict != undefined) {
    schema = schema.strict(!!json.strict);
  }

  if (json.when) {
    schema = withWhen(schema, json.when);
  }

  return schema;
};

export default toYupBoolean;
