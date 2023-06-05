import getConfig from "next/config";
import { useRouter } from "next/router";
import merge from "lodash/merge";
import { CssBaseline } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
import useSettings from "hooks/useSettings";
import customThemeOptions from "./themeOptions";

// =======================================================

// =======================================================

const MuiTheme = ({ children }) => {
  const { settings } = useSettings();
  const { pathname } = useRouter();
  const { publicRuntimeConfig } = getConfig(); // Value is coming from next.config.js

  const themeOptions = customThemeOptions(publicRuntimeConfig, pathname);
  let theme = createTheme(
    merge(
      {},
      {
        ...themeOptions,
        direction: settings.direction,
      }
    )
  );
  theme = responsiveFontSizes(theme);

  // theme shadows
  theme.shadows[1] = "0px 1px 3px rgba(3, 0, 71, 0.09)";
  theme.shadows[2] = "0px 4px 16px rgba(43, 52, 69, 0.1)";
  theme.shadows[3] = "0px 8px 45px rgba(3, 0, 71, 0.09)";
  theme.shadows[4] = "0px 0px 28px rgba(3, 0, 71, 0.01)";
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
export default MuiTheme;
