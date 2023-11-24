import { useApp } from "@ikx/core";
import { ConfirmProps } from "@ikx/types";
import { useFormikContext } from "formik";
import { useEffect } from "react";
import { FormBuilderSchema } from "./types";

type Props = {
  schema: FormBuilderSchema;
  confirm?: ConfirmProps | boolean;
  dialog: boolean;
  onReset?: () => void;
};

export function HandleNavigationListener(props: Props) {
  const app = useApp();
  const formik = useFormikContext();
  const { schema, dialog, confirm } = props;
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
