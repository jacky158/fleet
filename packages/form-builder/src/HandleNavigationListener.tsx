import { ConfirmProps } from "@ikx/types";
import { FormikProps, FormikValues } from "formik";
import { useEffect } from "react";
import { FormBuilderSchema } from "./types";
import { useApp } from "@ikx/core";

type Props = {
  schema: FormBuilderSchema;
  formik: FormikProps<FormikValues>;
  confirm?: ConfirmProps | boolean;
  dialog: boolean;
  onReset?: () => void;
};

export function HandleNavigationListener(props: Props) {
  const app = useApp();
  const { schema, dialog, formik, confirm } = props;
  const i18n = app.intl;

  const confirmInfo = {
    message: i18n.formatMessage({
      id: "if_you_leave_form_no_save_changed",
    }),
    title: i18n.formatMessage({
      id: "leave_page",
    }),
    negativeButton: {
      label: i18n.formatMessage({
        id: "keep_editing",
      }),
    },
    positiveButton: {
      label: i18n.formatMessage({
        id: "leave",
      }),
    },
  };
  const confirmParams =
    confirm ?? schema?.navigationConfirmWhenDirty ?? confirmInfo;

  useEffect(() => {
    const shouldConfirm =
      /post|put/i.test(schema.method) &&
      formik.dirty &&
      Object.keys(formik.touched).length > 0;

    if (dialog) {
      app.modal.setUserConfirm(shouldConfirm, confirmParams);
    } else {
      app.setNavigationConfirm(shouldConfirm, confirmParams);
    }

    return () => {
      if (shouldConfirm) {
        app.setNavigationConfirm(false);
      }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.dirty, formik.touched]);

  return null;
}
