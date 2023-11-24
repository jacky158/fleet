import { toYup } from "@ikx/json-to-yup";
import { Formik, FormikConfig, FormikProps, FormikValues } from "formik";
import { get, isPlainObject, set } from "lodash";
import React from "react";
import HandleAlertError from "./HandleAlertError";
import { HandleNavigationListener } from "./HandleNavigationListener";
import HandleSubmitOnChange from "./HandleSubmitOnChange";
import HandleUpdateCallback from "./HandleUpdateCallback";
import transformSchema from "./transformSchema";
import { FormBuilderProps, FormBuilderSchema } from "./types";
import { ConfirmProps } from "@ikx/types";
import Element from "./Element";
import FormSchemaContext from "./Context";

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
  const formSchema: FormBuilderSchema = React.useMemo(() => {
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
    navigationConfirmWhenDirty ?? formSchema.navigationConfirmWhenDirty;

  return (
    <FormSchemaContext.Provider value={formSchema}>
      <Formik
        validationSchema={validationSchema}
        initialValues={values as T}
        onSubmit={onSubmit as FormikConfig<T>["onSubmit"]}
        enableReinitialize
      >
        {(props) => (
          <>
            <Element
              config={formSchema}
              formik={props as unknown as FormikProps<FormikValues>}
            />
            {confirm ? (
              <HandleNavigationListener
                schema={formSchema}
                formik={props as unknown as FormikProps<FormikValues>}
                confirm={confirm as ConfirmProps}
                dialog={false}
              />
            ) : null}
            {formSchema.submitOnValueChanged ? (
              <HandleSubmitOnChange
                formik={props as unknown as FormikProps<FormikValues>}
              />
            ) : null}
            {formSchema.alertPreSubmitError ? (
              <HandleAlertError
                formik={props as unknown as FormikProps<FormikValues>}
                alertPreSubmitError={formSchema.alertPreSubmitError}
              />
            ) : null}
            {onChange || onUpdate ? (
              <HandleUpdateCallback
                formik={props as unknown as FormikProps<FormikValues>}
                schema={formSchema}
                onUpdate={onUpdate}
                onChange={onChange}
              />
            ) : null}
          </>
        )}
      </Formik>
    </FormSchemaContext.Provider>
  );
}

export default Form;
