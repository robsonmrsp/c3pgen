import { Fragment } from "react";
import { Delete } from "@mui/icons-material";
import { FieldArray, Formik } from "formik";
import { Button, Divider, Grid, IconButton, TextField } from "@mui/material";
import { H4 } from "components/Typography";
import { FlexBox } from "components/flex-box";
const TopbarForm = () => {
  const initialValues = {
    phone: "12345678910",
    email: "ui.lib.drive@gmail.com",
    links: [
      {
        id: 1,
        name: "Theme FAQ's",
        link: "https://www.themefaqs.com",
      },
      {
        id: 2,
        name: "Help",
        link: "https://www.help.com",
      },
    ],
  };
  const handleFormSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
      {({ values, handleChange, handleBlur, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <H4>Top Bar Left Content</H4>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                name="phone"
                color="info"
                size="medium"
                label="Phone"
                onBlur={handleBlur}
                value={values.phone}
                onChange={handleChange}
                placeholder="0000000000"
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                name="email"
                size="medium"
                label="Email"
                onBlur={handleBlur}
                value={values.email}
                onChange={handleChange}
                placeholder="email@example.com"
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <FieldArray
              name="links"
              render={(arrayHelper) => (
                <Fragment>
                  <Grid item xs={12}>
                    <FlexBox alignItems="center" justifyContent="space-between">
                      <H4>Top Bar Right</H4>

                      <Button
                        color="info"
                        variant="contained"
                        onClick={() => {
                          arrayHelper.push({
                            id: Date.now(),
                            name: "",
                            link: "",
                          });
                        }}
                      >
                        Add Item
                      </Button>
                    </FlexBox>
                  </Grid>

                  {values.links?.map((item, index) => (
                    <Grid item container spacing={2} key={item.id}>
                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          color="info"
                          size="medium"
                          label="Name"
                          value={item.name}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name={`links.${index}.name`}
                        />
                      </Grid>

                      <Grid item xs={5}>
                        <TextField
                          fullWidth
                          color="info"
                          size="medium"
                          label="Link"
                          value={item.link}
                          onBlur={handleBlur}
                          onChange={handleChange}
                          name={`links.${index}.link`}
                        />
                      </Grid>

                      <Grid item xs={2}>
                        <IconButton onClick={() => arrayHelper.remove(index)}>
                          <Delete />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                </Fragment>
              )}
            />
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
export default TopbarForm;
