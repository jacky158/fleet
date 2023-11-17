import { endOfYear, parse, startOfYear, subMonths } from "date-fns";
import { get } from "lodash";
import * as yup from "yup";
import { DateSchema } from "yup";
import { valueToDate } from "../../lib/date";
import { DateTypeSchema } from "../../types";
import { refValue } from "../shared";
import withWhen from "../withWhen";

const toYupDate = (
  json: DateTypeSchema,
  forceRequired?: boolean
): DateSchema => {
  let schema = yup.date();
  const errors = json.errors ?? {};

  if (json.inputFormat !== undefined) {
    schema = schema.transform((value, originalValue) => {
      if (typeof originalValue === "string" && json.inputFormat != null) {
        try {
          return parse(originalValue, json.inputFormat, new Date());
        } catch (e) {
          return null;
        }
      }

      return value;
    });
  }

  if (json.label) {
    schema = schema.label(json.label);
  }

  if (json.min) {
    schema = withMin(schema, json);
  }

  if (json.max) {
    schema = withMax(schema, json);
  }

  if (json.minYear) {
    schema = withMinYear(schema, json);
  }

  if (json.maxYear) {
    schema = withMaxYear(schema, json);
  }

  if (json.minAgeMonths !== undefined) {
    schema = withMinAgeMonths(schema, json);
  }

  if (json.maxAgeMonths !== undefined) {
    schema = withMaxAgeMonths(schema, json);
  }

  if (json.required === true || forceRequired === true) {
    schema = schema.required(errors.required);
  }

  if (errors.typeError !== undefined) {
    schema = schema.typeError(errors.typeError);
  }

  if (json.nullable !== undefined) {
    schema = (
      json.nullable ? schema.nullable() : schema.nonNullable()
    ) as DateSchema;
  }

  if (json.strict != undefined) {
    schema = schema.strict(json.strict);
  }

  if (json.when) {
    schema = withWhen(schema, json.when);
  }

  return schema;
};

function withMinDate(
  schema: DateSchema,
  dateValue: Date,
  errorMessage?: string
): DateSchema {
  return schema.min(dateValue, errorMessage);
}

function withMin(schema: DateSchema, jsonSchema: DateTypeSchema): DateSchema {
  const date = jsonSchema.min ? valueToDate(jsonSchema.min) : null;

  if (date != null) {
    return withMinDate(schema, date, jsonSchema?.errors?.min);
  }

  schema = schema["min"](
    refValue(jsonSchema["min"]),
    get(jsonSchema.errors, "min")
  );

  return schema;
}

function withMinYear(schema: DateSchema, json: DateTypeSchema): DateSchema {
  const date = json.minYear ? startOfYear(new Date(json.minYear)) : null;

  if (date != null) {
    return withMinDate(schema, date, json?.errors?.minYear);
  }

  return schema;
}

function withMaxYear(schema: DateSchema, json: DateTypeSchema): DateSchema {
  const date = json.maxYear ? endOfYear(new Date(json.maxYear)) : null;

  if (date != null) {
    return withMaxDate(schema, date, json?.errors?.maxYear);
  }

  return schema;
}

function withMaxDate(
  schema: DateSchema,
  value: Date,
  error?: string
): DateSchema {
  return schema.max(value, error);
}

function withMax(schema: DateSchema, json: DateTypeSchema): DateSchema {
  const date = json.max ? valueToDate(json.max) : null;

  if (date != null) {
    return withMaxDate(schema, date, json?.errors?.max);
  }

  schema = schema["max"](refValue(json["max"]), get(json.errors, "max"));

  return schema;
}

function withMinAgeMonths(
  schema: DateSchema,
  json: DateTypeSchema
): DateSchema {
  if (typeof json.minAgeMonths === "number") {
    const date = subMonths(new Date(), Math.round(json.minAgeMonths));
    // end of day so any date on that day is valid in the yup max check
    date.setHours(23);
    date.setMinutes(59);
    date.setSeconds(59);
    date.setMilliseconds(0);

    return withMaxDate(schema, date, json?.errors?.minAgeMonths);
  }

  return schema;
}

function withMaxAgeMonths(
  schema: DateSchema,
  json: DateTypeSchema
): DateSchema {
  if (typeof json.maxAgeMonths === "number") {
    const date = subMonths(new Date(), Math.round(json.maxAgeMonths));
    // start of day so any date on that day is valid in the yup min check
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return withMinDate(schema, date, json?.errors?.maxAgeMonths);
  }

  return schema;
}

export default toYupDate;
