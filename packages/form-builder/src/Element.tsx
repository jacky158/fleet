/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps, FormikValues, connect } from "formik";
import React from "react";
import { FormBuilderSchema } from "./types";
import Render from "./Render";

type ElementRendererProps = {
  formik: FormikProps<FormikValues>;
  config: FormBuilderSchema;
};

const ElementComponent = ({ config, formik }: ElementRendererProps) => {
  return <Render config={config as unknown as any} formik={formik} />;
};

export const Element: React.FC<ElementRendererProps> = connect(
  React.memo(
    ElementComponent,
    ({ config, formik }, nextProps) =>
      config === nextProps.config &&
      formik.initialValues === nextProps.formik.initialValues &&
      formik.isValidating === nextProps.formik.isValidating &&
      formik.isSubmitting === nextProps.formik.isSubmitting
  )
);

export default Element;
