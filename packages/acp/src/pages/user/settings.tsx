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
          validation: {
            type: "object",
            properties: {
              password: {
                type: "string",
                required: true,
                minLength: 5,
                maxLength: 64,
                label: "User Name",
              },
              username: {
                type: "string",
                required: true,
                minLength: 5,
                maxLength: 64,
                label: "User Name",
              },
              biography: {
                type: "string",
                required: true,
                minLength: 5,
                maxLength: 64,
                label: "Biography",
              },
              date1: {
                type: "date",
                required: true,
                strict: true,
                label: "Date",
              },
            },
          },
          elements: {
            text: {
              component: "Text",
              name: "username",
              placeholder: "Nam Nguyen",
              label: "User Name",
            },
            text2: {
              component: "TextArea",
              name: "biography",
              placeholder: "Nam Nguyen",
              label: "Description",
            },
            date2: {
              component: "Date",
              name: "birthday",
              label: "Birthday",
            },
            date1: {
              component: "DatePicker",
              name: "birthday2",
              label: "Date Picker",
            },
            primary_main: {
              component: "ColorPicker",
              name: "primary.main",
              label: "Color Picker",
            },
            password: {
              component: "Password",
              name: "password",
              label: "Password",
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
              label: "Voted",
              name: "voted",
            },
            slider: {
              component: "Slider",
              label: "Slider",
              name: "slider",
            },
            btn: {
              component: "Submit",
              label: "Submit",
            },
          },
        }}
      />
      <pre>{JSON.stringify(values, null, " ")}</pre>
    </>
  );
}
