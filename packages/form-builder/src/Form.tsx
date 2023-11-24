import { toYup } from "@ikx/json-to-yup";
import { ConfirmProps } from "@ikx/types";
import { Formik, FormikConfig, FormikValues } from "formik";
import { get, isPlainObject, set } from "lodash";
import React from "react";
import FormSchemaContext from "./Context";
import Element from "./Element";
import HandleAlertError from "./HandleAlertError";
import { HandleNavigationListener } from "./HandleNavigationListener";
import HandleSubmitOnChange from "./HandleSubmitOnChange";
import HandleUpdateCallback from "./HandleUpdateCallback";
import transformSchema from "./transformSchema";
import { FormBuilderProps, FormBuilderSchema } from "./types";

export function Form<T extends FormikValues = FormikValues>({
  schema: formSchemaRaw,
  name: formName,
  initialValues,
  onChange,
  onUpdate,
  onSubmit,
  modal: dialog,
  params: pageParams,
  dialogEmbedItem,
  navigationConfirmWhenDirty,
}: FormBuilderProps<T>) {
  // check values here
  const values: T = (
    initialValues
      ? { ...initialValues }
      : formSchemaRaw.value
      ? { ...formSchemaRaw.value }
      : {}
  ) as T;

  /**
   * transform schema here
   */
  const schema: FormBuilderSchema = React.useMemo(() => {
    const formSchema = transformSchema(
      formSchemaRaw as unknown as Record<string, unknown>,
      values,
      dialog
    );

    if (formName) {
      formSchema.name = formName;
    }

    if (dialogEmbedItem) {
      formSchema.dialogEmbedItem = dialogEmbedItem;
    }

    if (formSchema.acceptPageParams?.length) {
      formSchema.acceptPageParams.forEach((x) => {
        const v = get(pageParams, x);

        if (v !== undefined && v !== "") {
          set(values as object, x, v);
        }
      });
    }

    return formSchema;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formSchemaRaw, pageParams]);

  const validationSchema = React.useMemo(() => {
    const validation = formSchemaRaw?.validation;

    if (validation && isPlainObject(validation)) {
      try {
        return toYup(JSON.parse(JSON.stringify(formSchemaRaw.validation)));
      } catch (err) {
        //
      }
    }
  }, [formSchemaRaw]);

  const confirm =
    navigationConfirmWhenDirty ?? schema.navigationConfirmWhenDirty;

  return (
    <FormSchemaContext.Provider value={schema}>
      <Formik
        validationSchema={validationSchema}
        initialValues={values as T}
        onSubmit={onSubmit as FormikConfig<T>["onSubmit"]}
        enableReinitialize
      >
        <>
          <Element {...schema} />
          {confirm ? (
            <HandleNavigationListener
              schema={schema}
              confirm={confirm as ConfirmProps}
              dialog={false}
            />
          ) : null}
          {schema.submitOnValueChanged ? <HandleSubmitOnChange /> : null}
          {schema.alertPreSubmitError ? (
            <HandleAlertError
              alertPreSubmitError={schema.alertPreSubmitError}
            />
          ) : null}
          {onChange || onUpdate ? (
            <HandleUpdateCallback
              schema={schema}
              onUpdate={onUpdate}
              onChange={onChange}
            />
          ) : null}
        </>
      </Formik>
    </FormSchemaContext.Provider>
  );
}

export default Form;
