import { useEffect, useState } from "react";

import Form from "./Form";
import {
  FormBuilderProps,
  FormBuilderSchema,
  FormBuilderRemoteProps,
} from "./types";
import { RemoteDataSource } from "@ikx/types";
import { useApp } from "@ikx/core";

export default function RemoteForm({
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
  const [formSchema, setFormSchema] = useState<FormBuilderSchema>();

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
      setFormSchema(data as FormBuilderSchema);

      if (onLoaded) {
        onLoaded({ data, meta });
      }
    } else {
      setFormSchema(undefined);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, params, loading]);

  if ((error && hideWhenError) || !source) return null;

  if (!formSchema) return null;

  return <Form {...rest} modal={modal} schema={formSchema} params={params} />;
}
export function FormBuilder(props: FormBuilderRemoteProps | FormBuilderProps) {
  if ((props as FormBuilderProps).schema?.elements) {
    return <Form {...(props as FormBuilderProps)} />;
  }

  return <RemoteForm {...props} />;
}
