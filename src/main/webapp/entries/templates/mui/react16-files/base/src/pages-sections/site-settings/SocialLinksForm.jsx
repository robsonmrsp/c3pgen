import { Formik } from "formik";
import { Facebook, Instagram, Twitter, YouTube } from "@mui/icons-material";
import { Button, Divider, Grid, TextField } from "@mui/material";
import AppleStore from "components/icons/AppleStore";
import PlayStore from "components/icons/PlayStore";
import { H4 } from "components/Typography";
const SocialLinksForm = () => {
  const initialValues = {
    facebook: "",
    twitter: "",
    instagram: "",
    linkedin: "",
    youtube: "",
    play_store: "",
    app_store: "",
  };
  const handleFormSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <H4>Social Links</H4>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="facebook"
                label="Facebook"
                value={values.facebook}
                onChange={handleChange}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <Facebook
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="twitter"
                label="Twitter"
                value={values.twitter}
                onChange={handleChange}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <Twitter
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="instagram"
                label="Instagram"
                onChange={handleChange}
                value={values.instagram}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <Instagram
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="youtube"
                label="Youtube"
                value={values.youtube}
                onChange={handleChange}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <YouTube
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item xs={12}>
              <Divider />
            </Grid>

            <Grid item xs={12}>
              <H4>App Links</H4>
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="play_store"
                label="Play Store"
                value={values.play_store}
                onChange={handleChange}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <PlayStore
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
              />
            </Grid>

            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                color="info"
                size="medium"
                name="app_store"
                label="App Store"
                value={values.app_store}
                onChange={handleChange}
                placeholder="https://example.com"
                InputProps={{
                  startAdornment: (
                    <AppleStore
                      fontSize="small"
                      color="info"
                      sx={{
                        mr: 1,
                      }}
                    />
                  ),
                }}
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
export default SocialLinksForm;
