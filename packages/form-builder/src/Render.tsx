import when, { WhenProps } from "@ikx/when";
import { useFormikContext } from "formik";
import { createElement, useEffect, useState } from "react";
import { BuilderFieldProps } from "./types";
import { useApp } from "@ikx/core";

export function Render({ config, formik }: BuilderFieldProps) {
  const app = useApp();
  const {
    component,
    name,
    enabledWhen,
    showWhen,
    requiredWhen,
    acceptWhen,
    accept,
  } = config;
  const { values } = useFormikContext();
  const [show, setShow] = useState(!showWhen);
  const [enabled, setEnabled] = useState(!enabledWhen);
  const [required, setRequired] = useState(!requiredWhen);
  const [acceptTypeFile, setAcceptTypeFile] = useState(accept);
  const mediaScreen = "small";

  /**
   * When the values have changed process conditions on fields,
   * to decide whether to show and/or enable them or not.
   */
  const acceptFunction = () => {
    try {
      for (const [type, conditions] of Object.entries(acceptWhen)) {
        return when(values as Record<string, unknown>, conditions as WhenProps)
          ? type
          : accept;
      }
    } catch (err) {
      return accept;
    }
  };

  useEffect(() => {
    Promise.all([
      showWhen
        ? when({ ...(values as object), mediaScreen }, showWhen as WhenProps)
        : true,
      enabledWhen ? when(values, enabledWhen as WhenProps) : true,
      requiredWhen ? when(values, requiredWhen) : false,
      acceptWhen ? acceptFunction() : accept,
    ]).then(([show, enabled, required, acceptResult]) => {
      setShow(show);
      setEnabled(enabled);
      setRequired(required);
      setAcceptTypeFile(acceptResult);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    values,
    enabledWhen,
    showWhen,
    requiredWhen,
    required,
    accept,
    acceptWhen,
  ]);

  if (!show) {
    return null;
  }

  const FieldComponent = app.jsx.get(`form.element.${component}`);

  if (!FieldComponent) {
    return null;
  }

  return createElement(FieldComponent, {
    config,
    name,
    disabled: !enabled,
    required,
    acceptTypeFile,
    formik,
  });
}

export default Render;
