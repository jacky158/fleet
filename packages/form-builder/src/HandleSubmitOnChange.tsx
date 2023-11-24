import { FormikProps, FormikValues, useFormikContext } from "formik";
import debounce from "lodash/debounce";
import { useEffect, useMemo } from "react";

// number of millisecond to for debounce update.
// it's may be pass as a props of schema.
const WAIT_DEBOUNCE_SUBMIT: number = 200;

export function HandleSubmitOnChange() {
  const formik = useFormikContext<FormikValues>();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const debounce_fn = useMemo(() => {
    return debounce((mounted, formik: FormikProps<FormikValues>) => {
      if (
        !mounted ||
        formik.isSubmitting ||
        (!formik.dirty && formik.submitCount === 0) ||
        !formik.touched
      ) {
        return;
      }

      formik.submitForm().finally(() => {
        // console.log('submit debounce_fn ?');
      });
    }, WAIT_DEBOUNCE_SUBMIT);
  }, []);

  // WARNING:  do not add formik.touch to dependencies.
  useEffect(() => {
    let mounted = true;

    debounce_fn(mounted, formik);

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formik.values]);

  return null;
}

export default HandleSubmitOnChange;
