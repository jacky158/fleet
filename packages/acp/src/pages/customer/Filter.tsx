import { MuiIcon } from "@ikx/mui";
import { FilterProps } from "@ikx/types";
import { IconButton } from "@mui/material";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";

export function GridFilter({ value, onSubmit }: FilterProps) {
  const formik = useFormik({
    initialValues: value,
    onSubmit(values, helpers) {
      onSubmit(values, helpers);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} style={{ paddingBottom: 16 }}>
      <Grid container rowSpacing={1} columnSpacing={1}>
        <Grid item>
          <TextField
            name="name"
            label="Name"
            size="small"
            fullWidth={false}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Grid>
        {formik.values._expand ? (
          <>
            <Grid item>
              <TextField
                name="email"
                label="Email"
                size="small"
                fullWidth={false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
            <Grid item>
              <TextField
                name="date"
                label="Date"
                size="small"
                fullWidth={false}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
            </Grid>
          </>
        ) : null}
        <Grid item>
          <IconButton type="submit" color="inherit">
            <MuiIcon name="search" />
          </IconButton>
          <IconButton
            color="inherit"
            className="srOnly"
            disableRipple
            onClick={() =>
              formik.setValues((prev) => ({
                ...prev,
                _expand: !prev._expand,
              }))
            }
          >
            <MuiIcon name="collapse_content" />
          </IconButton>
          <input type="submit" className="srOnly" />
        </Grid>
      </Grid>
    </form>
  );
}

export default GridFilter;
