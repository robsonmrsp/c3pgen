import { Button, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import DropZone from "components/DropZone";

// form field validation
const validationSchema = yup.object().shape({
  site_name: yup.string().required("site name is required"),
  site_description: yup.string().required("site description is required"),
  site_banner_text: yup.string().required("site banner text required"),
});
const GeneralForm = () => {
  const initialValues = {
    site_name: "",
    site_description: "",
    site_banner_text: "",
  };
  const handleFormSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Formik
      onSubmit={handleFormSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <DropZone
                onChange={(files) => console.log(files)}
                title="Drag & Drop Site Logo"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="site_name"
                label="Site Name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.site_name}
                error={!!touched.site_name && !!errors.site_name}
                helperText={touched.site_name && errors.site_name}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                onBlur={handleBlur}
                onChange={handleChange}
                name="site_description"
                label="Site Description"
                value={values.site_description}
                error={!!touched.site_description && !!errors.site_description}
                helperText={touched.site_description && errors.site_description}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                rows={6}
                fullWidth
                multiline
                color="info"
                size="medium"
                onBlur={handleBlur}
                name="site_banner_text"
                onChange={handleChange}
                label="Site Banner Text"
                value={values.site_banner_text}
                error={!!touched.site_banner_text && !!errors.site_banner_text}
                helperText={touched.site_banner_text && errors.site_banner_text}
              />
            </Grid>

            <Grid item xs={12}>
              <DropZone
                onChange={(files) => console.log(files)}
                title="Drag & Drop Site Banner Image"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            color="info"
            variant="contained"
            sx={{
              mt: 4,
            }}
          >
            Save Changes
          </Button>
        </form>
      )}
    </Formik>
  );
};
export default GeneralForm;
