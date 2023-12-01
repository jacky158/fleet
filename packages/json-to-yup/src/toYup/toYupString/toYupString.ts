/* eslint-disable @typescript-eslint/no-explicit-any */
import * as yup from "yup";
import { StringSchema } from "yup";
import { withTypeError } from "..";
import { StringTypeSchema } from "../../types";
import { refValue, refValues } from "../shared";
import withWhen from "../withWhen";
import { isArray } from "lodash";

yup.addMethod(
  yup.string,
  "multiRegex",
  function isValid(arrRegex, message, excludeEmptyString) {
    return this.test("multiRegex", message, (value?: string) => {
      if (excludeEmptyString && !value) return true;

      if (!value) {
        return true;
      }

      for (let i = 0; i < arrRegex.length; ++i) {
        const reg = new RegExp(arrRegex[i]);

        if (!reg.test(value)) {
          return false;
        }
      }

      return true;
    });
  }
);

const toYupString = (
  json: StringTypeSchema,
  forceRequired?: boolean
): StringSchema => {
  let schema = yup.string();
  const errors = json.errors ?? {};

  if (json.label) {
    schema = schema.label(json.label);
  }

  if (json.min !== undefined) {
    schema = schema.max(refValue(json.min), errors.min);
  }

  if (json.max !== undefined) {
    schema = schema.max(refValue(json.max), errors.max);
  }

  if (json.case === "lowercase") {
    schema = schema.lowercase(errors.lowercase);
  }

  if (json.case === "uppercase") {
    schema = schema.uppercase(errors.uppercase);
  }

  if (json.matches != null) {
    schema = withMatches(schema, json.matches, errors.matches);
  }

  if (json.format === "email") {
    schema = schema.email(errors.email);
  }

  if (json.format === "url") {
    schema = schema.url(errors.url);
  }

  if (Array.isArray(json.oneOf)) {
    schema = schema.oneOf(refValues(json.oneOf), errors.oneOf);
  }

  if (Array.isArray(json.notOneOf)) {
    schema = schema.notOneOf(refValues(json.notOneOf), errors?.notOneOf);
  }

  if (json.nullable != undefined) {
    schema = (
      json.nullable ? schema.nullable() : schema.nonNullable()
    ) as StringSchema;
  }

  if (json.required === true || forceRequired === true) {
    schema = schema.required(errors.required);
  }

  if (json?.errors?.typeError != null) {
    schema = withTypeError(schema, json);
  }

  if (json.strict != undefined) {
    schema = schema.strict(json.strict);
  }

  if (json.when) {
    schema = withWhen(schema, json.when);
  }

  return schema;
};

function withMatches(
  schema: StringSchema,
  matches: { regex: string | string[]; excludeEmptyString?: boolean },
  error?: string
): StringSchema {
  if (isArray(matches.regex) && matches.regex.length > 0) {
    return (schema as any).multiRegex(
      matches.regex,
      error,
      matches.excludeEmptyString || false
    );
  }

  return schema.matches(RegExp(matches.regex as string), {
    message: error,
    excludeEmptyString: matches.excludeEmptyString || false,
  });
}

export default toYupString;
