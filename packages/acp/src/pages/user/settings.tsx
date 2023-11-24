/**
 * @type: route
 * @name: user.settings
 * @path: /settings
 * @parent: user
 */
import FormBuilder from "@ikx/form-builder";
import { FormikValues } from "formik";
import { useState } from "react";
export default function Route() {
  const [values, setValues] = useState<FormikValues>();
  return (
    <>
      User Settings
      <FormBuilder
        initialValues={{
          password: "1234",
        }}
        onSubmit={(values) => setValues(values)}
        schema={{
          component: "Form",
          method: "POST",
          elements: {
            text: {
              component: "Text",
              name: "username",
              placeholder: "Nam Nguyen",
            },
            text2: {
              component: "TextArea",
              name: "biography",
              placeholder: "Nam Nguyen",
            },
            birthday2: {
              component: "Date",
              name: "birthday",
            },
            DatePicker: {
              component: "DatePicker",
              name: "birthday2",
            },
            primary_main: {
              component: "ColorPicker",
              name: "primary.main",
            },
            password: {
              component: "Password",
              name: "password",
            },
            switch: {
              component: "Switch",
              label: "Dense",
              name: "dense",
            },
            terms: {
              component: "Checkbox",
              label: "Term Of Use",
              name: "terms",
            },
            voted: {
              component: "Rating",
              label: "voted",
              name: "voted",
            },
            slider: {
              component: "Slider",
              label: "voted",
              name: "slider",
            },
            btn: {
              component: "Submit",
              label: "Submit",
            },
          },
        }}
      />
      <pre>{JSON.stringify(values)}</pre>
    </>
  );
}
