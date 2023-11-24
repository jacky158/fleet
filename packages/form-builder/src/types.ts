/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikHelpers, FormikProps, FormikValues } from "formik";
import { FetchDataConfig, RemoteDataSource, ViewName } from "@ikx/types";
import React from "react";
export type BuilderElementType = "field" | "container" | undefined;
import { ConfirmProps } from "@ikx/types";
import { WhenProps } from "@ikx/when";

export interface ElementProps<
  C = object,
  D extends FormikValues = FormikValues
> {
  config: C & BaseElement;
  formik: FormikProps<D>;
  disabled?: boolean;
  required?: boolean;
}

export interface BaseElement {
  testid?: string;
  component?: string;
  name: string;
  label?: string;
  description?: string;
  placeholder?: string;
  required?: boolean;
  showWhen?: unknown;
  enabledWhen?: WhenProps;
  requiredWhen?: WhenProps;
  tagName?: string;
  elements?: Record<string, BaseElement>;
  labelProps?: { shrink?: boolean; [key: string]: any };
  [key: string]: unknown;
}

export type BreadcrumbsShape = {
  label: string;
  link: string;
  separator?: string;
}[];

export interface ResetFormSuccessParams {
  keepValues?: unknown;
}

export interface FormBuilderSchema {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH" | string;
  dialog?: boolean;
  noBreadcrumb?: boolean;
  breadcrumbs?: BreadcrumbsShape;
  noHeader?: boolean;
  acceptPageParams?: string[]; // which page params can be merged to form initialValues, allow dot separator props.
  successAction?: string;
  backProps?: { label: string; url?: string };
  failureAction?: string;
  submitUrl?: string;
  submitOnValueChanged?: boolean;
  keepPaginationData?: boolean;
  alertPreSubmitError?: string | boolean;
  elements: Record<string, any>;
  navigationConfirmWhenDirty?: unknown;
  validation?: unknown;
  dialogEmbedItem?: unknown;
  value?: object;
  component: ViewName;
  name?: string;
}

interface FormBuilderBase<T = FormikValues> {
  readonly initialValues?: T;
  readonly submitAction?: string;
  readonly successAction?: string;
  readonly failureAction?: string;
  readonly modal?: boolean; // present form as dialog
  readonly changeEventName?: string; // see evenCenter.dispatch
  readonly validationSchema?: unknown;
  readonly params?: FetchDataConfig["params"];
  readonly resetFormWhenSuccess?: boolean | ResetFormSuccessParams;
  readonly keepPaginationData?: boolean;
  readonly dialogEmbedItem?: React.FunctionComponent;
  readonly navigationConfirmWhenDirty?: ConfirmProps | boolean;
  readonly onUpdate?: (values: unknown) => void;
  readonly onSubmit?: (
    values: T,
    formikHelpers: FormikHelpers<T>
  ) => void | Promise<any>;
  readonly onChange?: (values: unknown) => void;
  readonly onCancel?: () => void;
  readonly onSubmitting?: () => void;
  readonly onSuccess?: (values?: unknown) => void;
  readonly onFailure?: (error: unknown) => void;
}

export interface FormRefHandler {
  submit: () => void;
}

export interface FormBuilderProps<T = FormikValues> extends FormBuilderBase<T> {
  readonly name?: string; // overwrite form name
  readonly schema: FormBuilderSchema;
  readonly validateOnMount?: boolean;
  readonly ref?: React.MutableRefObject<FormRefHandler>;
  readonly disableFormOnSuccess?: boolean;
}

export interface FormBuilderRemoteProps<T = FormikValues>
  extends FormBuilderBase<T> {
  readonly onLoaded?: (data: { data: unknown; meta: unknown }) => void;
  readonly onFailure?: (error: unknown) => void;
  readonly source?: RemoteDataSource;
  readonly params?: FetchDataConfig["params"];
  readonly loadingComponent?: JSX.Element;
  readonly forceReload?: boolean;
  readonly preventReload?: boolean;
  readonly hideWhenError?: boolean;
}
