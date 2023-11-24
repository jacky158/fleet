/**
 * @type: route
 * @name: user.settings
 * @path: /settings
 * @parent: user
 */
import FormBuilder from "@ikx/form-builder";
export default function Route() {
  return (
    <>
      User Settings
      <FormBuilder
        schema={{
          component: "Form",
          method: "POST",
          elements: {
            form: {
              component: "Form",
              name: "blog",
            },
          },
        }}
      />
    </>
  );
}
