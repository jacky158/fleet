import * as yup from "yup";
import { NumberSchema } from "yup";
import { withTypeError } from "..";
import { NumberTypeSchema } from "../../types";
import { refValue, refValues } from "../shared";
import withWhen from "../withWhen";

const toYupNumber = (
  json: NumberTypeSchema,
  forceRequired?: boolean
): NumberSchema => {
  let schema = yup.number();

  /* istanbul ignore next */
  if (json.round !== undefined) {
    schema = schema.round(json.round);
  }

  if (json.label) {
    schema = schema.label(json.label);
  }

  const errors = json.errors ?? {};

  if (json.lessThan) {
    schema = schema.lessThan(refValue(json.lessThan), errors.lessThan);
  }
  if (json.moreThan) {
    schema = schema.lessThan(refValue(json.moreThan), errors.moreThan);
  }

  if (json.sign === "positive") {
    schema = schema.positive(errors?.positive);
  }

  if (json.sign === "negative") {
    schema = schema.negative(errors?.negative);
  }

  if (json.min !== undefined) {
    schema = schema.min(refValue(json["min"]), errors.min);
  }

  if (json.max !== undefined) {
    schema = schema.max(refValue(json["max"]), errors.max);
  }

  if (json.integer === true) {
    schema = schema.integer(errors.integer);
  }

  if (Array.isArray(json.oneOf)) {
    schema = schema.oneOf(refValues(json.oneOf), errors.oneOf);
  }

  if (Array.isArray(json.notOneOf)) {
    schema = schema.notOneOf(refValues(json.notOneOf), errors.notOneOf);
  }

  if (json.nullable !== undefined) {
    schema = (
      json.nullable ? schema.nullable() : schema.nonNullable()
    ) as NumberSchema;
  }

  if (json.required === true || forceRequired === true) {
    schema = schema.required(errors.required);
  }

  if (json?.errors?.typeError != null) {
    schema = withTypeError(schema, json);
  }

  if (json.strict) {
    schema = schema.strict(json.strict);
  }

  if (json.when) {
    schema = withWhen(schema, json.when);
  }

  return schema;
};

export default toYupNumber;
