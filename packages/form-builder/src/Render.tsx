import { useApp } from "@ikx/core";
import when from "@ikx/when";
import { useFormikContext } from "formik";
import { createElement, useEffect, useState } from "react";
import { RenderProps } from "./types";

export function Render(allProps: RenderProps) {
  const app = useApp();
  const { component, enabledWhen, showWhen, requiredWhen, ...props } = allProps;
  const { values } = useFormikContext();
  const [show, setShow] = useState(!showWhen);
  const [enabled, setEnabled] = useState(!enabledWhen);
  const [required, setRequired] = useState(!requiredWhen);
  const mediaScreen = "small";

  useEffect(() => {
    Promise.all([
      showWhen ? when({ ...(values as object), mediaScreen }, showWhen) : true,
      enabledWhen ? when(values, enabledWhen) : true,
      requiredWhen ? when(values, requiredWhen) : false,
    ]).then(([show, enabled, required]) => {
      setShow(show);
      setEnabled(enabled);
      setRequired(required);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values, enabledWhen, showWhen, requiredWhen, required]);

  if (!show) {
    return null;
  }

  const FieldComponent = app.jsx.get(`form.element.${component}`);

  if (!FieldComponent) {
    return null;
  }

  return createElement(FieldComponent, {
    disabled: !enabled,
    required,
    ...props,
  });
}

export default Render;
