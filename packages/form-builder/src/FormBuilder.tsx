import { useEffect, useState } from "react";

import Form from "./Form";
import {
  FormBuilderProps,
  FormBuilderSchema,
  FormBuilderRemoteProps,
} from "./types";
import { RemoteDataSource } from "@ikx/types";
import { useApp } from "@ikx/core";

export function RemoteForm({
  source,
  modal,
  params,
  onLoaded,
  onFailure,
  hideWhenError = false,
  // loadingComponent,
  preventReload = false,
  ...rest
}: FormBuilderRemoteProps) {
  const app = useApp();
  const [schema, setSchema] = useState<FormBuilderSchema>();

  // const Loading =
  //   loadingComponent ?? dialog
  //     ? app.jsx.get("form.DialogLoadingComponent")
  //     : app.jsx.get("form.DefaultLoading");

  const [data, loading, error, , meta] = app.useFetch({
    source: source as RemoteDataSource,
    params,
    forceReload: true,
    preventReload,
  });

  useEffect(() => {
    if (!error) return;

    if (!modal) {
      app.modal.pop();
    }

    typeof onFailure === "function" && onFailure(error);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    if (data) {
      setSchema(data as FormBuilderSchema);

      if (onLoaded) {
        onLoaded({ data, meta });
      }
    } else {
      setSchema(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, params, loading]);

  if ((error && hideWhenError) || !source) return null;

  if (!schema) return null;

  return <Form {...rest} modal={modal} schema={schema} params={params} />;
}
export function FormBuilder(props: FormBuilderRemoteProps | FormBuilderProps) {
  if ((props as FormBuilderProps).schema?.elements) {
    return <Form {...(props as FormBuilderProps)} />;
  }

  return <RemoteForm {...props} />;
}

export default FormBuilder;
