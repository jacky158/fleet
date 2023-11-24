import when, { WhenProps } from "@ikx/when";
import { useFormikContext } from "formik";
import { createElement, useEffect, useState } from "react";
import { ElementProps } from "./types";
import { useApp } from "@ikx/core";

export function Render({ config, formik }: Omit<ElementProps, "name">) {
  const app = useApp();
  const { component, enabledWhen, showWhen, requiredWhen } = config;
  const { values } = useFormikContext();
  const [show, setShow] = useState(!showWhen);
  const [enabled, setEnabled] = useState(!enabledWhen);
  const [required, setRequired] = useState(!requiredWhen);
  const mediaScreen = "small";

  useEffect(() => {
    Promise.all([
      showWhen
        ? when({ ...(values as object), mediaScreen }, showWhen as WhenProps)
        : true,
      enabledWhen ? when(values, enabledWhen as WhenProps) : true,
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
    config,
    disabled: !enabled,
    required,
    formik,
  });
}

export default Render;
